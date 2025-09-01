// Import statements - bringing in code from other packages/files
import React from "react"; // React core library for creating components

// TypeScript interface defining the props our Logo component accepts
interface LogoProps {
  size?: number; // Logo size in pixels (width and height)
  className?: string; // CSS classes to apply to the component
  showTitle?: boolean; // Whether to show the app title next to the logo
}

// Define our Logo component as a Function Component with TypeScript
// This component renders a space-themed SVG logo for the "Spaced Out" portfolio
const Logo: React.FC<LogoProps> = ({
  size = 32, // Default size: 32px
  className = "",
  showTitle = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* SVG Logo - Space-themed icon with planet and orbital rings */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        // Accessibility: provide meaningful description for screen readers
        aria-label="Spaced Out logo - planet with orbital rings"
        role="img"
      >
        {/* Gradient definitions for modern look */}
        <defs>
          {/* Planetary gradient - blue to purple */}
          <radialGradient id="planetGradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </radialGradient>
          
          {/* Ring gradient - subtle silver/gray */}
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="50%" stopColor="#9CA3AF" />
            <stop offset="100%" stopColor="#6B7280" />
          </linearGradient>
        </defs>
        
        {/* Outer orbital ring - tilted ellipse */}
        <ellipse
          cx="16"
          cy="16"
          rx="14"
          ry="6"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="1.5"
          opacity="0.6"
          transform="rotate(15 16 16)"
        />
        
        {/* Inner orbital ring - different tilt */}
        <ellipse
          cx="16"
          cy="16"
          rx="11"
          ry="4"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="1"
          opacity="0.4"
          transform="rotate(-30 16 16)"
        />
        
        {/* Central planet */}
        <circle
          cx="16"
          cy="16"
          r="7"
          fill="url(#planetGradient)"
        />
        
        {/* Planet surface details - small craters/spots */}
        <circle
          cx="13"
          cy="14"
          r="1.5"
          fill="#4F46E5"
          opacity="0.3"
        />
        <circle
          cx="18"
          cy="18"
          r="1"
          fill="#7C3AED"
          opacity="0.4"
        />
        <circle
          cx="16"
          cy="12"
          r="0.8"
          fill="#3B82F6"
          opacity="0.5"
        />
        
        {/* Highlight on planet for 3D effect */}
        <ellipse
          cx="14"
          cy="13"
          rx="2"
          ry="3"
          fill="#FFFFFF"
          opacity="0.2"
        />
      </svg>
      
      {/* App title - only shown if showTitle is true */}
      {showTitle && (
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          Spaced Out
        </span>
      )}
    </div>
  );
};

// Export the component so other files can import and use it
export default Logo;