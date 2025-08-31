# spaced-out

You are a senior Next.js + WebGL engineer.
Goal: implement only a 3D model viewer section in a Next.js (App Router) project using React Three Fiber, @react-three/drei, and Leva — no extra site sections.

## Constraints

- Keep it minimal and production-ready.
- All 3D code must be client components ("use client").
- Use dynamic import to skip SSR for the canvas.
- Use useGLTF to load a GLB from /public/models/model.glb (configurable).
- Provide basic Leva controls for model transform + lights + environment.
- Include OrbitControls, Environment, and shadows.
- Keep code split into 3 small files for clarity.

Customization Inputs (defaults if not overridden)

- modelPath: /models/model.glb
- camera: { position: [2.5, 1.8, 3.5], fov: 50 }
- environmentPreset: "city"
- initialRotationY: Math.PI / 4

Apply inputs consistently.

1. Where to mount

- Show how to add a <ThreeModelSection /> inside app/page.tsx using next/dynamic (SSR off).

2. Files (only these)

- app/(components)/ThreeModelSection.tsx — dynamic wrapper (client entry)
- app/(components)/three/CanvasStage.tsx — the <Canvas> scene
- app/(components)/three/Model.tsx — GLB loader + Leva controls

3. Code requirements

- Canvas: shadows, antialias, Preload all, OrbitControls, Environment with preset.
- Lights: ambient + directional (key/fill) with Leva intensities.
- Leva panel groups: "Model" (position, rotation, scale, wireframe), "Lights" (ambient/key/fill, color), "Env" (preset select), "Shadows" (on/off, blur).
- useGLTF.preload(modelPath).
- Ensure meshes cast/receive shadows; wireframe toggle traverses children.

4. Exact example code (fully copy-paste)

- Provide complete code for the three files above and the exact snippet to insert into app/page.tsx.

5. Quick test checklist

- Model renders, rotates with OrbitControls.
- Leva controls affect transform, lights, env, shadows.
- No SSR errors; page builds in dev + prod.

## Output Format

- Start with the install commands.
- Then the page.tsx usage snippet.
- Then the full source for the three files.
- Finish with the checklist.

Use TypeScript, concise comments, and no extra boilerplate beyond what’s specified.

⸻

Why this works (brief)

- It scopes the task narrowly (only the 3D viewer), reducing noise.
- Forces SSR-safe dynamic import and client-only 3D components.
- Bakes in Leva controls and performance best practices (Preload, shadows, env).
- Keeps file count tiny so it’s easy to drop into any Next.js app.
