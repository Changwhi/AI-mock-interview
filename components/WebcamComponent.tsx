"use client";
import React, { useEffect, useState } from "react";
import { LoaderCircle, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAi";
import { db } from "@/utils/db";
import { Answer } from "@/utils/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import {
  ANSWER_SAVED_SUCCESSFULLY,
  DISABLE_WEBCAM,
  ENALBE_WEBCAM,
  RECORD,
  STOP,
} from "@/text/RegularText";
import { ANSWER, QUESTION } from "@/text/PromptText";
import { NO_10_WORDS } from "@/text/ErrorText";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
function WebcamComponent({
  cameraButton,
  questions,
  activeQuestion,
  interviewInfo,
}: {
  cameraButton: boolean;
  questions: any;
  activeQuestion: number;
  interviewInfo: any;
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    results.map((result: any) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateAnswer();
    }
    if (!isRecording && userAnswer.length < 10 && userAnswer.length > 0) {
      setLoading(false);
      toast(NO_10_WORDS);
    }
  }, [userAnswer]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateAnswer = async () => {
    setLoading(true);
    const feedbackPrompt =
      { QUESTION } +
      questions[activeQuestion]?.question +
      { ANSWER } +
      userAnswer +
      process.env.NEXT_PUBLIC_UPDATE_PROMPT;
    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace(/^\s+/, "")
      .replace("```", "");
    console.log(mockJsonResp);
    const responseData = JSON.parse(mockJsonResp);

    const respDB = await db.insert(Answer).values({
      mockIdRef: interviewInfo?.mockId as string,
      question: questions[activeQuestion]?.question as string,
      userAnswer: userAnswer as string,
      feedback: responseData?.feedback as string,
      rating: responseData?.rating as string,
      createdAt: moment().format("DD-MM-yyyy") as string,
      correctAns: questions[activeQuestion]?.answer as string,
      userEmail: user?.primaryEmailAddress?.emailAddress as string,
    });
    if (respDB) {
      toast(ANSWER_SAVED_SUCCESSFULLY);
      setResults([]);
    }
    setUserAnswer("");
    setResults([]);
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center">
          <LoaderCircle className="w-10 h-10 animate-spin" />
        </div>
      )}
      {!loading && webCamEnabled && (
        <>
          <Webcam
            style={{
              height: 300,
              width: "100%",
              zIndex: 10,
            }}
            mirrored={true}
            videoConstraints={videoConstraints}
          />
          <Button
            variant={"default"}
            className="my-2 w-1/4"
            onClick={() => setWebCamEnabled(false)}
          >
            {DISABLE_WEBCAM}
          </Button>
          <Button
            className="my-2 w-1/4"
            variant={isRecording ? "destructive" : "default"}
            onClick={startStopRecording}
          >
            {isRecording ? STOP : RECORD}
          </Button>
        </>
      )}
      {!loading && !webCamEnabled && (
        <>
          <div className="h-full w-full items-center flex flex-col justify-center text-center text-semibold border bg-secondary rounded-md">
            <WebcamIcon className="w-20 h-20" />
          </div>
          <Button className="my-2 w-1/4" onClick={() => setWebCamEnabled(true)}>
            {ENALBE_WEBCAM}
          </Button>
          <Button
            className="my-2 w-1/4"
            variant={isRecording ? "destructive" : "default"}
            onClick={startStopRecording}
          >
            {isRecording ? STOP : RECORD}
          </Button>
        </>
      )}
    </>
  );
}
export default WebcamComponent;
