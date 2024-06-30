"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useRef, useState } from "react";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { INFORMATION_ABOUT_THE_INTERVIEW } from "@/text/interview";
import { MockInterviewType } from "@/type/interviewType";
import Link from "next/link";
import useGetInterviewDetails from "@/lib/useGetInterviewDetails";
import WebcamComponent from "./_component/WebcamComponent";

function Interview({ params }: { params: { interviewId: string } }) {

  const interviewInfo = useGetInterviewDetails(params.interviewId);
  if (!interviewInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-10 flex flex-col">
      <h2 className="font-bold text-2xl">Ready to Mockup Interview</h2>
      <h2 className="text-gray-500">Check your Mockup Interview details</h2>
      <div className="flex justify-center items-center my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="grid grid-cols-1 my-5 gap-5">
            <div className="flex flex-col p-5 rounded-lg border gap-5">
              <h2 className="text-lg">
                <strong>Job Position: </strong>
                {interviewInfo?.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description: </strong>
                {interviewInfo?.jobDescription}
              </h2>
              <h2 className="text-lg">
                <strong>Job Experience: </strong>
                {interviewInfo?.jobExperience} year(s)
              </h2>
            </div>
            <div className="flex flex-col p-5 rounded-lg text-yellow-700 border gap-5 bg-yellow-100">
              <h2 className="text-lg flex items-center ">
                {" "}
                <Lightbulb className=" h-7 w-7 mb-3" />
                <strong>Information</strong>
              </h2>
              <h2>{INFORMATION_ABOUT_THE_INTERVIEW}</h2>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            {/* <Webcam /> */}

            <WebcamComponent />
          </div>
        </div>
      </div>
      <Link href={`/main/interview/${params.interviewId}/start`}>
        <Button className="self-center">Let&#39;s start</Button>
      </Link>
    </div>
  );
}

export default Interview;
