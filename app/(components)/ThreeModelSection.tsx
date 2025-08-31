"use client";

import React from "react";
import CanvasStage from "./three/CanvasStage";

const ThreeModelSection: React.FC = () => {
  return (
    <div className="w-full h-full">
      <CanvasStage />
    </div>
  );
};

export default ThreeModelSection;