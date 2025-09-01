// This tells Next.js this component runs in the browser, not on the server
"use client";

// Import statements - bringing in Next.js utilities
import dynamic from "next/dynamic"; // Dynamic imports for client-side only components

// Dynamically import the 3D model section to prevent SSR issues
// ssr: false ensures Three.js renders only on the client side
const ThreeModelSection = dynamic(
  () => import("./(components)/ThreeModelSection"),
  { ssr: false }
);

// Home page component - main landing page of the portfolio
export default function Home() {
  return (
    // Content area - adjusted height to account for navbar
    // Using calc() to subtract navbar height (4rem = 64px)
    <div className="w-full h-[calc(100vh-4rem)]">
      {/* 3D model display section */}
      <ThreeModelSection />
    </div>
  );
}