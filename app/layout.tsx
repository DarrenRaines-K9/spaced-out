// Import statements - bringing in global styles and Next.js types
import "./globals.css"; // Global CSS styles
import type { Metadata } from "next"; // TypeScript type for page metadata
import Navbar from "./(components)/Navbar"; // Our navigation bar component

// Metadata configuration for the application
// This appears in browser tabs, search engines, and social media previews
export const metadata: Metadata = {
  title: "Spaced Out - 3D Portfolio",
  description: "3D model viewer portfolio showcasing interactive WebGL experiences",
};

// Root layout component that wraps all pages in the application
// This provides consistent structure and navigation across the entire site
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-50 dark:bg-gray-900 antialiased">
        {/* Global navigation bar - appears on all pages */}
        <Navbar currentPath="/" />
        
        {/* Main content area with semantic HTML and accessibility ID */}
        <main 
          id="main-content" 
          className="min-h-screen"
          // ARIA label for screen readers
          aria-label="Main content"
        >
          {/* Page-specific content rendered here */}
          {children}
        </main>
      </body>
    </html>
  );
}