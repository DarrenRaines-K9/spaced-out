// This tells Next.js this component runs in the browser, not on the server
"use client";

// Import statements - bringing in code from other packages/files
import React, { Suspense } from "react"; // React core and Suspense for loading states
import { Canvas } from "@react-three/fiber"; // Main canvas component for Three.js in React
import { OrbitControls, Environment, Preload } from "@react-three/drei"; // Helper components for 3D scenes
import Model from "./Model"; // Our custom 3D model component

// Define our CanvasStage component as a Function Component with TypeScript
// This component sets up the main 3D canvas and scene configuration
const CanvasStage: React.FC = () => {
  // Return JSX - the 3D canvas structure
  return (
    // Canvas is the main container for the Three.js scene
    <Canvas
      shadows                                    // Enable shadow rendering in the scene
      gl={{ antialias: true }}                 // WebGL renderer options: smooth edges
      camera={{                                 // Camera configuration object
        position: [2.5, 1.8, 3.5],            // Camera position in 3D space [x, y, z]
        fov: 50                                // Field of view in degrees (50° = moderate wide angle)
      }}
    >
      {/* Suspense handles loading states - shows fallback while children load */}
      {/* fallback={null} means show nothing while loading (no spinner/placeholder) */}
      <Suspense fallback={null}>
        {/* Our 3D model component with all the meshes, lights, and controls */}
        <Model />
        
        {/* OrbitControls allows user to interact with the camera */}
        <OrbitControls 
          enablePan={true}                     // Allow dragging to pan the camera
          enableZoom={true}                    // Allow mouse wheel/pinch to zoom
          enableRotate={true}                  // Allow dragging to orbit around the model
        />
        
        {/* Environment provides HDR lighting and reflections from a preset */}
        {/* "city" preset gives urban lighting with buildings reflected in materials */}
        <Environment preset="city" />
        
        {/* Preload all ensures all assets load before scene renders */}
        {/* This prevents pop-in effects and improves perceived performance */}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

// Export the component so other files can import and use it
export default CanvasStage;