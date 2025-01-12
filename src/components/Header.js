import React from 'react';
import "../styles/components.css";
import { NavLink } from 'react-router-dom';

function Header() {
  
  return (
    <header>
      <NavLink to="/">
        <h1>Ethan Bréhin</h1>
      </NavLink>
      <nav>
        <NavLink to="/" className='links'>Accueil</NavLink>
        <button class='links' href="/skills">Compétences</button>
      </nav>
    </header>
  );
}

export default Header;