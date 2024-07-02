"use client";
import React, { useEffect } from "react";
import useGetAnswerDetails from "@/lib/useGetAnswerDetails";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronsDown, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Result({ params }: { params: { interviewId: string } }) {
  const answerInfo = useGetAnswerDetails(params.interviewId);
  const router = useRouter();
  return (
    <div className="p-10 flex flex-col">
      <h2 className="font-bold text-2xl text-blue-500">Result</h2>
      <h2 className="text-gray-500">Here is your Mockup Interview result</h2>
      <div className="p-5 flex flex-col justify-start items-start">
        {answerInfo?.length == 0 ? (
          <h2 className="p-5 font-bold text-xl text-red-500">No Interview Record Found</h2>
        ) : (
          <>
            <h2 className="font-bold text-xl">Your Answers :</h2>
            {answerInfo &&
              answerInfo.map((answer, index) => (
                <Collapsible className="p-1 w-3/4" key={index}>
                  <CollapsibleTrigger className="p-2 w-full bg-secondary rounded-lg my-2 text-left flex gap-7 justify-start">
                    <ChevronsUpDown /> {answer.question}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-6 text-left w-full">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-red-500 border rounded-lg">
                        <strong>Score : {answer.rating} / 5</strong>
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                        <strong>User Answer :</strong> {answer.userAnswer}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                        <strong>AI Answer :</strong> {answer.correctAns}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                        <strong>Feedback from AI :</strong> {answer.feedback}
                      </h2>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
          </>
        )}
      </div>
      <Button className="self-start" onClick={() => router.replace("/main")}>
        Go to main page
      </Button>
    </div>
  );
}

export default Result;
