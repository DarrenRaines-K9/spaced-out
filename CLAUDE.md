# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Spaced Out" is a 3D portfolio website built with Next.js 15, React Three Fiber, and WebGL for interactive 3D model viewing. The project focuses on showcasing 3D models with real-time lighting controls and interactive manipulation through a clean, minimal interface.

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production  
npm start           # Start production server
npm run lint        # Run ESLint

# Asset Management
# 3D models should be placed in /public/models/ as .glb files
# Current model: /public/models/model.glb (3MB GLTF binary)
```

## Architecture Overview

The project uses Next.js App Router with a component-based 3D rendering architecture:

### Core Architecture Pattern
- **SSR-Safe 3D Rendering**: All 3D components use `"use client"` directive and dynamic imports with `{ ssr: false }` to prevent server-side rendering issues
- **Component Hierarchy**: `page.tsx` → `ThreeModelSection` → `CanvasStage` → `Model` 
- **Performance Strategy**: Uses `useGLTF.preload()` for asset optimization and `<Preload all />` for scene preparation

### Key Components Structure
```
app/
├── page.tsx                    # Main page with dynamic 3D import
├── layout.tsx                  # Root layout with metadata
├── (components)/
│   ├── ThreeModelSection.tsx   # 3D wrapper component
│   └── three/
│       ├── CanvasStage.tsx     # Canvas setup with controls & environment
│       └── Model.tsx           # GLTF loader with Leva controls
```

### 3D Rendering Stack
- **React Three Fiber**: React renderer for Three.js
- **@react-three/drei**: Essential helpers (OrbitControls, Environment, useGLTF)
- **Leva**: Real-time GUI controls for development and demonstration
- **Three.js**: Core 3D graphics library

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

## TypeScript Configuration

- Strict mode enabled with `@/*` path aliasing
- Next.js plugin integrated for App Router support
- Three.js and React Three Fiber types included

## Styling

- **Tailwind CSS 4.x**: Utility-first styling with PostCSS
- Full viewport usage: Components use `w-full h-screen` patterns
- No custom themes or plugins configured
