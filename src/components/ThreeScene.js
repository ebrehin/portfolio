import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCustomNavigation } from '../contexts/NavigationContext';
import "../styles/global.css";

// Composant LaptopScene séparé
function LaptopScene() {
  const { scene, animations } = useGLTF('/models/laptop.glb');
  const { completeNavigation } = useCustomNavigation();
  const mixer = useRef(new THREE.AnimationMixer(scene));
  const actions = useRef({});
  const laptopRef = useRef(null);
  const isIdle = useRef(false);
  const isTransitioning = useRef(false);

  useEffect(() => {
    // Chargement des animations
    animations.forEach((clip) => {
      actions.current[clip.name] = mixer.current.clipAction(clip);
    });

    // Animation d'introduction
    const introAction = actions.current['Intro'];
    if (introAction) {
      introAction.setLoop(THREE.LoopOnce);
      introAction.clampWhenFinished = true;
      introAction.play();
    }

    const handleFinished = (e) => {
      if (e.action === introAction) {
        isIdle.current = true;
      }
    };

    mixer.current.addEventListener('finished', handleFinished);
    console.log('Scene object:', scene);

    return () => {
      mixer.current.removeEventListener('finished', handleFinished);
    };
  }, [animations]);
  

  // Méthode de transition
  const startTransition = () => {
    const transitionAction = actions.current['Transition'];
    if (transitionAction) {
      isTransitioning.current = true;
      transitionAction.setLoop(THREE.LoopOnce);
      transitionAction.clampWhenFinished = true;
      transitionAction.play();

      const handleTransitionFinished = (e) => {
        if (e.action === transitionAction) {
          completeNavigation();
          mixer.current.removeEventListener('finished', handleTransitionFinished);
          isTransitioning.current = false;
        }
      };

      mixer.current.addEventListener('finished', handleTransitionFinished);
    }
  };

  useFrame((state, delta) => {
    mixer.current.update(delta);
  
    if (isIdle.current && !isTransitioning.current && laptopRef.current && laptopRef.current.rotation) {
      laptopRef.current.rotation.y += delta * 0.5;
    }
  });

  // Exposer la méthode de transition
  React.useImperativeHandle(laptopRef, () => ({
    startTransition
  }));

  return (
    <primitive 
      ref={laptopRef}
      object={scene} 
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
  );
}

// Composant ThreeScene avec export par défaut
export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [6, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <LaptopScene />
    </Canvas>
  );
}