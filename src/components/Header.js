import React from 'react';

function Header({ onAboutClick }) {
  const handleAboutClick = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut
    if (onAboutClick) onAboutClick(); // Déclenche la logique d'animation
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#222', color: '#fff' }}>
      <h1>Mon Portfolio</h1>
      <nav>
        <a href="/about" onClick={handleAboutClick} style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>
          About
        </a>
      </nav>
    </header>
  );
}

export default Header;
