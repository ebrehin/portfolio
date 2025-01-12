import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/components.css";

const ScrollText = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transformStyle = {
    transform: `translateY(${-scrollPosition * 0.3}px)`, // Direction inversée
    opacity: Math.min(1, scrollPosition / 500) // Apparition progressive
  };

  return (
    <div className="scroll-text-container">
      <div 
        className="scroll-text-content"
        style={transformStyle}
      >
        <h1>Bienvenue sur mon portfolio</h1>
        <p>Je suis un étudiant en 3ème année de BUT Informatique à Lannion, passionné par le développement et les nouvelles technologies.</p>
        <p>Découvrez mes projets et <NavLink to="/skills">compétences</NavLink> à travers ce portfolio.</p>
        <p>Je recherche un Master dans le développement d'applications et la gestion de la donnée. Si mon profil vous intéresse, n'hésitez pas à me contacter.</p>
      </div>
    </div>
  );
};

export default ScrollText;