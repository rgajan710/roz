"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer, Noise } from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import { InstancedMesh, Mesh, Object3D, Vector2 } from "three";
import { motionConfig } from "@/lib/motion";

function Sculpture() {
  const mesh = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += (state.pointer.y * 0.22 - mesh.current.rotation.x) * Math.min(delta * 2, 1);
    mesh.current.rotation.y += delta * (0.11 + state.pointer.x * 0.03);
    mesh.current.rotation.z = 0.3 + Math.min(window.scrollY / window.innerHeight, 1) * 0.25;
  });
  return <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.35}>
    <mesh ref={mesh} rotation={[0.2, 0.2, 0.3]}>
      <torusKnotGeometry args={[1.15, 0.34, 160, 24, 2, 3]} />
      <meshStandardMaterial color="#dce99a" metalness={0.55} roughness={0.23} />
    </mesh>
  </Float>;
}

function Particles() {
  const points = useRef<InstancedMesh>(null);
  useEffect(() => {
    if (!points.current) return;
    const object = new Object3D();
    for (let i = 0; i < 48; i++) {
      object.position.set(Math.sin(i * 2.4) * 3.2, Math.cos(i * 1.7) * 2.3, Math.sin(i * 0.8) * 1.2 - 1);
      object.scale.setScalar(0.5 + (i % 4) * 0.2);
      object.updateMatrix();
      points.current.setMatrixAt(i, object.matrix);
    }
    points.current.instanceMatrix.needsUpdate = true;
  }, []);
  return <instancedMesh ref={points} args={[undefined, undefined, 48]}><sphereGeometry args={[0.022, 6, 6]} /><meshBasicMaterial color="#dce99a" /></instancedMesh>;
}

export default function HeroScene() {
  return <Canvas aria-hidden="true" dpr={motionConfig.dpr} camera={{ position: [0, 0, 5], fov: 36 }} gl={{ antialias: false, powerPreference: "high-performance" }}>
    <ambientLight intensity={0.6} />
    <directionalLight position={[3, 5, 5]} intensity={3} color="#fff4dd" />
    <pointLight position={[-4, -2, 2]} intensity={25} color="#e85f4c" />
    <Sculpture />
    <Particles />
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.18} luminanceThreshold={0.8} mipmapBlur />
      <ChromaticAberration offset={new Vector2(0.0007, 0.0007)} />
      <Noise opacity={0.035} />
    </EffectComposer>
  </Canvas>;
}
