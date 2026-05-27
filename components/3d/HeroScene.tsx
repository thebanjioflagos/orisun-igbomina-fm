"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { PerspectiveCamera, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import AdireParticles from "./AdireParticles";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ThreeJS Canvas Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function SignalWaves() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Concentric rings logic will go here */}
      <mesh ref={meshRef}>
        <ringGeometry args={[1, 1.1, 64]} />
        <meshBasicMaterial color="#D4920A" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function TransmitterTower() {
  return (
    <group position={[0, -2, 0]}>
      {/* Low-poly tower model or primitive approximation */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.1, 0.5, 6, 4]} />
        <meshStandardMaterial color="#8B3A0F" />
      </mesh>
      <SignalWaves />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full bg-orisun-deep">
      <ThreeErrorBoundary fallback={<div className="absolute inset-0 bg-gradient-to-b from-[#250d00] via-[#120500] to-[#0a0200]" />}>
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            
            <TransmitterTower />
            <AdireParticles />
            
            <Points limit={5000} range={5000}>
              <PointMaterial
                transparent
                color="#F5EDD6"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
              />
            </Points>
          </Suspense>
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
}
