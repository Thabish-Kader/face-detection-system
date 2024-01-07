"use client";
import { RefObject } from "react";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

type MyWebcamProps = {
  webcamRef: RefObject<Webcam>;
  isWebcamOn: boolean;
};

export const MyWebcam = ({ webcamRef, isWebcamOn }: MyWebcamProps) => {
  return (
    <div>
      {isWebcamOn && (
        <div className="opacity-0">
          <Webcam
            ref={webcamRef}
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
        </div>
      )}
    </div>
  );
};
