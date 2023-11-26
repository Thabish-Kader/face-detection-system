"use client";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export const MyWebcam = () => {
  const [image, setImage] = useState();
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);
  return (
    <div>
      {isWebcamOn ? (
        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          ref={webcamRef}
          videoConstraints={videoConstraints}
        />
      ) : (
        <h1>Webcam is off</h1>
      )}
      <div className="flex items-center space-x-4 ">
        <button onClick={capture}>Capture photo</button>
        <button onClick={() => setIsWebcamOn(!isWebcamOn)}>
          Turn Webcam on
        </button>
      </div>
    </div>
  );
};
