// This tells Next.js this component runs in the browser, not on the server
"use client";

// Import statements - bringing in code from other packages/files
import React, { useState, useEffect, useRef } from "react"; // React hooks for state and lifecycle management
import Logo from "./Logo"; // Our custom logo component

// TypeScript interface for navigation link structure
interface NavLink {
  label: string; // Display text for the link
  href: string; // URL path for the link
  isActive?: boolean; // Whether this is the current active page
}

// TypeScript interface defining the props our Navbar component accepts
interface NavbarProps {
  currentPath?: string; // Current page path for active link highlighting
  className?: string; // CSS classes to apply to the component
}

// Define our Navbar component as a Function Component with TypeScript
// This component provides a responsive, accessible navigation bar with time display
const Navbar: React.FC<NavbarProps> = ({
  currentPath = "/",
  className = "",
}) => {
  // State to control mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State to detect if user prefers dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Ref for the mobile menu button for accessibility
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  
  // Ref for the mobile menu for accessibility
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Navigation links configuration
  const navLinks: NavLink[] = [
    { label: "Home", href: "/", isActive: currentPath === "/" }
  ];

  // Effect to detect system dark mode preference
  useEffect(() => {
    // Check initial dark mode preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes in dark mode preference
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    
    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Effect to handle escape key press for closing mobile menu
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Return focus to menu button for accessibility
        mobileMenuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isMobileMenuOpen]);

  // Effect to handle click outside mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !mobileMenuButtonRef.current?.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close mobile menu (used when clicking nav links)
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 rounded-md shadow-lg border-2 border-blue-500 focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Main navigation bar */}
      <nav
        className={`sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 ${className}`}
        aria-label="Primary"
        // Support for safe area insets on mobile devices
        style={{
          paddingTop: "env(safe-area-inset-top, 0)",
          paddingLeft: "env(safe-area-inset-left, 0)",
          paddingRight: "env(safe-area-inset-right, 0)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side: Logo and title */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded-md"
                aria-label="Go to homepage"
              >
                <Logo size={32} showTitle={true} />
              </a>
            </div>

            {/* Center/Right: Desktop navigation links */}
            <div>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
                    link.isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  aria-current={link.isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Far Right: Mobile menu button */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                ref={mobileMenuButtonRef}
                onClick={toggleMobileMenu}
                className="md:hidden inline-flex items-center justify-center p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded-md transition-colors duration-200"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle mobile menu"
              >
                {/* Hamburger icon with animation */}
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute top-1 left-0 w-6 h-0.5 bg-current transform transition-transform duration-200 ${
                      isMobileMenuOpen ? "rotate-45 top-2.5" : ""
                    }`}
                  />
                  <span
                    className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-opacity duration-200 ${
                      isMobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute top-4 left-0 w-6 h-0.5 bg-current transform transition-transform duration-200 ${
                      isMobileMenuOpen ? "-rotate-45 top-2.5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`md:hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
            {/* Mobile navigation links */}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
                  link.isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                aria-current={link.isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

// Export the component so other files can import and use it
export default Navbar;