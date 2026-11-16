"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import { useRef, useEffect, useMemo, useSyncExternalStore } from "react";
import {
  InstancedMesh,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  Vector2,
  IcosahedronGeometry,
  MathUtils,
  Group,
} from "three";
import { motionConfig } from "@/lib/motion";
import { scrollState } from "@/lib/scroll";
import { supportsRichMotion } from "@/lib/device";

const tempObject = new Object3D();

// ─── LiquidPearlEntity (Luminous, Pristine Refractive Sculpture) ──────────────

function LiquidPearlEntity() {
  const meshRef = useRef<Mesh>(null);
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uMouse: { value: new Vector2(0, 0) },
    uScroll: { value: 0 },
  });

  const material = useMemo(() => {
    const mat = new MeshPhysicalMaterial({
      color: "#ffffff",
      emissive: "#ffffff",
      emissiveIntensity: 0.48,
      roughness: 0.05,
      metalness: 0.01,
      transmission: 0.94,
      thickness: 0.6,
      ior: 1.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.98,
      transparent: true,
      opacity: 0.96,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniformsRef.current.uTime;
      shader.uniforms.uMouse = uniformsRef.current.uMouse;
      shader.uniforms.uScroll = uniformsRef.current.uScroll;

      shader.vertexShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uScroll;

        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        ${shader.vertexShader}
      `;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>
        // Subtle, elegant liquid surface wave — gentle and fluid, never spiky or crumpled
        float wave = snoise(transformed * 0.95 + vec3(uTime * 0.35));
        float mouseDist = length(uMouse);
        float amplitude = 0.09 + mouseDist * 0.04 + uScroll * 0.06;
        transformed += normal * (wave * amplitude);
        `
      );
    };

    return mat;
  }, []);

  const geometry = useMemo(() => new IcosahedronGeometry(0.85, 64), []);

  useFrame((state, delta) => {
    scrollState.progress += (scrollState.targetProgress - scrollState.progress) * 0.075;
    const sp = scrollState.progress;

    uniformsRef.current.uTime.value = state.clock.elapsedTime;
    uniformsRef.current.uMouse.value.set(state.pointer.x, state.pointer.y);
    uniformsRef.current.uScroll.value = sp;

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.15 + sp * 0.5;

      let targetX = 1.85;
      let targetY = 0.0;
      let targetZ = 0.0;
      let targetScale = 0.9;

      if (sp < 0.18) {
        const t = sp / 0.18;
        targetX = MathUtils.lerp(1.85, 0.0, t);
        targetY = MathUtils.lerp(0.0, -0.1, t);
        targetZ = MathUtils.lerp(0.0, 0.4, t);
        targetScale = MathUtils.lerp(0.9, 1.15, t);
      } else if (sp < 0.38) {
        const t = (sp - 0.18) / 0.20;
        targetX = MathUtils.lerp(0.0, 1.8, t);
        targetY = MathUtils.lerp(-0.1, 0.6, t);
        targetZ = MathUtils.lerp(0.4, -0.8, t);
        targetScale = MathUtils.lerp(1.15, 0.75, t);
      } else if (sp < 0.68) {
        const t = (sp - 0.38) / 0.30;
        targetX = MathUtils.lerp(1.8, -1.7, t);
        targetY = MathUtils.lerp(0.6, -0.2, t);
        targetZ = MathUtils.lerp(-0.8, -0.3, t);
        targetScale = MathUtils.lerp(0.75, 0.85, t);
      } else if (sp < 0.82) {
        const t = (sp - 0.68) / 0.14;
        targetX = MathUtils.lerp(-1.7, 0.0, t);
        targetY = MathUtils.lerp(-0.2, 1.4, t);
        targetZ = MathUtils.lerp(-0.3, -0.5, t);
        targetScale = MathUtils.lerp(0.85, 0.95, t);
      } else {
        const t = (sp - 0.82) / 0.18;
        targetX = MathUtils.lerp(0.0, 0.0, t);
        targetY = MathUtils.lerp(1.4, 0.1, t);
        targetZ = MathUtils.lerp(-0.5, 0.2, t);
        targetScale = MathUtils.lerp(0.95, 0.9, t);
      }

      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.08;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.08;
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.08;
      meshRef.current.scale.setScalar(
        meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.08
      );
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.25}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
    </Float>
  );
}

