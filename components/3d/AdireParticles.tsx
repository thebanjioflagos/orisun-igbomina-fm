/* eslint-disable react-hooks/purity */
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AdireParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 5 - 10;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Subtly animate particles to mimic radio waves or wind
    for (let i = 0; i < particleCount; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      
      // Add a wave effect
      pointsRef.current.geometry.attributes.position.setZ(
        i,
        positions[i * 3 + 2] + Math.sin(time + x * 0.5 + y * 0.5) * 0.2
      );
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.z = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#2E3A6E" // Adire indigo
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}
