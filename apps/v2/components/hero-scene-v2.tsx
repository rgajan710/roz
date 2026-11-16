"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer, Noise } from "@react-three/postprocessing";
import { useRef, useEffect, useMemo } from "react";
import {
  InstancedMesh,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  Vector2,
  IcosahedronGeometry,
  MathUtils,
} from "three";
import { motionConfig } from "@/lib/motion";
import { scrollState } from "@/lib/scroll";

const tempObject = new Object3D();
const CHROMA_OFFSET = new Vector2(0.0005, 0.0005);

// ─── LiquidPearlEntity (Morphing sculpture scrubbed by scroll) ────────────────

function LiquidPearlEntity() {
  const meshRef = useRef<Mesh>(null);
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uMouse: { value: new Vector2(0, 0) },
    uScroll: { value: 0 },
    uIntensity: { value: 0.38 },
  });

  const material = useMemo(() => {
    const mat = new MeshPhysicalMaterial({
      color: "#ffffff",
      emissive: "#ffebe5",
      emissiveIntensity: 0.28,
      roughness: 0.12,
      metalness: 0.08,
      transmission: 0.58,
      thickness: 1.6,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.92,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniformsRef.current.uTime;
      shader.uniforms.uMouse = uniformsRef.current.uMouse;
      shader.uniforms.uScroll = uniformsRef.current.uScroll;
      shader.uniforms.uIntensity = uniformsRef.current.uIntensity;

      shader.vertexShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uScroll;
        uniform float uIntensity;

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
        float noise = snoise(transformed * 1.5 + vec3(uTime * 0.45));
        float mouseDist = length(uMouse);
        float dynamicEnergy = uIntensity + mouseDist * 0.16 + uScroll * 0.28;
        float displacement = noise * dynamicEnergy;
        transformed += normal * displacement;
        `
      );
    };

    return mat;
  }, []);

  const geometry = useMemo(() => new IcosahedronGeometry(1.4, 64), []);

  useFrame((state, delta) => {
    // Damped interpolation of scroll progress
    scrollState.progress += (scrollState.targetProgress - scrollState.progress) * 0.07;
    const sp = scrollState.progress;

    uniformsRef.current.uTime.value = state.clock.elapsedTime;
    uniformsRef.current.uMouse.value.set(state.pointer.x, state.pointer.y);
    uniformsRef.current.uScroll.value = sp;

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (0.16 + sp * 0.4);
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.2 + sp * 0.8;

      // Choreographed 3D trajectory based on scroll progress:
      // Hero: X: 1.1, Y: 0.1
      // Manifesto: X: 0.0, Y: -0.2
      // Projects: X: 0.8, Y: 1.4
      // Proof: X: -0.7, Y: 0.2
      // Contact: X: 0.0, Y: 0.0
      let targetX = 1.1;
      let targetY = 0.1;
      let targetScale = 1.0;

      if (sp < 0.25) {
        const factor = sp / 0.25;
        targetX = MathUtils.lerp(1.1, 0.0, factor);
        targetY = MathUtils.lerp(0.1, -0.15, factor);
        targetScale = MathUtils.lerp(1.0, 1.15, factor);
      } else if (sp < 0.65) {
        const factor = (sp - 0.25) / 0.4;
        targetX = MathUtils.lerp(0.0, 0.85, factor);
        targetY = MathUtils.lerp(-0.15, 1.25, factor);
        targetScale = MathUtils.lerp(1.15, 0.88, factor);
      } else if (sp < 0.85) {
        const factor = (sp - 0.65) / 0.2;
        targetX = MathUtils.lerp(0.85, -0.65, factor);
        targetY = MathUtils.lerp(1.25, 0.1, factor);
        targetScale = MathUtils.lerp(0.88, 1.05, factor);
      } else {
        const factor = (sp - 0.85) / 0.15;
        targetX = MathUtils.lerp(-0.65, 0.0, factor);
        targetY = MathUtils.lerp(0.1, 0.0, factor);
        targetScale = MathUtils.lerp(1.05, 0.95, factor);
      }

      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.08;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.08;
      meshRef.current.scale.setScalar(
        meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.08
      );
    }
  });

  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
    </Float>
  );
}

// ─── GoldenIridescentRings (Choreographed Orbital Architecture) ───────────────

function GoldenIridescentRings() {
  const group = useRef<Mesh>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const sp = scrollState.progress;

    group.current.rotation.z = t * 0.08 + sp * 1.5;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.3 + state.pointer.y * 0.2 + sp * 0.8;
    group.current.rotation.y = Math.cos(t * 0.2) * 0.3 + state.pointer.x * 0.2 + sp * 1.2;

    const targetScale = 1.0 + sp * 0.35;
    group.current.scale.setScalar(
      group.current.scale.x + (targetScale - group.current.scale.x) * 0.06
    );
  });

  return (
    <mesh ref={group}>
      <torusGeometry args={[2.5, 0.024, 32, 128]} />
      <meshStandardMaterial
        color="#c29547"
        emissive="#ff442b"
        emissiveIntensity={0.2}
        metalness={0.9}
        roughness={0.18}
      />
    </mesh>
  );
}

// ─── ChampagneStardust (Ambient light motes responding to scroll) ─────────────

const PARTICLE_COUNT = 52;

function ChampagneStardust() {
  const mesh = useRef<InstancedMesh>(null);
  const particleData = useRef<Array<{ x: number; y: number; z: number; speed: number; phase: number }>>([]);

  useEffect(() => {
    if (!mesh.current) return;
    particleData.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 2.0 + Math.random() * 4.0;
      const y = (Math.random() - 0.5) * 6.0;
      particleData.current.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        speed: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
      });
      tempObject.position.set(Math.cos(theta) * r, y, Math.sin(theta) * r);
      tempObject.scale.setScalar(0.7 + Math.random() * 0.8);
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
      const angle = t * p.speed + p.phase + sp * 1.8;
      const radius = Math.sqrt(p.x * p.x + p.z * p.z) * (1 + sp * 0.25);
      const px = Math.cos(angle) * radius;
      const pz = Math.sin(angle) * radius;
      const py = p.y + Math.sin(t * 1.0 + p.phase) * 0.3 - sp * 1.2;

      tempObject.position.set(px, py, pz);
      tempObject.scale.setScalar(0.7 + Math.sin(t * 2.0 + p.phase) * 0.25);
      tempObject.updateMatrix();
      mesh.current.setMatrixAt(i, tempObject.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.024, 8, 8]} />
      <meshBasicMaterial color="#c29547" transparent opacity={0.48} />
    </instancedMesh>
  );
}

// ─── SynchronizedCameraRig ───────────────────────────────────────────────────

function SynchronizedCameraRig() {
  useFrame((state, delta) => {
    const sp = scrollState.progress;
    // Base camera coordinates scrubbed smoothly by scroll progress
    const baseZ = 5.8 - sp * 1.1;
    const baseY = -sp * 0.6;

    // Mouse parallax offset
    const targetX = state.pointer.x * 0.65;
    const targetY = baseY - state.pointer.y * 0.45;

    state.camera.position.x += (targetX - state.camera.position.x) * Math.min(delta * 2.2, 1) * 0.35;
    state.camera.position.y += (targetY - state.camera.position.y) * Math.min(delta * 2.2, 1) * 0.35;
    state.camera.position.z += (baseZ - state.camera.position.z) * Math.min(delta * 2.2, 1) * 0.35;

    state.camera.lookAt(0, baseY * 0.5, 0);
  });
  return null;
}

// ─── HeroSceneV2 (Export) ────────────────────────────────────────────────────

export default function HeroSceneV2() {
  return (
    <Canvas
      aria-hidden="true"
      dpr={motionConfig.dpr}
      camera={{ position: [0, 0, 5.8], fov: 32 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
    >
      <fog attach="fog" args={["#f6f6f2", 5, 14]} />
      <ambientLight intensity={0.95} color="#ffffff" />

      {/* Warm Golden Sunlight */}
      <directionalLight position={[5, 7, 4]} intensity={2.8} color="#fffcf5" />

      {/* Radiant Coral Rim Light */}
      <pointLight position={[-4, -3, 3]} intensity={34} color="#ff442b" distance={12} />

      {/* Warm Champagne Light */}
      <pointLight position={[4, 2, -3]} intensity={22} color="#e0c080" distance={10} />

      <SynchronizedCameraRig />
      <LiquidPearlEntity />
      <GoldenIridescentRings />
      <ChampagneStardust />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.25} luminanceThreshold={0.8} mipmapBlur />
        <ChromaticAberration offset={CHROMA_OFFSET} />
        <Noise opacity={0.015} />
      </EffectComposer>
    </Canvas>
  );
}
