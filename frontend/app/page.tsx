import { MyWebcam } from "@/components/MyWebcam";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

import { RiveCanvas } from "@/components/RiveCanvas";
import { FaceLogin } from "@/components/FaceLogin";

export default function Home() {
  return (
    <main className="relative">
      <FaceLogin />
    </main>
  );
}
