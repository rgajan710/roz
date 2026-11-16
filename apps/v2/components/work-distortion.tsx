"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
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
    <planeGeometry args={[2, 2, 32, 32]} />
    <shaderMaterial ref={material} uniforms={{ uTexture: { value: texture }, uTime: { value: 0 }, uPointer: { value: new Vector2() } }}
      vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`}
      fragmentShader={`uniform sampler2D uTexture; uniform float uTime; uniform vec2 uPointer; varying vec2 vUv; void main() { vec2 uv = vUv; vec2 cursor = uPointer * 0.5 + 0.5; vec2 delta = uv - cursor; float dist = length(delta); float ripple = sin(dist * 18.0 - uTime * 3.5) * (0.009 / (dist + 0.3)); float ambient = sin(uv.y * 10.0 + uTime * 1.8) * 0.004; uv += normalize(delta + 0.001) * ripple + vec2(ambient, 0.0); vec4 color = texture2D(uTexture, clamp(uv, 0.001, 0.999)); float warmth = smoothstep(0.4, 0.0, dist) * 0.12; color.r += warmth * 0.08; color.g += warmth * 0.03; color.b -= warmth * 0.05; gl_FragColor = color; }`} />
  </mesh>;
}

export default function WorkDistortion({ src }: { src: string }) {
  return (
    <Canvas aria-hidden="true" dpr={motionConfig.dpr} gl={{ antialias: false, powerPreference: "low-power" }}>
      <Suspense fallback={null}>
        <DistortedImage src={src} />
      </Suspense>
    </Canvas>
  );
}
