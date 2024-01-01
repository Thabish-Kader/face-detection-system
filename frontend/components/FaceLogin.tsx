"use client";
import React from "react";
import { RiveCanvas } from "./RiveCanvas";
import Webcam from "react-webcam";
import { MyWebcam } from "./MyWebcam";
import { useCallback, useRef, useState } from "react";

export const FaceLogin = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const capture = useCallback(
    (count: number): File | null => {
      const imageSrc = webcamRef?.current?.getScreenshot();

      if (imageSrc) {
        const byteCharacters = atob(imageSrc.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });

        // Creating a File object
        const file = new File([blob], `user-image${count}.jpeg`, {
          type: "image/jpeg",
        });

        return file;
      }
      return null;
    },
    [webcamRef]
  );

  return (
    <div>
      <MyWebcam isWebcamOn={isWebcamOn} webcamRef={webcamRef} />
      <RiveCanvas
        setIsWebcamOn={setIsWebcamOn}
        isWebcamOn={isWebcamOn}
        capture={(n: number) => capture(n)}
      />
    </div>
  );
};