// ─── MinimalPlatinumRings (Refined, Polished Platinum Orbitals) ──────────────

function MinimalPlatinumRings() {
  const group = useRef<Group>(null);
  const ring1 = useRef<Mesh>(null);
  const ring2 = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const sp = scrollState.progress;

    if (group.current) {
      let targetX = 1.85;
      let targetY = 0.0;
      let targetZ = 0.0;
      let targetScale = 0.9;

      if (sp < 0.18) {
        const factor = sp / 0.18;
        targetX = MathUtils.lerp(1.85, 0.0, factor);
        targetY = MathUtils.lerp(0.0, -0.1, factor);
        targetZ = MathUtils.lerp(0.0, 0.4, factor);
        targetScale = MathUtils.lerp(0.9, 1.15, factor);
      } else if (sp < 0.38) {
        const factor = (sp - 0.18) / 0.20;
        targetX = MathUtils.lerp(0.0, 1.8, factor);
        targetY = MathUtils.lerp(-0.1, 0.6, factor);
        targetZ = MathUtils.lerp(0.4, -0.8, factor);
        targetScale = MathUtils.lerp(1.15, 0.75, factor);
      } else if (sp < 0.68) {
        const factor = (sp - 0.38) / 0.30;
        targetX = MathUtils.lerp(1.8, -1.7, factor);
        targetY = MathUtils.lerp(0.6, -0.2, factor);
        targetZ = MathUtils.lerp(-0.8, -0.3, factor);
        targetScale = MathUtils.lerp(0.75, 0.85, factor);
      } else if (sp < 0.82) {
        const factor = (sp - 0.68) / 0.14;
        targetX = MathUtils.lerp(-1.7, 0.0, factor);
        targetY = MathUtils.lerp(-0.2, 1.4, factor);
        targetZ = MathUtils.lerp(-0.3, -0.5, factor);
        targetScale = MathUtils.lerp(0.85, 0.95, factor);
      } else {
        const factor = (sp - 0.82) / 0.18;
        targetX = MathUtils.lerp(0.0, 0.0, factor);
        targetY = MathUtils.lerp(1.4, 0.1, factor);
        targetZ = MathUtils.lerp(-0.5, 0.2, factor);
        targetScale = MathUtils.lerp(0.95, 0.9, factor);
      }

      group.current.position.x += (targetX - group.current.position.x) * 0.08;
      group.current.position.y += (targetY - group.current.position.y) * 0.08;
      group.current.position.z += (targetZ - group.current.position.z) * 0.08;
      group.current.scale.setScalar(
        group.current.scale.x + (targetScale - group.current.scale.x) * 0.08
      );
    }

    if (ring1.current) {
      ring1.current.rotation.z = t * 0.06 + sp * 1.2;
      ring1.current.rotation.x = Math.sin(t * 0.2) * 0.25 + state.pointer.y * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.08 + sp * 1.5;
      ring2.current.rotation.x = Math.cos(t * 0.18) * 0.25 + state.pointer.x * 0.1;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={ring1}>
        <torusGeometry args={[1.15, 0.008, 32, 128]} />
        <meshStandardMaterial
          color="#e8e8e5"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[1.3, 0.006, 32, 128]} />
        <meshStandardMaterial
          color="#dededb"
          metalness={0.92}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

// ─── AmbientLustreMotes (Minimal subtle stardust) ────────────────────────────

const PARTICLE_COUNT = 36;

function AmbientLustreMotes() {
  const mesh = useRef<InstancedMesh>(null);
  const particleData = useRef<Array<{ x: number; y: number; z: number; speed: number; phase: number }>>([]);

  useEffect(() => {
    if (!mesh.current) return;
    particleData.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 1.6 + Math.random() * 3.2;
      const y = (Math.random() - 0.5) * 5.0;
      particleData.current.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        speed: 0.1 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
      });
      tempObject.position.set(Math.cos(theta) * r, y, Math.sin(theta) * r);
      tempObject.scale.setScalar(0.6 + Math.random() * 0.6);
      tempObject.updateMatrix();
      mesh.current.setMatrixAt(i, tempObject.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const sp = scrollState.progress;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particleData.current[i];
      const angle = t * p.speed + p.phase + sp * 1.5;
      const radius = Math.sqrt(p.x * p.x + p.z * p.z);
      const px = Math.cos(angle) * radius;
      const pz = Math.sin(angle) * radius;
      const py = p.y + Math.sin(t * 0.8 + p.phase) * 0.25 - sp * 1.0;

      tempObject.position.set(px, py, pz);
      tempObject.scale.setScalar(0.6 + Math.sin(t * 1.5 + p.phase) * 0.2);
      tempObject.updateMatrix();
      mesh.current.setMatrixAt(i, tempObject.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.016, 8, 8]} />
      <meshBasicMaterial color="#b0b0a8" transparent opacity={0.3} />
    </instancedMesh>
  );
}

