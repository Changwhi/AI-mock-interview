"use client"
import { AnswerType } from "@/type/answerType";
import { db } from "@/utils/db";
import { Answer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";

function useGetAnswerDetails(interviewId: string) {
    const [answerInfo, setAnswer] = useState<AnswerType[] | null>(null)
    useEffect(() => {
        const getAnswerDetails = async () => {
            try {
                const result: AnswerType[] = await db
                    .select()
                    .from(Answer)
                    .where(eq(Answer.mockIdRef, interviewId))
                    .orderBy(Answer.id);
                if (result) {
                    setAnswer(result)
                }
            } catch (error) {
                console.log(error)
            }
        };

        getAnswerDetails();
    }, [interviewId]);

    return answerInfo
}

export default useGetAnswerDetails
