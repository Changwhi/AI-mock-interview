import { INFORMATION_ABOUT_THE_QUESTION } from "@/text/interview";
import { Lightbulb } from "lucide-react";
import React from "react";

function QuestionsSection({ questions, activeQuestion }: any) {
  return  questions && (
    <div className="p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 my-10">
        {questions &&
          questions.map((question: any, index: number) => (
            <h2
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestion == index ? "bg-primary text-white" : "bg-white"
              }`}
            >
              {" "}
              Question #{index + 1}
            </h2>
          ))}
      </div>
          <h2 className="my-5 text-sm md:text-lg">{questions[activeQuestion]?.question}</h2>
          <div className="border rounded-lg p-5 bg-blue-100 mt-24">
            <h2 className="flex gap-2 items-center text-primary">
                <Lightbulb />
                <strong>Information</strong>
            </h2>
            <h2 >{INFORMATION_ABOUT_THE_QUESTION}</h2>
          </div>
    </div>

  );
}

export default QuestionsSection;
