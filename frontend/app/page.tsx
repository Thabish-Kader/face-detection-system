import Image from "next/image";
import { MyWebcam } from "@/components/MyWebcam";
import Link from "next/link";
import { RiveCanvas } from "@/components/RiveCanvas";

export default function Home() {
  return (
    <main className="">
      {/* <MyWebcam /> */}
      <RiveCanvas />
    </main>
  );
}
