import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import "../styles/components.css";

export default function ThreeScene() {
  const navigate = useNavigate();
  const { scene: laptopScene, animations } = useGLTF('/models/laptop.glb');
  const mixer = useRef(new THREE.AnimationMixer(laptopScene));
  const actions = useRef({});
  const isIdle = useRef(false);
  const finishIdle = useRef(false);
  const laptopRef = useRef(null);
  const rotationSpeed = 0.5;
  const timeForRotation = 2;
  const targetRotation = useRef(0);
  const destinationRef = useRef(null);
  const remainingRotation = useRef(0);
  
  const handleNavigation = (destination) => {
    if (!mixer.current || !actions.current) return;

    // Arrêter toutes les animations en cours
    Object.values(actions.current).forEach(action => {
      action.stop();
    });

    
    // Arrêter la rotation idle et commencer la rotation finale
    isIdle.current = false;
    finishIdle.current = true;
    destinationRef.current = destination;
    
    // Calculer la rotation restante pour compléter le tour    
    const currentRotation = laptopRef.current.rotation.y;
    const fullRotations = Math.ceil(currentRotation / (2 * Math.PI));
    targetRotation.current = fullRotations * 2 * Math.PI;
    remainingRotation.current = targetRotation.current - currentRotation;
  };

  const startTransitionAnimations = () => {
    const transitionAction = actions.current['transition'];
    const cylinderAction = actions.current['Cylinder action'];
    
    if (transitionAction && cylinderAction) {
      transitionAction.setLoop(THREE.LoopOnce);
      transitionAction.clampWhenFinished = true;
      cylinderAction.setLoop(THREE.LoopOnce);
      cylinderAction.clampWhenFinished = true;
      
      const handleFinished = (e) => {
        if (e.action === transitionAction) {
          cylinderAction.play();
        }
        if (e.action === cylinderAction) {
          mixer.current.removeEventListener('finished', handleFinished);
          navigate(destinationRef.current);
        }
      };

      mixer.current.addEventListener('finished', handleFinished);
      transitionAction.play();
    } else {
      navigate(destinationRef.current);
    }
  };

  function LaptopScene() {
    useEffect(() => {
      animations.forEach((clip) => {
        actions.current[clip.name] = mixer.current.clipAction(clip);
      });
      
      laptopRef.current.rotation.y = 0;
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
  
      return () => {
        mixer.current.removeEventListener('finished', handleFinished);
      };
    }, [animations]);

    useFrame((state, delta) => {
      mixer.current.update(delta);
      //console.log("le :",isIdle.current, laptopRef.current.rotation.x, laptopRef.current.rotation.y, laptopRef.current.rotation.z);
      if (finishIdle.current && laptopRef.current) {
        // Calculer le pas de rotation pour ce frame
        const rotationStep = (2 * Math.PI) / timeForRotation * delta;
        
        // Si la rotation restante est plus petite que le pas, on termine
        if (remainingRotation.current <= rotationStep) {
          laptopRef.current.rotation.y += remainingRotation.current;
          finishIdle.current = false;
          startTransitionAnimations();
        } else {
          // Sinon, on continue la rotation
          laptopRef.current.rotation.y += rotationStep;
          remainingRotation.current -= rotationStep;
        }
      }
      else if (isIdle.current && laptopRef.current) {
        laptopRef.current.rotation.y += delta * rotationSpeed;
      }
    });

    return <primitive ref={laptopRef} object={laptopScene} />;
  }

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#222', color: '#fff' }}>
        <h1>Mon Portfolio</h1>
        <nav>
          <button 
            onClick={() => handleNavigation('/skills')} 
            style={{ margin: '0 10px', color: '#fff', textDecoration: 'none', backgroundColor: 'none'}}
          >
            skills
          </button>
        </nav>
      </header>
      <Canvas camera={{ position: [6, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <LaptopScene />
      </Canvas>
    </>
  );
}