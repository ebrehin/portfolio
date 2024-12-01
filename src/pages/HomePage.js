import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollText from '../components/ScrollText';
import ThreeScene from '../components/ThreeScene';

export default function HomePage() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAboutClick = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setTimeout(() => {
      window.location.href = '/about'; // Redirection après la transition
    }, 1000); // Ajuste le délai si nécessaire
  };

  const triggerTransition = () => {
    console.log('Transition triggered');
  };

  return (
    <>
      <Header onAboutClick={handleAboutClick} />
      <ThreeScene
        onComplete={() => console.log('Intro done')}
        onTransition={handleTransitionComplete}
        onTriggerTransition={triggerTransition}
      />
      {!isTransitioning && <ScrollText />}
      <Footer />
    </>
  );
}
