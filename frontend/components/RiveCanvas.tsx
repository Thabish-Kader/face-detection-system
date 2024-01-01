"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import RiveComponent, { useRive } from "@rive-app/react-canvas";
import { sendUserPic } from "@/utils/apis";

type RiveCanvasProps = {
  setIsWebcamOn: Dispatch<SetStateAction<boolean>>;
  isWebcamOn: boolean;
  capture: (n: number) => File | null;
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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const sendUserPics = async () => {
    await sendUserPic(imageFiles);
  };

  const handleCapturePhoto = () => {
    if (isWebcamOn) {
      return;
    }
    setIsWebcamOn(true);

    if (intervalIdRef.current === null) {
      intervalIdRef.current = setInterval(() => {
        const file = capture(captureCount);
        captureCount++;
        if (file) {
          setImageFiles(
            (prevFiles) => [...prevFiles, file].filter(Boolean) as File[]
          );
        }
        if (captureCount === 5) {
          setIsWebcamOn(false);
          clearInterval(intervalIdRef.current!);
          intervalIdRef.current = null;
          captureCount = 0;
        }
      }, 2000);
    }
  };

  useEffect(() => {
    if (imageFiles?.length === 5) {
      sendUserPic(imageFiles);
    }
  }, [imageFiles]);

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
