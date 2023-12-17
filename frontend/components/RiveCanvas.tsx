"use client";
import React from "react";
import RiveComponent, { useRive } from "@rive-app/react-canvas";

export const RiveCanvas = () => {
  const { rive, RiveComponent } = useRive({
    src: "/eye.riv",
    stateMachines: "State Machine 1",
    artboard: "New Artboard",
    autoplay: true,
    onLoadError: () => console.log("Error Loading Rive File"),
  });

  return (
    <div className="h-screen w-full bg-black">
      <RiveComponent className="h-full w-full" />
    </div>
  );
};
