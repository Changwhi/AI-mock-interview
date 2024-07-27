// WebcamComponent.tsx
"use client";
import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Image from "next/image";
import { useWebcam } from "@/contexts/WebCamContext";
import { DISABLE_WEBCAM, ENALBE_WEBCAM } from "@/text/RegularText";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function WebcamComponent({ button }: { button: boolean }) {
  const { webCamEnabled, setWebCamEnabled } = useWebcam();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center">
          <LoaderCircle className="w-10 h-10 animate-spin" />
        </div>
      )}
      {!loading && webCamEnabled && (
        <div className="flex-col justify-center items-center">
          <Webcam
            style={{
              height: 300,
              width: "100%",
              zIndex: 10,
            }}
            mirrored={true}
            videoConstraints={videoConstraints}
          />
          {button && (
            <Button
              variant={"default"}
              className="my-2 w-2/4"
              onClick={() => setWebCamEnabled(false)}
            >
              {DISABLE_WEBCAM}
            </Button>
          )}
        </div>
      )}
      {!loading && !webCamEnabled && (
        <>
          <Image
            src={"/interview.png"}
            alt="Interview Image"
            width={300}
            height={300}
            className="rounded-xl"
          />
          {button && (
            <Button
              className="my-2 w-2/4"
              onClick={() => setWebCamEnabled(true)}
            >
              {ENALBE_WEBCAM}
            </Button>
          )}
        </>
      )}
    </>
  );
}

export default WebcamComponent;
