"use client";

import dynamic from "next/dynamic";

const ThreeModelSection = dynamic(
  () => import("./(components)/ThreeModelSection"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="w-full h-screen">
      <ThreeModelSection />
    </main>
  );
}