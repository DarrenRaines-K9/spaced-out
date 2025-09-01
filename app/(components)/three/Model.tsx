// This tells Next.js this component runs in the browser, not on the server
"use client";

// Import statements - bringing in code from other packages/files
import React, { useRef } from "react"; // React hooks for managing component state
import { useFrame } from "@react-three/fiber"; // Hook for animation loops (not used here but imported)
import { useGLTF } from "@react-three/drei"; // Hook for loading 3D models in GLTF format
import { useControls, folder } from "leva"; // GUI controls for tweaking values in development
import * as THREE from "three"; // The core 3D graphics library

// Preload the 3D model file so it's ready when component mounts
// This improves performance by loading the model before it's needed
useGLTF.preload("/models/model.glb");

// Define our Model component as a Function Component with TypeScript
// React.FC means "React Function Component" - a TypeScript type for React components
const Model: React.FC = () => {
  // useRef creates a reference to a DOM element or Three.js object
  // <THREE.Group> specifies this ref will point to a Three.js Group object
  // null is the initial value before the object is created
  const modelRef = useRef<THREE.Group>(null);
  
  // Load the 3D model file and destructure to get the 'scene' (the 3D objects)
  // useGLTF returns an object with scene, animations, materials, etc.
  const { scene } = useGLTF("/models/model.glb");

  // Create GUI controls for adjusting the model's properties
  // useControls creates sliders/inputs in the Leva GUI panel
  // The object destructuring ({ positionX, positionY... }) extracts values from the returned object
  const {
    positionX,    // X position (left/right)
    positionY,    // Y position (up/down) 
    positionZ,    // Z position (forward/back)
    rotationY,    // Rotation around Y-axis (turning left/right)
    scale,        // Size multiplier
    wireframe,    // Boolean: show model as wireframe or solid
  } = useControls("Model", {
    // Each control has: default value, min/max range, and step size
    positionX: { value: 0, min: -5, max: 5, step: 0.1 },
    positionY: { value: 0, min: -5, max: 5, step: 0.1 },
    positionZ: { value: 0, min: -5, max: 5, step: 0.1 },
    rotationY: { value: Math.PI / 4, min: 0, max: Math.PI * 2, step: 0.1 }, // Math.PI = 180 degrees
    scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
    wireframe: false, // Boolean control creates a checkbox
  });

  // Create GUI controls for lighting properties
  const {
    ambientIntensity,  // Overall scene brightness
    keyIntensity,      // Main light brightness
    keyColor,          // Main light color
    fillIntensity,     // Secondary light brightness
    fillColor,         // Secondary light color
  } = useControls("Lights", {
    ambientIntensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
    keyIntensity: { value: 1, min: 0, max: 3, step: 0.1 },
    keyColor: "#ffffff",        // String creates a color picker
    fillIntensity: { value: 0.3, min: 0, max: 2, step: 0.1 },
    fillColor: "#4080ff",       // Blue fill light
  });

  // Environment preset selector (currently defined but not used in the JSX)
  const { environmentPreset } = useControls("Environment", {
    environmentPreset: {
      value: "city",
      options: ["sunset", "dawn", "night", "warehouse", "forest", "apartment", "studio", "city", "park", "lobby"],
    },
  });

  // Shadow settings controls
  const { shadowsEnabled, shadowBlur } = useControls("Shadows", {
    shadowsEnabled: true,           // Checkbox for enabling shadows
    shadowBlur: { value: 10, min: 0, max: 50, step: 1 }, // Shadow softness
  });

  // useEffect runs code when component mounts or when dependencies change
  // This effect applies wireframe and shadow settings to all meshes in the loaded model
  React.useEffect(() => {
    if (scene) { // Only run if the model scene has loaded
      // traverse() visits every object in the 3D scene tree
      scene.traverse((child) => {
        // instanceof checks if the object is a specific type (Mesh = 3D object with geometry + material)
        if (child instanceof THREE.Mesh) {
          if (child.material) { // Check if the mesh has a material
            // Some meshes have multiple materials (Array), others have one material
            if (Array.isArray(child.material)) {
              // Loop through each material and apply wireframe setting
              child.material.forEach((mat) => {
                mat.wireframe = wireframe;
              });
            } else {
              // Single material - apply wireframe setting directly
              child.material.wireframe = wireframe;
            }
          }
          // Set shadow properties for this mesh
          child.castShadow = shadowsEnabled;     // Can this object cast shadows?
          child.receiveShadow = shadowsEnabled;  // Can shadows be cast onto this object?
        }
      });
    }
  }, [scene, wireframe, shadowsEnabled]); // Re-run when these values change

  // Return JSX - the 3D scene structure
  // React Fragment (<>) groups elements without adding extra DOM nodes
  return (
    <>
      {/* Lights - illuminate the 3D scene */}
      {/* ambientLight provides overall, even lighting from all directions */}
      <ambientLight intensity={ambientIntensity} />
      
      {/* directionalLight simulates sunlight - parallel rays from one direction */}
      <directionalLight
        position={[5, 5, 5]}                    // Light position in 3D space [x, y, z]
        intensity={keyIntensity}               // Brightness controlled by GUI
        color={keyColor}                       // Color controlled by GUI  
        castShadow={shadowsEnabled}            // Can this light create shadows?
        shadow-mapSize={[1024, 1024]}         // Shadow quality (higher = better quality)
        shadow-camera-far={15}                // How far shadows extend
        shadow-camera-left={-10}              // Shadow camera boundaries
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}                 // Fixes shadow acne (visual artifacts)
        shadow-blurSamples={shadowBlur}       // Shadow softness
      />
      
      {/* Second light for fill lighting (softer, from different angle) */}
      <directionalLight
        position={[-3, 2, -5]}                 // Different position for fill lighting
        intensity={fillIntensity}
        color={fillColor}
        castShadow={false}                     // Fill light doesn't cast shadows
      />
      
      {/* The 3D Model */}
      {/* group is a container that can hold multiple 3D objects */}
      <group
        ref={modelRef}                         // Reference for potential future use
        position={[positionX, positionY, positionZ]} // Position controlled by GUI
        rotation={[0, rotationY, 0]}          // Rotation around Y-axis only
        scale={[scale, scale, scale]}         // Uniform scaling in all directions
      >
        {/* primitive renders a Three.js object directly in React Three Fiber */}
        <primitive object={scene} />
      </group>
      
      {/* Ground plane to catch shadows - only rendered if shadows are enabled */}
      {shadowsEnabled && (
        <mesh
          position={[0, -1, 0]}               // Position below the model
          rotation={[-Math.PI / 2, 0, 0]}    // Rotate to lay flat (horizontal)
          receiveShadow                       // This plane can receive shadows
        >
          {/* planeGeometry creates a flat rectangle - args are [width, height] */}
          <planeGeometry args={[20, 20]} />
          {/* shadowMaterial is invisible but catches shadows */}
          <shadowMaterial opacity={0.3} />
        </mesh>
      )}
    </>
  );
};

// Export the component so other files can import and use it
export default Model;