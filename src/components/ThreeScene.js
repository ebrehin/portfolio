import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useNavigate, NavLink } from 'react-router-dom';
import * as THREE from 'three';
import "../styles/components.css";

export default function ThreeScene() {
  const navigate = useNavigate();
  const { scene: laptopScene, animations } = useGLTF('/models/laptop.glb');
  const mixer = useRef(new THREE.AnimationMixer(laptopScene));
  const actions = useRef({});
  const isIdle = useRef(false);
  const finishIdle = useRef(false);
  const transitioning = useRef(false);
  const laptopRef = useRef(null);
  const initialRotation = THREE.MathUtils.degToRad(90);
  const rotationSpeed = 0.5;
  const timeForRotation = 1.5;
  const targetRotation = useRef(0);
  const destinationRef = useRef(null);
  const remainingRotation = useRef(0);
  
  const handleNavigation = (destination) => {
    if (!mixer.current || !actions.current) return;   

    // Arrêter toutes les animations en cours
    Object.values(actions.current).forEach(action => {
      action.stop();
    });

    const IdleAction = actions.current['Idle'];
    IdleAction.paused = true;
    IdleAction.time = 0; 
    IdleAction.play();
    IdleAction.clampWhenFinished = true;
    
    // Arrêter la rotation idle et commencer la rotation finale
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    isIdle.current = false;
    finishIdle.current = true;
    destinationRef.current = destination;
    
    // Calculer la rotation restante pour compléter le tour    
    const currentRotation = laptopRef.current.rotation.y;
    const fullRotations = Math.ceil(currentRotation / (2 * Math.PI));
    targetRotation.current = initialRotation + fullRotations * 2 * Math.PI;
    remainingRotation.current = targetRotation.current - currentRotation;
  };

  const startTransitionAnimations = () => {
    const transitionAction = actions.current['transition'];
    const cylinderAction = actions.current['Cylinder action'];
    const IdleAction = actions.current['Idle'];
    
    if (transitionAction && cylinderAction && IdleAction) {
      transitionAction.setLoop(THREE.LoopOnce);
      transitionAction.clampWhenFinished = true;
      cylinderAction.setLoop(THREE.LoopOnce);
      
      const handleFinished = (e) => {
        if (e.action === transitionAction) {
          cylinderAction.play();
          transitioning.current = true;
        }
        if (e.action === cylinderAction) {
          mixer.current.removeEventListener('finished', handleFinished);
          navigate(destinationRef.current);
        }
      };

      mixer.current.addEventListener('finished', handleFinished);
      transitionAction.play();
      IdleAction.stop();
      laptopScene.traverse((child) => {
        console.log(child.name); // Affiche tous les noms d'éléments
      });
    } else {
      navigate(destinationRef.current);
    }
  };

  function LaptopScene() {
    useEffect(() => {
      animations.forEach((clip) => {
        actions.current[clip.name] = mixer.current.clipAction(clip);
      });
      
      // Initial setup
      const cylinderAction = actions.current['Cylinder action'];
      cylinderAction.time = 0; 
      window.scrollTo(0, 0);
      laptopRef.current.rotation.y = initialRotation;
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
    });

    useFrame((state, delta) => {
      if (transitioning.current){
        state.camera.position.lerp(new THREE.Vector3(-2, 1.2, -2), 0.03);
      }
      else {
        state.camera.lookAt(laptopRef.current.position.x, laptopRef.current.position.y + 1, laptopRef.current.position.z);
        state.camera.position.lerp(new THREE.Vector3(6.5, 3, 0), 0.05);
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 75, 0.05);
      }

      mixer.current.update(delta);
      //console.log("le :",isIdle.current, laptopRef.current.rotation.x, laptopRef.current.rotation.y, laptopRef.current.rotation.z);
      if (finishIdle.current && laptopRef.current) {
        // Calculer le pas de rotation pour ce frame
        const rotationStep = (initialRotation + (2 * Math.PI)) / timeForRotation * delta;
        
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
      <header>
        <NavLink to="/">
          <h1>Ethan Bréhin</h1>
        </NavLink>
        <nav>
          <NavLink to="/" className='links'>Accueil</NavLink>
          <button className="links" onClick={() => handleNavigation('/skills')}>Compétences</button>
        </nav>
      </header>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <LaptopScene />
      </Canvas>
    </>
  );
}