"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Preload } from "@react-three/drei";
import Model from "./Model";

const CanvasStage: React.FC = () => {
  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      camera={{ position: [2.5, 1.8, 3.5], fov: 50 }}
    >
      <Suspense fallback={null}>
        <Model />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <Environment preset="city" />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default CanvasStage;