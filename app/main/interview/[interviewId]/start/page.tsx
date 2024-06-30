"use client";
import { MockInterviewType } from "@/type/interviewType";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import Record from "./_components/Record";
import useGetInterviewDetails from "@/lib/useGetInterviewDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function Start({ params }: { params: { interviewId: string } }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions, setQuestions] = useState<MockInterviewType[]>([]);
  const response = useGetInterviewDetails(params.interviewId);

  return (
    <div className="p-10 flex flex-col">
      <h2 className="font-bold text-2xl">You are in an interview session</h2>
      <h2 className="text-gray-500">Choose a question and click on "Record"</h2>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
          {response && (
            <QuestionsSection
              setActiveQuestion={setActiveQuestion}
              questions={JSON.parse(response?.jsonMockResp as string)}
              activeQuestion={activeQuestion}
            />
          )}
          {!response && (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[350px] w-[250px] rounded-xl" />
              <Skeleton className="h-[350px] w-[250px] rounded-xl" />
            </div>
          )}
          <Record />
        </div>
    
      </div>
    </div>
  );
}

export default Start;
