import React, { useEffect } from 'react';
import ThreeScene from '../components/ThreeScene';
import ScrollText from '../components/ScrollText';
import Footer from '../components/Footer';

const HomePage = () => {
  useEffect(() => {
    const icon = document.getElementById(`scrollIcon`);
    if (window.scrollY === 0){
      icon.style.display = 'block';
    }
    else {
      icon.style.display = 'none';
    }
  });

  return (
    <div className="scroll-container">
      <div className="scene-container">
        <ThreeScene />
        <svg id='scrollIcon' xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M144 20h-32a60.07 60.07 0 0 0-60 60v96a60.07 60.07 0 0 0 60 60h32a60.07 60.07 0 0 0 60-60V80a60.07 60.07 0 0 0-60-60m52 156a52.06 52.06 0 0 1-52 52h-32a52.06 52.06 0 0 1-52-52V80a52.06 52.06 0 0 1 52-52h32a52.06 52.06 0 0 1 52 52ZM132 73.66v108.68l17.17-17.17a4 4 0 0 1 5.66 5.66l-24 24a4 4 0 0 1-5.66 0l-24-24a4 4 0 0 1 5.66-5.66L124 182.34V73.66l-17.17 17.17a4 4 0 0 1-5.66-5.66l24-24a4 4 0 0 1 5.66 0l24 24a4 4 0 0 1-5.66 5.66Z"/></svg>
      </div>
      <ScrollText />
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;