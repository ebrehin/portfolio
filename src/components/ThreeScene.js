import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function LaptopScene() {
  // Chargement du modèle GLTF
  const { scene, animations } = useGLTF('models/laptop.glb');
  const mixer = useRef(null);
  const actions = useRef({});

  // Initialisation des animations
  React.useEffect(() => {
    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        actions.current[clip.name] = mixer.current.clipAction(clip);
      });

      // Lancer l'animation par défaut (Idle)
      if (actions.current['Idle']) {
        actions.current['Idle'].play();
      }
    }
  }, [animations, scene]);

  // Mettre à jour les animations à chaque frame
  useFrame((state, delta) => mixer.current?.update(delta));

  return (
    <>
      <primitive object={scene} />
      <OrbitControls />
    </>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 50 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <LaptopScene />
    </Canvas>
  );
}
