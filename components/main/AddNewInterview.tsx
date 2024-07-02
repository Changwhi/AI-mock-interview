"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAi";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CANCEL,
  EG_DEVELOPER,
  NO_DATA_FOUND,
  POSITION,
  START_NEW_INTERVIEW,
  WHAT_MOCKUP_YOU_WANT,
  YEAR_OF_YOUR_EXPERIENCE,
  YOUR_NEED,
} from "@/text/RegularText";
import {
  JOB_DESCRIPTION,
  JOB_EXPERIENCE,
  JOB_POSITION,
} from "@/text/PromptText";

function AddNewInterview() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [openInterview, setOpenInterview] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const InputPromt =
        { JOB_POSITION } +
        position +
        { JOB_DESCRIPTION } +
        description +
        { JOB_EXPERIENCE } +
        year +
        process.env.NEXT_PUBLIC_REQUEST_QUESTIONS;
      const result = await chatSession.sendMessage(InputPromt);
      const data = result.response
        .text()
        .replace("```json", "")
        .replace(/^\s+/, "")
        .replace("```", "");
      setResponse(data);
      if (!data) {
        toast(NO_DATA_FOUND);
        return;
      }
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4() as string,
          jsonMockResp: data as string,
          jobDescription: description as string,
          jobPosition: position as string,
          jobExperience: year as string,
          createdBy: user?.primaryEmailAddress?.emailAddress as string,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({
          mockId: MockInterview.mockId,
        });
      if (resp) {
        setOpenInterview(true);
        router.push("/main/interview/" + resp[0].mockId);
      }
      setOpen(false);
    } catch (error) {
      toast(error as []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <p className="text-lg font-semibold text-center">
          {" "}
          {START_NEW_INTERVIEW}
        </p>
      </div>
      <Dialog open={open}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {WHAT_MOCKUP_YOU_WANT}
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div className="text-black font-semibold">
                  <p>{YOUR_NEED}</p>
                  <div className="mt-7 mb-4">
                    <label className="">{POSITION}</label>
                    <Input
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder={EG_DEVELOPER}
                      max={100}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label>{JOB_DESCRIPTION}</label>
                    <Textarea
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e,g. React.js, Next.js, MySQL"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label>{YEAR_OF_YOUR_EXPERIENCE}</label>
                    <Input
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="e,g. 2"
                      type="number"
                      max={100}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-end ">
                  <Button
                    type="button"
                    className="w-20"
                    variant={"ghost"}
                    onClick={() => setOpen(false)}
                  >
                    {CANCEL}
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-20"
                    variant={"default"}
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
