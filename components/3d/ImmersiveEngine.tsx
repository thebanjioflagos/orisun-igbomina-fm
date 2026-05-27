/* eslint-disable react-hooks/purity */
"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { getParticleCount } from "@/lib/performance-config";

function CulturalParticles() {
  const ref   = useRef<THREE.Points>(null);
  const count = getParticleCount();

  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = Math.cbrt(Math.random()) * 2.5;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current || !sphere) return;
    ref.current.rotation.y -= delta / 10;
    ref.current.rotation.x -= delta / 15;

    const { mouse, viewport } = state;
    const targetX = (mouse.x * viewport.width) / 10;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.02;
  });

  if (!sphere) return null;

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#EAB308"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingArtifacts() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, i) => {
      (mesh as THREE.Mesh).rotation.x += delta * (i % 2 === 0 ? 0.2 : -0.2);
      (mesh as THREE.Mesh).rotation.y += delta * (i % 3 === 0 ? 0.1 : -0.1);
    });
    // Gentle camera drift — no aggressive scroll-driven dive
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5, 0.01);
  });

  return (
    <group ref={groupRef}>
      {/* Sound-wave / cultural rings — Orisun crimson */}
      <mesh position={[0, 0, -2]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#B91C1C" emissive="#B91C1C" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      {/* Outer gold ring */}
      <mesh position={[0, 0, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#D4920A" emissive="#D4920A" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
      {/* Wireframe deep ring */}
      <mesh position={[0, 0, -6]} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[7, 0.02, 16, 100]} />
        <meshStandardMaterial color="#1A0A00" emissive="#B91C1C" emissiveIntensity={0.5} wireframe />
      </mesh>
    </group>
  );
}

/**
 * BrandedStudio — replaces the Mixkit commercial video.
 * Shows a pulsing Orisun branded plane in the 3D scene.
 * Swap the texture for a real studio photo/video when assets are ready.
 */
function BrandedStudio() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    // Gentle hover float
    meshRef.current.position.y = 2 + Math.sin(timeRef.current * 0.5) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 2, -4]}>
      <planeGeometry args={[3.2, 1.8]} />
      <meshStandardMaterial
        color="#D4920A"
        emissive="#B91C1C"
        emissiveIntensity={0.3}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
      {/* Gold frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[3.4, 2.0]} />
        <meshBasicMaterial color="#D4920A" transparent opacity={0.08} />
      </mesh>
    </mesh>
  );
}

export default function ImmersiveEngine() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-orisun-deep">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={["#1A0A00"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#D4920A" />

        <PerformanceMonitor
          onDecline={() => {
            // Silently adapt — no console noise in production
          }}
        />
        <AdaptiveDpr pixelated />

        <CulturalParticles />
        <FloatingArtifacts />
        <BrandedStudio />

        <EffectComposer>
          <Bloom luminanceThreshold={0.4} mipmapBlur intensity={1.0} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
