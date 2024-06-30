"use client";
import { MockInterviewType } from "@/type/interviewType";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";

const useGetInterviewDetails = (interviewId: string) => {
  const [interviewInfo, setInterview] = useState<MockInterviewType | null>(
    null
  );
  useEffect(() => {
    const getInterviewDetails = async () => {
      try {
        const result: MockInterviewType[] = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, interviewId));
        if (result.length > 0) {
          setInterview(result[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };  

    getInterviewDetails();
  }, [interviewId]);

  return interviewInfo;
};

export default useGetInterviewDetails;
