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
  
  const handleNavigation = (destination) => {
    if (!mixer.current || !actions.current) return;

    // Arrêter toutes les animations en cours
    Object.values(actions.current).forEach(action => {
      action.stop();
    });

    // Arrêter la rotation idle
    isIdle.current = false;

    //Repositionner l'ordi proprement
    finishIdle.current = true;
    setTimeout(() => {
      console.log("attente de 10 seconde");
    }, 10000);    

    // Jouer les animations de transition et naviguer
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
          navigate(destination);
        }
      };

      mixer.current.addEventListener('finished', handleFinished);
      transitionAction.play();
    } else {
      navigate(destination);
    }
  };

  function LaptopScene() {
    
    // Animation continue du laptop
    useEffect(() => {
      // Chargement des animations
      animations.forEach((clip) => {
        actions.current[clip.name] = mixer.current.clipAction(clip);
      });
  
      // Animation d'introduction
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
      console.log('Scene object:', laptopScene);
  
      return () => {
        mixer.current.removeEventListener('finished', handleFinished);
      };
    }, [animations]);

    // Animation par frame
    useFrame((state, delta) => {
      mixer.current.update(delta);

      console.log("le :",isIdle.current, laptopRef.current.rotation.y);
      if (finishIdle.current && laptopRef.current && laptopRef.current.rotation) {
        laptopRef.current.rotation.y += (2 * Math.PI) / timeForRotation * delta;
      }
      else if (isIdle.current && laptopRef.current && laptopRef.current.rotation) {
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