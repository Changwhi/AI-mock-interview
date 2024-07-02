"use client";
import useGetInterviews from "@/lib/useGetInterviews";
import { useUser } from "@clerk/nextjs";
import React from "react";
import InterviewRecordCard from "../ui/interviewRecordCard";

function InterviewRecords() {
  const [interviews] = useGetInterviews();

  return (
    <div>
      <h2 className="font-bold text-2xl">Interview Records</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviews.map((interview, index) => (
          <InterviewRecordCard key={index} interview={interview} />
        ))}
      </div>
    </div>
  );
}

export default InterviewRecords;
