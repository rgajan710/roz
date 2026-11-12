"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";
import { motionConfig } from "@/lib/motion";

function DistortedImage({ src }: { src: string }) {
  const texture = useLoader(TextureLoader, src);
  const material = useRef<ShaderMaterial>(null);
  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uPointer.value.set(state.pointer.x, state.pointer.y);
  });
  return <mesh>
    <planeGeometry args={[2, 2, 1, 1]} />
    <shaderMaterial ref={material} uniforms={{ uTexture: { value: texture }, uTime: { value: 0 }, uPointer: { value: new Vector2() } }}
      vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`}
      fragmentShader={`uniform sampler2D uTexture; uniform float uTime; uniform vec2 uPointer; varying vec2 vUv; void main() { vec2 uv = vUv; float wave = sin(uv.y * 12.0 + uTime * 2.0) * 0.008; uv.x += wave * (0.5 + abs(uPointer.x)); gl_FragColor = texture2D(uTexture, uv); }`} />
  </mesh>;
}

export default function WorkDistortion({ src }: { src: string }) {
  return <Canvas aria-hidden="true" dpr={motionConfig.dpr} gl={{ antialias: false, powerPreference: "low-power" }}><DistortedImage src={src} /></Canvas>;
}
