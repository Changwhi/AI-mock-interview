'use client'
import React, { useState } from 'react'
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from '@/components/ui/button';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
function WebcamComponent() {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  return (
            webCamEnabled ? (
              <>
                <Webcam
                  mirrored={true}
                  videoConstraints={videoConstraints}
                />
                
                <Button variant={"outline"} className="self-center" onClick={() => setWebCamEnabled(false)}>
                  Disable Webcam
                </Button>
              </>
            ) : (
              <>
                <div className="h-full w-full items-center flex flex-col justify-center text-center text-semibold border bg-secondary rounded-md">
                  <WebcamIcon className="w-20 h-20" />
                </div>
                <Button variant={"outline"} className="self-center" onClick={() => setWebCamEnabled(true)}>
                  Enable Webcam
                </Button>
              </>
            )
  )
}

export default WebcamComponent