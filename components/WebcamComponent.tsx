"use client";
import React, { useEffect, useState } from "react";
import { Lightbulb, Mic, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
function WebcamComponent({ cameraButton }: { cameraButton: boolean }) {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result: any) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  const [webCamEnabled, setWebCamEnabled] = useState(false);
  return webCamEnabled ? (
    <>
      <Webcam
        style={{
          height: 300,
          width: "100%",
          zIndex: 10,
        }}
        mirrored={true}
        videoConstraints={videoConstraints}
      />
      {cameraButton && (
        <Button
          variant={"outline"}
          className="self-center my-2"
          onClick={() => setWebCamEnabled(false)}
        >
          Disable Webcam
        </Button>
      )}
      {!cameraButton && (
        <Button
          className="my-2"
          variant={"outline"}
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          {isRecording ? (
            <h2>
              <Mic /> Recording...
            </h2>
          ) : (
            "Record"
          )}
        </Button>
      )}
    </>
  ) : (
    <>
      <div className="h-full w-full items-center flex flex-col justify-center text-center text-semibold border bg-secondary rounded-md">
        <WebcamIcon className="w-20 h-20" />
      </div>
      {cameraButton && (
        <Button
          variant={"outline"}
          className="self-center my-2"
          onClick={() => setWebCamEnabled(true)}
        >
          Enable Webcam
        </Button>
      )}
      {!cameraButton && (
        <Button
          className="my-2"
          variant={isRecording ? "destructive" : "outline"}
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          {isRecording ? (
               "Stop"
          ) : (
            "Record"
          )}
        </Button>
      )}
      <Button onClick={() => console.log(userAnswer)}>Show user answer</Button>
    </>
  );
}

export default WebcamComponent;
