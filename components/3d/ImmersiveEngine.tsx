"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useScroll } from "framer-motion";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { getParticleCount } from "@/lib/performance-config";

function CulturalParticles() {
  const ref = useRef<any>();
  const count = useMemo(() => getParticleCount(), []);
  // Generate particles in a sphere using standard Math
  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = Math.cbrt(Math.random()) * 2.5;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);
  
  const { scrollYProgress } = useScroll();
  const { mouse, viewport } = useThree();

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Rotate the entire particle system slowly
    ref.current.rotation.y -= delta / 10;
    ref.current.rotation.x -= delta / 15;

    // Scroll Reactivity: Move particles based on page scroll
    const scroll = scrollYProgress.get();
    ref.current.position.y = scroll * 5; // Move up as we scroll down
    ref.current.rotation.z = scroll * Math.PI; // Twist as we scroll

    // Mouse Parallax: subtle movement based on mouse position
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;
    
    ref.current.position.x += (targetX - ref.current.position.x) * 0.02;
    // Don't override Y entirely so scroll still works, just add a subtle offset
    ref.current.position.z += (targetY - ref.current.position.z) * 0.02;
  });

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
  const { scrollYProgress } = useScroll();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const scroll = scrollYProgress.get();
    
    // Camera dive effect based on scroll
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5 - scroll * 10, 0.05);
    state.camera.lookAt(0, 0, 0);

    // Rotate inner rings
    groupRef.current.children.forEach((mesh, i) => {
      mesh.rotation.x += delta * (i % 2 === 0 ? 0.2 : -0.2);
      mesh.rotation.y += delta * (i % 3 === 0 ? 0.1 : -0.1);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Abstract representations of soundwaves / cultural rings */}
      <mesh position={[0, 0, -2]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#B91C1C" emissive="#B91C1C" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#D4920A" emissive="#D4920A" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -6]} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[7, 0.02, 16, 100]} />
        <meshStandardMaterial color="#1A0A00" emissive="#B91C1C" emissiveIntensity={0.5} wireframe />
      </mesh>
    </group>
  );
}

function StudioCam() {
  const video = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const vid = document.createElement('video');
    vid.src = "https://assets.mixkit.co/videos/preview/mixkit-recording-studio-with-microphones-and-equipment-43400-large.mp4"; // Placeholder live stream
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play().catch(() => {});
    return vid;
  }, []);

  if (!video) return null;

  return (
    <mesh position={[0, 2, -4]} rotation={[0, 0, 0]}>
      <planeGeometry args={[3.2, 1.8]} />
      <meshBasicMaterial transparent opacity={0.8}>
        <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
      </meshBasicMaterial>
      {/* Frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[3.4, 2.0]} />
        <meshBasicMaterial color="#D4920A" transparent opacity={0.1} />
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
        
        <PerformanceMonitor onDecline={() => console.log('Performance declining, reducing quality...')} />
        <AdaptiveDpr pixelated />
        
        <CulturalParticles />
        <FloatingArtifacts />
        <group>
          <StudioCam />
        </group>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.4} mipmapBlur intensity={1.0} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
