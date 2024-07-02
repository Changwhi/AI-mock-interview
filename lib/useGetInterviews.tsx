'use client';
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { MockInterviewType } from "@/type/interviewType";

function useGetInterviews() {
  const { user } = useUser();
  const [interviews, setInterviews] = useState<MockInterviewType[]>([]);
  useEffect(() => {
    const getInterviewList = async () => {
      const data = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress as string)
        ).orderBy(desc(MockInterview.id))
        setInterviews(data);
        console.log("useGetinterview")
        console.log(data)
    };
    getInterviewList()
  }, [user]);

  return [interviews];
}

export default useGetInterviews;
