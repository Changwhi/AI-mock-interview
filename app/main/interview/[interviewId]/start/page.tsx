"use client";
import React, { useState } from "react";
import QuestionsSection from "@/components/main/start/QuestionsSection";
import useGetInterviewDetails from "@/lib/useGetInterviewDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import WebcamComponent from "@/components/WebcamComponent";
import Link from "next/link";
import Recording from "@/components/Recording";
import { useLoading } from "@/contexts/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";

function Start({ params }: { params: { interviewId: string } }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const response = useGetInterviewDetails(params.interviewId);
  const { isLoading } = useLoading();

  return (
    <div className={`p-10 flex flex-col ${isLoading ? "opacity-50" : ""}`}>
      {isLoading && <LoadingOverlay />}
      <h2 className="font-bold text-2xl">You are in an interview session</h2>
      <h2 className="text-gray-500">
        Choose a question and click on Record button
      </h2>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
          {response ? (
            <>
              <QuestionsSection
                setActiveQuestion={setActiveQuestion}
                questions={JSON.parse(response?.jsonMockResp as string)}
                activeQuestion={activeQuestion}
              />
              <div className="flex flex-col md:my-20 justify-center items-center rounded-lg">
                <WebcamComponent button={false} />
                <Recording
                  interviewInfo={response}
                  questions={JSON.parse(response?.jsonMockResp as string)}
                  activeQuestion={activeQuestion}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[350px] w-[250px] rounded-xl" />
                <Skeleton className="h-[350px] w-[250px] rounded-xl" />
              </div>
              <div className="flex flex-col md:my-20 justify-center items-center rounded-lg">
                <WebcamComponent button={false} />
                <Recording
                  interviewInfo={null}
                  questions={null}
                  activeQuestion={activeQuestion}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-10 my-5 justify-between">
        <div className="flex gap-5 justify-start">
          <Button
            disabled={activeQuestion == 0}
            onClick={() => setActiveQuestion(activeQuestion - 1)}
          >
            {"<"} Previous Question
          </Button>
          <Button
            disabled={activeQuestion == 4}
            onClick={() => setActiveQuestion(activeQuestion + 1)}
          >
            Next Question {">"}
          </Button>
        </div>
        <div>
          <Link href={`/main/interview/${response?.mockId}/result`}>
            <Button disabled={activeQuestion != 4}>End Interview</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
