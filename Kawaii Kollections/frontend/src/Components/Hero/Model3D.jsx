// src/Components/Hero/Model3D.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html } from '@react-three/drei';

function Gift({ url, rise = 0 }) {
  const group = useRef();
  const { scene } = useGLTF(url);

  // gentle rotation + float
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.6;        // spin
    group.current.position.y = rise + Math.sin(state.clock.elapsedTime * 1.2) * 0.04; // tiny float
  });

  // Adjust scale to fit your scene; tweak if your model is huge/tiny
  return <primitive ref={group} object={scene} scale={1.2} position={[0, 0, 0]} />;
}

export default function Model3D({ url = '/models/gift.glb' }) {
  return (
    <div className="three-stage">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 35, position: [0, 0.6, 3.2] }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 4]} intensity={1.0} castShadow />
        <Environment preset="studio" />

        <React.Suspense
          fallback={
            <Html center style={{ pointerEvents: 'none', userSelect: 'none' }}>
              Loading…
            </Html>
          }
        >
          {/* Rise ≈ the amount product sits above box base after your CSS rise */}
          <Gift url={url} rise={-0.1} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

// Preload for faster first paint
useGLTF.preload('/models/gift.glb');
