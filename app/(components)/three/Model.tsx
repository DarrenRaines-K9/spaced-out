"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useControls, folder } from "leva";
import * as THREE from "three";

// Preload the model
useGLTF.preload("/models/model.glb");

const Model: React.FC = () => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/model.glb");

  // Model controls
  const {
    positionX,
    positionY,
    positionZ,
    rotationY,
    scale,
    wireframe,
  } = useControls("Model", {
    positionX: { value: 0, min: -5, max: 5, step: 0.1 },
    positionY: { value: 0, min: -5, max: 5, step: 0.1 },
    positionZ: { value: 0, min: -5, max: 5, step: 0.1 },
    rotationY: { value: Math.PI / 4, min: 0, max: Math.PI * 2, step: 0.1 },
    scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
    wireframe: false,
  });

  // Light controls
  const {
    ambientIntensity,
    keyIntensity,
    keyColor,
    fillIntensity,
    fillColor,
  } = useControls("Lights", {
    ambientIntensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
    keyIntensity: { value: 1, min: 0, max: 3, step: 0.1 },
    keyColor: "#ffffff",
    fillIntensity: { value: 0.3, min: 0, max: 2, step: 0.1 },
    fillColor: "#4080ff",
  });

  // Environment controls
  const { environmentPreset } = useControls("Environment", {
    environmentPreset: {
      value: "city",
      options: ["sunset", "dawn", "night", "warehouse", "forest", "apartment", "studio", "city", "park", "lobby"],
    },
  });

  // Shadow controls
  const { shadowsEnabled, shadowBlur } = useControls("Shadows", {
    shadowsEnabled: true,
    shadowBlur: { value: 10, min: 0, max: 50, step: 1 },
  });

  // Apply wireframe to all meshes in the model
  React.useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.wireframe = wireframe;
              });
            } else {
              child.material.wireframe = wireframe;
            }
          }
          child.castShadow = shadowsEnabled;
          child.receiveShadow = shadowsEnabled;
        }
      });
    }
  }, [scene, wireframe, shadowsEnabled]);

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={keyIntensity}
        color={keyColor}
        castShadow={shadowsEnabled}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={15}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
        shadow-blurSamples={shadowBlur}
      />
      <directionalLight
        position={[-3, 2, -5]}
        intensity={fillIntensity}
        color={fillColor}
        castShadow={false}
      />
      
      {/* Model */}
      <group
        ref={modelRef}
        position={[positionX, positionY, positionZ]}
        rotation={[0, rotationY, 0]}
        scale={[scale, scale, scale]}
      >
        <primitive object={scene} />
      </group>
      
      {/* Ground plane for shadows */}
      {shadowsEnabled && (
        <mesh
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
      )}
    </>
  );
};

export default Model;