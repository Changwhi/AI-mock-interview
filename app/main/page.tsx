import AddNewInterview from "@/components/main/AddNewInterview";
import InterviewRecords from "@/components/main/InterviewRecords";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect } from "react";

const Main = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Main</h2>
      <h2 className="text-gray-500">Start your Mockup Interview with AI!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
      <InterviewRecords />
    </div>
  );
};

export default Main;
