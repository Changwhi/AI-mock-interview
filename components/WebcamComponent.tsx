"use client";
import React, { useEffect, useState } from "react";
import { Circle, Lightbulb, LoaderCircle, Mic, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { MockInterviewType } from "@/type/interviewType";
import { chatSession } from "@/utils/GeminiAi";
import { db } from "@/utils/db";
import { Answer } from "@/utils/schema";
import moment from "moment";
import { serial } from "drizzle-orm/pg-core";
import { useUser } from "@clerk/nextjs";

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
      toast("Please speak at least 10 words");
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
      "Qeustion: " +
      questions[activeQuestion]?.question +
      " Answer: " +
      userAnswer +
      ",depends on question and user answer for given interview question" +
      " please give us rating for answer out of 5and feedback as area of improvement if any" +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
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
      toast("Answer saved successfully");
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
          {cameraButton && (
            <Button
              variant={"default"}
              className="my-2 w-full"
              onClick={() => setWebCamEnabled(false)}
            >
              Disable Webcam
            </Button>
          )}
          {!cameraButton && (
            <Button
              className="my-2 w-full"
              variant={isRecording ? "destructive" : "default"}
              onClick={startStopRecording}
            >
              {isRecording ? "Stop" : "Record"}
            </Button>
          )}
        </>
      )}
      {!loading && !webCamEnabled && (
        <>
          <div className="h-full w-full items-center flex flex-col justify-center text-center text-semibold border bg-secondary rounded-md">
            <WebcamIcon className="w-20 h-20" />
          </div>
          {cameraButton && (
            <Button
              className="my-2 w-full"
              onClick={() => setWebCamEnabled(true)}
            >
              Enable Webcam
            </Button>
          )}
          {!cameraButton && (
            <Button
              className="my-5 w-full"
              variant={isRecording ? "destructive" : "default"}
              onClick={startStopRecording}
            >
              {isRecording ? "Stop" : "Record"}
            </Button>
          )}
        </>
      )}
    </>
  );
}
export default WebcamComponent;
