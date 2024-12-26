import React from 'react';
import ThreeScene from '../components/ThreeScene';
import ScrollText from '../components/ScrollText';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="scroll-container">
      <div className="scene-container">
        <ThreeScene />
      </div>
      <ScrollText />
      <div style={{ height: '100vh' }} /> {/* Espace pour le scroll initial */}
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;