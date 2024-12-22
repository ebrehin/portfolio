import React from 'react';
import { useCustomNavigation } from '../contexts/NavigationContext.js';
import { useLocation } from 'react-router-dom';

function Header() {
  const { handleCustomNavigation } = useCustomNavigation();
  const location = useLocation();

  const handleSkillsClick = (e) => {
    e.preventDefault();
    if (handleCustomNavigation('/skills')) {
      // Déclencher la transition dans ThreeScene
    }
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#222', color: '#fff' }}>
      <h1>Mon Portfolio</h1>
      
      <nav>
      <button onClick={() => handleSkillsClick} style={{ margin: '0 10px', color: '#fff', textDecoration: 'none', backgroundColor: 'none'}}>
        skills
      </button>
    </nav>
    </header>
  );
}

export default Header;