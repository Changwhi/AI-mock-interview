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
        "Job position:" +
        position +
        ", Job Description:" +
        description +
        ", Years of Experience:" +
        year +
        ", Depends on Job Position, Job description and years of Experience, give us 5 interview questions along with answer in Json format, Give us question and answer field on Json";
      console.log(InputPromt);
      const result = await chatSession.sendMessage(InputPromt);
      const data = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      setResponse(data);
      if (!data) {
        console.log("No data found - in AddNewInterview.tsx");
        return;
      }
      const resp = await db.insert(MockInterview).values({
          mockId: uuidv4() as string,
          jsonMockResp: data as string,
          jobDescription: description as string,
          jobPosition: position as string,
          jobExperience: year as string,
          createdBy: user?.primaryEmailAddress?.emailAddress as string,
          createdAt: moment().format("DD-MM-yyyy"),
        }).returning({
          mockId:MockInterview.mockId
        });
        if(resp){
            setOpenInterview(true);
            router.push('/main/interview/'+resp[0].mockId)
        }
        setOpen(false);
    } catch (error) {
      console.log(error);
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
        <p className="text-lg font-semibold text-center"> + Start New Mockup</p>
      </div>
      <Dialog open={open}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              What kind of Mockup do you want?
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div className="text-black font-semibold">
                  <p>Let us know your needs</p>
                  <div className="mt-7 mb-4">
                    <label className="">Position</label>
                    <Input
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="e,g. Frontend Developer"
                      max={100}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label>Job Description and Tech Stacks</label>
                    <Textarea
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e,g. React.js, Next.js, MySQL"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label>Year of your experience</label>
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
                    Cancel
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
