import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spaced Out - 3D Portfolio",
  description: "3D model viewer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}