"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import type { Mesh, MeshBasicMaterial } from "three";

function Beam() {
  const mesh = useRef<Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    (mesh.current.material as MeshBasicMaterial).opacity = 0.7 + Math.sin(t * 2.4) * 0.25;
    mesh.current.position.y = Math.sin(t * 0.4) * 0.25;
  });
  return (
    <mesh ref={mesh}>
      <cylinderGeometry args={[0.018, 0.018, 7, 8]} />
      <meshBasicMaterial color="#e85f4c" transparent opacity={0.8} />
    </mesh>
  );
}

export default function ProcessBeam() {
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.2]}
      camera={{ position: [0, 0, 3], fov: 25 }}
      gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
      style={{
        position: "absolute",
        left: "-24px",
        top: 0,
        width: "50px",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      <Beam />
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.5} luminanceThreshold={0.05} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
