# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Spaced Out" is a 3D portfolio website built with Next.js 15, React Three Fiber, and WebGL for interactive 3D model viewing. The project features a clean, responsive navigation system and focuses on showcasing 3D models with real-time lighting controls through an accessible interface.

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint (deprecated - migrating to ESLint CLI)

# Asset Management
# 3D models should be placed in /public/models/ as .glb files
# Current model: /public/models/model.glb (3MB GLTF binary)
```

## Architecture Overview

The project uses Next.js App Router with a component-based architecture featuring both UI navigation and 3D rendering:

### Core Architecture Pattern

- **SSR-Safe Rendering**: All client components use `"use client"` directive
- **3D Components**: Dynamic imports with `{ ssr: false }` to prevent server-side rendering issues
- **Navigation System**: Global responsive navbar with accessibility features
- **Component Hierarchy**: `layout.tsx` → `Navbar` + `page.tsx` → `ThreeModelSection` → `CanvasStage` → `Model`
- **Performance Strategy**: Uses `useGLTF.preload()` for asset optimization and proper cleanup patterns

### Key Components Structure

```
app/
├── page.tsx                    # Main page with adjusted viewport height
├── layout.tsx                  # Root layout with global navbar integration
├── (components)/
│   ├── Navbar.tsx              # Responsive navigation component
│   ├── Logo.tsx                # Space-themed SVG logo component
│   ├── ThreeModelSection.tsx   # 3D wrapper component
│   └── three/
│       ├── CanvasStage.tsx     # Canvas setup with controls & environment
│       └── Model.tsx           # GLTF loader with Leva controls
```

### Technology Stack

- **React Three Fiber**: React renderer for Three.js
- **@react-three/drei**: Essential helpers (OrbitControls, Environment, useGLTF)
- **Leva**: Real-time GUI controls for development and demonstration
- **Three.js**: Core 3D graphics library

## Navigation System

https://nashville-software-school.github.io/foundations-course/github-account

### Navbar Component (`Navbar.tsx`)

- **Responsive Design**: Mobile-first approach with hamburger menu
- **Accessibility Features**:
  - Skip-to-content link for keyboard navigation
  - ARIA labels and semantic markup
  - Focus-visible styles and keyboard navigation
  - Escape key and click-outside menu handling
- **Functionality**:
  - Sticky positioning with backdrop blur effect
  - System dark mode detection
  - Active link highlighting based on current path
  - Safe area inset support for mobile devices
- **Layout**: Logo/title on left, navigation links in center, mobile menu button on right

### Logo Component (`Logo.tsx`)

- **Space Theme**: Custom SVG with planet, orbital rings, and gradients
- **Scalable**: Configurable size with proper aspect ratio maintenance
- **Accessible**: Semantic markup with descriptive ARIA labels

## 3D Development Patterns

### Model Loading

- Models are loaded via `useGLTF("/models/model.glb")`
- Always use `useGLTF.preload()` before component definition
- Models support both single and multi-material wireframe toggling
- Shadow casting/receiving is configurable per mesh

### Lighting Setup

- **Ambient Light**: Global scene illumination
- **Key Light**: Primary directional light with shadow casting
- **Fill Light**: Secondary directional light for softer illumination
- All lighting properties exposed through Leva controls

### Control Interface (Leva)

Controls are organized into logical groups:

- **Model**: Position (XYZ), rotation Y, scale, wireframe toggle
- **Lights**: Ambient/key/fill intensity, key/fill colors
- **Environment**: HDR environment preset selection
- **Shadows**: Enable/disable, blur amount

### Performance Considerations

- Dynamic imports prevent SSR hydration issues
- `<Suspense>` boundaries for loading states
- Camera positioned at `[2.5, 1.8, 3.5]` with 50° FOV
- Ground plane for shadow catching (conditional rendering)
- Main content area uses `calc(100vh-4rem)` to account for navbar height

## TypeScript Configuration

- Strict mode enabled with `@/*` path aliasing
- Next.js plugin integrated for App Router support
- Three.js and React Three Fiber types included
- Full type safety for navigation components

## Styling & Design System

- **Tailwind CSS 4.x**: Utility-first styling with PostCSS
- **Dark Mode**: System-aware color scheme support
- **Responsive Breakpoints**: Mobile-first design patterns
- **Accessibility**: High contrast support and focus-visible styles
- **Layout**: Sticky navbar with backdrop blur, full viewport utilization
- **Safe Areas**: Mobile device notch and home indicator support
