import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

extend({ OrbitControls }); // Assure l'extension pour OrbitControls

function LaptopScene({ onComplete, onTransition }) {
  const { scene, animations } = useGLTF('/models/laptop.glb');
  const mixer = useRef(new THREE.AnimationMixer(scene));
  const actions = useRef({});

  useEffect(() => {
    // Charger et mapper toutes les animations
    animations.forEach((clip) => {
      actions.current[clip.name] = mixer.current.clipAction(clip);
    });

    // Lancer l'animation "Intro" au démarrage
    const introAction = actions.current['Intro'];
    if (introAction) {
      introAction.setLoop(THREE.LoopOnce);
      introAction.clampWhenFinished = true;
      introAction.play();
    }

    // Écoute pour la fin de l'animation "Intro"
    const handleFinished = (e) => {
      if (e.action === introAction) {
        const idleAction = actions.current['Idle'];
        if (idleAction) {
          idleAction.reset().play();
        }
        if (onComplete) onComplete(); // Notifie que l'animation "Intro" est terminée
      }
    };

    mixer.current.addEventListener('finished', handleFinished);

    return () => {
      mixer.current.removeEventListener('finished', handleFinished);
    };
  }, [animations, onComplete]);

  useFrame((state, delta) => {
    mixer.current.update(delta);
  });

  // Méthode pour lancer la transition
  const triggerTransition = async () => {
    if (actions.current['Idle']) {
      actions.current['Idle'].stop();
    }

    const transitionAction = actions.current['transition'];
    if (transitionAction) {
      transitionAction.setLoop(THREE.LoopOnce);
      transitionAction.clampWhenFinished = true;
      transitionAction.play();
    }

    await new Promise((resolve) => setTimeout(resolve, 500)); // Pause

    const cylindreAction = actions.current['Cylindre action'];
    if (cylindreAction) {
      cylindreAction.setLoop(THREE.LoopOnce);
      cylindreAction.clampWhenFinished = true;
      cylindreAction.play();
    }

    if (onTransition) {
      onTransition(); // Notifie la transition
    }
  };

  return <primitive object={scene} />;
}

export default function ThreeScene({ onComplete, onTransition, onTriggerTransition }) {
  return (
    <>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <LaptopScene onComplete={onComplete} onTransition={onTransition} />
        <OrbitControls />
      </Canvas>
      {/* Ajout d'un bouton HTML en dehors du Canvas */}
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <button onClick={onTriggerTransition}>Trigger Transition</button>
      </div>
    </>
  );
}
