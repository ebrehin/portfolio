import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import "../styles/components.css";

export default function ThreeScene() {
  const navigate = useNavigate();
  const laptopRef = useRef(null);
  
  const handleNavigation = (destination) => {
    const animationDuration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const progress = (currentTime - startTime) / animationDuration;

      if (progress < 1) {
        if (laptopRef.current) {
          laptopRef.current.rotation.y += 0.1;
        }
        requestAnimationFrame(animate);
      } else {
        navigate(destination);
      }
    };

    animate();
  };

  function LaptopScene() {
    const { scene: laptopScene, animations } = useGLTF('/models/laptop.glb');
    const mixer = useRef(new THREE.AnimationMixer(laptopScene));
    const actions = useRef({});
    const laptopRef = useRef(null);
    const isIdle = useRef(false);
    
    // Animation continue du laptop
    useEffect(() => {
      // Chargement des animations
      animations.forEach((clip) => {
        actions.current[clip.name] = mixer.current.clipAction(clip);
      });
  
      // Animation d'introduction
      laptopRef.current.rotation.y = 120;
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
    
      if (isIdle.current && laptopRef.current && laptopRef.current.rotation) {
        laptopRef.current.rotation.y += delta * 0.5;
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