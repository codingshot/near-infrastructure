import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

// Safe point validation function
const isValidPoint = (point: any): point is [number, number, number] => {
  return Array.isArray(point) && 
         point.length === 3 && 
         point.every(coord => typeof coord === 'number' && !isNaN(coord) && isFinite(coord));
};

// Safe points array validation
const validatePoints = (points: any[]): [number, number, number][] => {
  return points.filter(isValidPoint);
};

// Individual square stroke component
function SquareStroke({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation animation
      meshRef.current.rotation.z += 0.002;
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });

  // Create square points
  const squarePoints = useMemo(() => {
    const size = 0.5 * scale;
    const points: [number, number, number][] = [
      [-size, -size, 0],
      [size, -size, 0],
      [size, size, 0],
      [-size, size, 0],
      [-size, -size, 0], // Close the square
    ];
    return validatePoints(points);
  }, [scale]);

  // Create plus lines as separate pairs
  const plusLines = useMemo(() => {
    const size = 0.5 * scale;
    const plusSize = 0.1 * scale;
    const corners: [number, number, number][] = [
      [-size, -size, 0],
      [size, -size, 0],
      [size, size, 0],
      [-size, size, 0],
    ];
    
    const lines: { horizontal: [number, number, number][], vertical: [number, number, number][] }[] = [];
    
    corners.forEach(([x, y, z]) => {
      if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && 
          !isNaN(x) && !isNaN(y) && !isNaN(z)) {
        lines.push({
          horizontal: validatePoints([
            [x - plusSize, y, z],
            [x + plusSize, y, z]
          ]),
          vertical: validatePoints([
            [x, y - plusSize, z],
            [x, y + plusSize, z]
          ])
        });
      }
    });
    
    return lines;
  }, [scale]);

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Main square stroke */}
      {squarePoints.length >= 2 && (
        <Line
          points={squarePoints}
          color="#14B8A6"
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      )}
      
      {/* Plus symbols at corners */}
      {plusLines.map((plusLine, index) => (
        <React.Fragment key={`plus-group-${index}`}>
          {plusLine.horizontal.length === 2 && (
            <Line
              key={`plus-h-${index}`}
              points={plusLine.horizontal}
              color="#14B8A6"
              lineWidth={1.5}
              transparent
              opacity={0.8}
            />
          )}
          {plusLine.vertical.length === 2 && (
            <Line
              key={`plus-v-${index}`}
              points={plusLine.vertical}
              color="#14B8A6"
              lineWidth={1.5}
              transparent
              opacity={0.8}
            />
          )}
        </React.Fragment>
      ))}
    </group>
  );
}

// Snake-like connection lines
function ConnectionLines() {
  const lineRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y += 0.001;
    }
  });

  const connectionPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 4;
      const radius = 3 + Math.sin(i * 0.5) * 0.5;
      points.push([
        Math.cos(angle) * radius,
        Math.sin(angle * 0.3) * 1,
        Math.sin(angle) * radius
      ]);
    }
    return validatePoints(points);
  }, []);

  return (
    <group ref={lineRef}>
      {connectionPoints.length >= 2 && (
        <Line
          points={connectionPoints}
          color="#14B8A6"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      )}
    </group>
  );
}

// Metallic highlight effects
function MetallicHighlights() {
  const highlightRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (highlightRef.current) {
      highlightRef.current.rotation.z += 0.003;
      highlightRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const highlights = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 4;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 0.5) * 0.5,
          Math.sin(angle) * radius
        ] as [number, number, number],
        rotation: [0, 0, angle] as [number, number, number],
        scale: 0.3 + Math.sin(i) * 0.1
      };
    }).filter(highlight => 
      isValidPoint(highlight.position) && 
      isValidPoint(highlight.rotation) &&
      typeof highlight.scale === 'number' && 
      !isNaN(highlight.scale)
    );
  }, []);

  return (
    <group ref={highlightRef}>
      {highlights.map((highlight, index) => (
        <SquareStroke
          key={`highlight-${index}`}
          position={highlight.position}
          rotation={highlight.rotation}
          scale={highlight.scale}
        />
      ))}
    </group>
  );
}

// Main animation scene
function Scene() {
  // Generate multiple square strokes in a grid pattern
  const squares = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const angle = (i / 15) * Math.PI * 2;
      const radius = 2 + (i % 3) * 1.5;
      return {
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3,
          Math.sin(angle) * radius - 2
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ] as [number, number, number],
        scale: 0.5 + Math.random() * 0.5
      };
    }).filter(square => 
      isValidPoint(square.position) && 
      isValidPoint(square.rotation) &&
      typeof square.scale === 'number' && 
      !isNaN(square.scale)
    );
  }, []);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#14B8A6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />
      
      {/* Main square strokes */}
      {squares.map((square, index) => (
        <SquareStroke
          key={`square-${index}`}
          position={square.position}
          rotation={square.rotation}
          scale={square.scale}
        />
      ))}
      
      {/* Connection lines */}
      <ConnectionLines />
      
      {/* Metallic highlights */}
      <MetallicHighlights />
    </>
  );
}

// Main component
const HeroBackground3D: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 opacity-60">
      <Canvas
        camera={{ 
          position: [0, 0, 10], 
          fov: 60,
          near: 0.1,
          far: 1000 
        }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
        onError={(error) => {
          console.error('Three.js Canvas error:', error);
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroBackground3D;