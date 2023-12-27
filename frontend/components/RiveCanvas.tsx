"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import RiveComponent, { useRive } from "@rive-app/react-canvas";

type RiveCanvasProps = {
  setIsWebcamOn: Dispatch<SetStateAction<boolean>>;
  isWebcamOn: boolean;
  capture: () => void;
};

export const RiveCanvas = ({
  setIsWebcamOn,
  isWebcamOn,
  capture,
}: RiveCanvasProps) => {
  const { rive, RiveComponent } = useRive({
    src: "/eye.riv",
    stateMachines: "State Machine 1",
    artboard: "New Artboard",
    autoplay: true,
    onLoadError: () => console.log("Error Loading Rive File"),
  });

  let captureCount = 0;
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleCapturePhoto = () => {
    if (isWebcamOn) {
      return;
    }
    setIsWebcamOn(true);

    if (intervalIdRef.current === null) {
      intervalIdRef.current = setInterval(() => {
        capture();
        captureCount++;

        if (captureCount === 5) {
          setIsWebcamOn(false);
          clearInterval(intervalIdRef.current!);
          intervalIdRef.current = null;
        }
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen w-full bg-black absolute inset-0">
      <RiveComponent onClick={handleCapturePhoto} className="h-full w-full" />
    </div>
  );
};
