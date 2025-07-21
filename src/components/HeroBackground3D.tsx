import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

// Simple network node component with basic Three.js objects
const NetworkNode = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const geometry = useMemo(() => new THREE.SphereGeometry(0.1, 16, 16), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#22c55e"),
    metalness: 0.8,
    roughness: 0.2,
    emissive: new THREE.Color("#22c55e"),
    emissiveIntensity: 0.3
  }), []);

  return (
    <mesh ref={meshRef} position={position} geometry={geometry} material={material} />
  );
};

// Simple network cable component
const NetworkCable = ({ 
  start, 
  end, 
  index 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const { geometry, position, rotation, material } = useMemo(() => {
    const distance = Math.sqrt(
      Math.pow(end[0] - start[0], 2) + 
      Math.pow(end[1] - start[1], 2) + 
      Math.pow(end[2] - start[2], 2)
    );
    
    const midpoint: [number, number, number] = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2
    ];

    const direction = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]);
    direction.normalize();
    
    const rotationY = Math.atan2(direction.x, direction.z);
    const rotationX = -Math.asin(direction.y);

    return {
      geometry: new THREE.CylinderGeometry(0.02, 0.02, distance, 8),
      position: midpoint,
      rotation: [rotationX, rotationY, 0] as [number, number, number],
      material: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#64748b"),
        metalness: 0.9,
        roughness: 0.1,
        emissive: new THREE.Color("#3b82f6"),
        emissiveIntensity: 0.2
      })
    };
  }, [start, end]);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const time = state.clock.elapsedTime + index * 0.5;
      const intensity = 0.2 + Math.sin(time * 3) * 0.1;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      position={position}
      rotation={rotation}
      geometry={geometry}
      material={material}
    />
  );
};

// Main 3D scene component
const NetworkInfrastructure = () => {
  // Define network topology
  const networkNodes = useMemo(() => [
    [-4, 2, -2],
    [-2, -1, 1],
    [0, 3, -1],
    [2, 0, 2],
    [4, -2, -1],
    [-3, -3, 0],
    [3, 2, 1],
    [1, -2, -2],
  ] as [number, number, number][], []);

  // Define connections between nodes
  const connections = useMemo(() => [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [2, 6], [4, 7], [6, 7],
    [1, 6], [3, 7], [5, 2], [0, 3]
  ], []);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.5}
        color="#ffffff"
      />
      
      {/* Accent light for metallic effect */}
      <pointLight 
        position={[-5, 5, 5]} 
        intensity={0.3}
        color="#22c55e"
      />
      
      {/* Network nodes */}
      {networkNodes.map((position, index) => (
        <NetworkNode key={`node-${index}`} position={position} />
      ))}
      
      {/* Network cables */}
      {connections.map(([startIdx, endIdx], index) => (
        <NetworkCable 
          key={`cable-${index}`}
          start={networkNodes[startIdx]}
          end={networkNodes[endIdx]}
          index={index}
        />
      ))}
    </>
  );
};

const HeroBackground3D: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/60" />
      
      {/* Three.js Canvas */}
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 60,
          near: 0.1,
          far: 100
        }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <NetworkInfrastructure />
      </Canvas>
      
      {/* Text readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/60 pointer-events-none" />
    </div>
  );
};

export default HeroBackground3D;