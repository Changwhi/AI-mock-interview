"use client";
import getInterviewDetails from "@/lib/getInterviewDetails";
import { MockInterviewType } from "@/type/interviewType";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import Record from "./_components/Record";
import useGetInterviewDetails from "@/lib/useGetInterviewDetails";

function Start({ params }: { params: { interviewId: string } }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const response = useGetInterviewDetails(params.interviewId);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <QuestionsSection questions={JSON.parse(response?.jsonMockResp as string)} activeQuestion={activeQuestion} />
        <Record />
      </div>
    </div>
  );
}

export default Start;