// ─── CameraRig ───────────────────────────────────────────────────────────────

function CameraRig() {
  useFrame((state, delta) => {
    const sp = scrollState.progress;
    const baseZ = 5.2 - sp * 1.0;
    const baseY = -sp * 0.4;

    const targetX = state.pointer.x * 0.4;
    const targetY = baseY - state.pointer.y * 0.25;

    state.camera.position.x += (targetX - state.camera.position.x) * Math.min(delta * 2.2, 1) * 0.35;
    state.camera.position.y += (targetY - state.camera.position.y) * Math.min(delta * 2.2, 1) * 0.35;
    state.camera.position.z += (baseZ - state.camera.position.z) * Math.min(delta * 2.2, 1) * 0.35;

    state.camera.lookAt(0, baseY * 0.3, 0);
  });
  return null;
}

// ─── WorldScene (Export) ─────────────────────────────────────────────────────

const emptySubscribe = () => () => {};

export default function WorldScene() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => supportsRichMotion(),
    () => false
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;
    let frame = 0;
    const tick = () => {
      if (containerRef.current) {
        const sp = scrollState.progress;
        // Fade gracefully as hero scrolls away, keeping Hero dramatic without muddying later chapters
        const opacity = Math.max(1 - sp * 3.2, 0);
        containerRef.current.style.opacity = String(opacity);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="world-scene-container"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        transition: "opacity 0.15s ease-out",
      }}
    >
      <Canvas
        aria-hidden="true"
        dpr={motionConfig.dpr}
        camera={{ position: [0, 0, 5.2], fov: 30 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      >
        <fog attach="fog" args={["#fafaf7", 4, 12]} />

        {/* High-key, luminous ambient fill to eliminate dark shadow craters */}
        <ambientLight intensity={2.4} color="#ffffff" />

        {/* Soft, clean multi-angle fill lights */}
        <directionalLight position={[5, 7, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-6, 2, 4]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[0, -5, 3]} intensity={1.0} color="#ffffff" />
        <directionalLight position={[0, 0, 5]} intensity={0.9} color="#ffffff" />

        <CameraRig />
        <LiquidPearlEntity />
        <MinimalPlatinumRings />
        <AmbientLustreMotes />

        <EffectComposer multisampling={0}>
          <Bloom intensity={0.12} luminanceThreshold={0.9} mipmapBlur />
          <Noise opacity={0.008} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
