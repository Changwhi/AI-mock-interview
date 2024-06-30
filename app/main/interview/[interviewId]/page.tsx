"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { INFORMATION_ABOUT_THE_INTERVIEW } from "@/text/interview";
import { MockInterviewType } from "@/type/interviewType";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function Interview({ params }: { params: { interviewId: string } }) {
  const [interviewInfo, setInterview] = useState<MockInterviewType | null>(
    null
  );
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const result: MockInterviewType[] = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      if (result.length > 0) {
        setInterview(result[0]);
      }
      console.log(result[0]);
    } catch (error) {
      console.log(error);
    }
  };

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
                {interviewInfo?.jobExperience}
                 {" "} year(s)
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
            {webCamEnabled ? (
              <>
                <Webcam
                  mirrored={true}
                  videoConstraints={videoConstraints}
                />

                <Button variant={"outline"} className="self-center" onClick={() => setWebCamEnabled(false)}>
                  Disable Webcam
                </Button>
              </>
            ) : (
              <>
                <div className="h-full w-full items-center flex flex-col justify-center text-center text-semibold border bg-secondary rounded-md">
                  <WebcamIcon className="w-20 h-20" />
                </div>
                <Button variant={"outline"} className="self-center" onClick={() => setWebCamEnabled(true)}>
                  Enable Webcam
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
        <Button className="self-center">Let's start</Button>
    </div>
  );
}

export default Interview;
