import { INFORMATION_ABOUT_THE_QUESTION } from "@/text/interview";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({
  questions,
  activeQuestion,
  setActiveQuestion,
}: any) {
    const textToSpeach = (text: string) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance();
            speech.text = text;
            speech.lang = 'en-US';
            speech.pitch = 1;
            speech.volume = 1;
            speech.rate = 1;
            speechSynthesis.speak(speech);
        }else{
            alert("Your browser does not support text to speech");
        }
    }
  return (
    questions && (
      <div className="p-5 border rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 my-5">
          {questions &&
            questions.map((_: any, index: number) => (
              <h2
                onClick={() => setActiveQuestion(index)}
                key={index}
                className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                    activeQuestion == index ? "bg-primary text-white" : "bg-secondary"
                }`}
                >
                Qeustion #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="md:h-40 my-5 text-sm md:text-base">
          {questions[activeQuestion]?.question}
            <Volume2 className="cursor-pointer" onClick={() => textToSpeach(questions[activeQuestion]?.question)} />
        </h2>
        <div className="border rounded-lg p-5 bg-blue-100 mt-10">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Information</strong>
          </h2>
          <h2>{INFORMATION_ABOUT_THE_QUESTION}</h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
