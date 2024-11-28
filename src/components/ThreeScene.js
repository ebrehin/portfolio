import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function Laptop() {
  const { scene, animations } = useGLTF('/assets/models/laptop.glb');
  const laptopRef = useRef();

  // Rotation continue
  useFrame(() => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y += 0.01; // Rotation lente
    }
  });

  return <primitive ref={laptopRef} object={scene} />;
}

export default function ThreeScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Laptop />
      <OrbitControls />
    </Canvas>
  );
}
