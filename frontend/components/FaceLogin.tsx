"use client";
import React from "react";
import { RiveCanvas } from "./RiveCanvas";
import Webcam from "react-webcam";
import { MyWebcam } from "./MyWebcam";
import { useCallback, useRef, useState } from "react";

export const FaceLogin = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <MyWebcam isWebcamOn={isWebcamOn} webcamRef={webcamRef} />
      <RiveCanvas
        setIsWebcamOn={setIsWebcamOn}
        isWebcamOn={isWebcamOn}
        capture={capture}
      />
    </div>
  );
};
