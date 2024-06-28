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

function AddNewInterview() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [stacks, setStacks] = useState("");
  const handdleSubmit = (e:any) => {
    console.log(position, description, stacks);
    e.preventDefault()
    
  };

  return (
    <div>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className="text-lg font-semibold text-center">
          {" "}
          + Start New Mockup
        </h2>
      </div>
      <Dialog open={open}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              What kind of Mockup do you want?
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handdleSubmit}>
                <div className="text-black font-semibold">
                  <h2>Let us know your needs</h2>
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
                      onChange={(e) => setStacks(e.target.value)}
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
                  <Button type="submit" className="w-20" variant={"default"}>
                    Start
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
