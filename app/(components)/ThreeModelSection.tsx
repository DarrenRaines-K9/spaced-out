// This tells Next.js this component runs in the browser, not on the server
"use client";

// Import statements - bringing in code from other packages/files
import React from "react"; // React core library for creating components
import CanvasStage from "./three/CanvasStage"; // Our 3D canvas component

// Define our ThreeModelSection component as a Function Component with TypeScript
// This is a wrapper component that provides layout structure for the 3D scene
// It acts as the main container for all 3D rendering functionality
const ThreeModelSection: React.FC = () => {
  // Return JSX - the layout wrapper for our 3D scene
  return (
    // Container div with Tailwind CSS classes for full viewport coverage
    <div className="w-full h-full">      {/* w-full = width: 100%, h-full = height: 100% */}
      {/* The main 3D canvas component that handles all Three.js rendering */}
      {/* CanvasStage contains the Canvas, lights, controls, and 3D model */}
      <CanvasStage />
    </div>
  );
};

// Export the component so other files can import and use it
// This component serves as the main entry point for 3D functionality in the app
export default ThreeModelSection;