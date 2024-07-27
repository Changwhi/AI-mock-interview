import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAi";
import { Answer } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/contexts/LoadingContext";
import { NO_10_WORDS } from "@/text/ErrorText";
import { ANSWER_SAVED_SUCCESSFULLY, RECORD, STOP } from "@/text/RegularText";
import { ANSWER, QUESTION } from "@/text/PromptText";
import moment from "moment";

const Recording = ({
  questions,
  activeQuestion,
  interviewInfo,
}: {
  questions: any;
  activeQuestion: number;
  interviewInfo: any;
}) => {
  const [userAnswer, setUserAnswer] = useState("");

  const { user } = useUser();
  const { isLoading, setIsLoading } = useLoading();

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
      setIsLoading(false);
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
    setIsLoading(true);
    const feedbackPrompt = `${QUESTION} ${questions[activeQuestion]?.question} ${ANSWER} ${userAnswer} ${process.env.NEXT_PUBLIC_UPDATE_PROMPT}`;
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
      setUserAnswer("");
      setResults([]);
      setIsLoading(false);
    }
    setUserAnswer("");
    setResults([]);
    setIsLoading(false);
  };

  return (
    <Button
      className="my-2 w-2/4"
      variant={isRecording ? "destructive" : "default"}
      onClick={startStopRecording}
    >
      {isRecording ? STOP : RECORD}
    </Button>
  );
};

export default Recording;
