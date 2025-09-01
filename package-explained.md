# Package.json Explained for Beginners

This file explains every line in our `package.json` file and what each dependency does.

## Basic Project Information

```json
"name": "spaced-out"
```
**What it is:** The project name used by npm and displayed in package managers.

```json
"version": "1.0.0"
```
**What it is:** Version number following semantic versioning (major.minor.patch format).

```json
"description": "A 3D portfolio website built with Next.js, React Three Fiber, and WebGL for interactive 3D model viewing"
```
**What it is:** Brief description of what this project does.

```json
"main": "index.js"
```
**What it is:** Entry point file when this package is imported (not used in Next.js apps).

## Scripts Section

```json
"scripts": {
  "dev": "next dev",        // Start development server with hot reload at http://localhost:3000
  "build": "next build",    // Create optimized production build in .next folder
  "start": "next start",    // Start production server (run 'build' first)
  "lint": "next lint"       // Run ESLint to check code quality and style
}
```

**How to use:** Run these with `npm run <script-name>`, for example: `npm run dev`

## Repository Information

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/DarrenRaines-K9/spaced-out.git"
}
```
**What it is:** Git repository information for this project.

```json
"keywords": ["portfolio", "3d", "webgl", "nextjs", "react-three-fiber"]
```
**What it is:** Keywords to help people find this package.

```json
"author": ""
```
**What it is:** Project author information (currently empty).

```json
"license": "ISC"
```
**What it is:** License type - ISC is a permissive open source license.

```json
"type": "commonjs"
```
**What it is:** Module system - 'commonjs' uses require/module.exports.

## Dependencies - The Packages Our App Needs

### 3D Graphics Libraries
```json
"@react-three/fiber": "^9.3.0"
```
**What it does:** React renderer for Three.js - enables 3D graphics in React components.

```json
"@react-three/drei": "^10.7.4"
```
**What it does:** Helper utilities for React Three Fiber (cameras, controls, model loaders).

```json
"three": "^0.179.1"
```
**What it does:** JavaScript 3D library for WebGL graphics - the core 3D engine.

```json
"leva": "^0.10.0"
```
**What it does:** GUI library for tweaking 3D scene parameters during development.

### React and Next.js
```json
"react": "^19.1.1"
```
**What it does:** JavaScript library for building user interfaces.

```json
"react-dom": "^19.1.1"
```
**What it does:** React package for DOM rendering (displays React components in the browser).

```json
"next": "^15.5.2"
```
**What it does:** React framework with App Router, server-side rendering, and optimization features.

### CSS and Styling
```json
"tailwindcss": "^4.1.12"
```
**What it does:** Utility-first CSS framework for rapid UI development.

```json
"@tailwindcss/postcss": "^4.1.12"
```
**What it does:** PostCSS plugin for Tailwind CSS processing.

```json
"postcss": "^8.5.6"
```
**What it does:** CSS post-processor for transforming styles.

```json
"autoprefixer": "^10.4.21"
```
**What it does:** Automatically adds vendor prefixes to CSS properties (like -webkit-, -moz-).

### TypeScript Support
```json
"typescript": "^5.9.2"
```
**What it does:** TypeScript compiler and language features.

```json
"@types/node": "^24.3.0"
```
**What it does:** TypeScript type definitions for Node.js APIs.

```json
"@types/react": "^19.1.12"
```
**What it does:** TypeScript type definitions for React.

```json
"@types/react-dom": "^19.1.9"
```
**What it does:** TypeScript type definitions for React DOM.

```json
"@types/three": "^0.179.0"
```
**What it does:** TypeScript type definitions for Three.js 3D library.

## Version Numbers Explained

The `^` symbol means "compatible version":
- `^1.0.0` accepts `1.0.0` to `<2.0.0` (any minor/patch updates)
- This ensures you get bug fixes and minor features, but not breaking changes

## Getting Started

1. **Install dependencies:** `npm install`
2. **Start development:** `npm run dev`
3. **Build for production:** `npm run build`
4. **Start production server:** `npm run start`
5. **Check code quality:** `npm run lint`