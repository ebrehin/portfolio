import React from 'react';
import "../styles/components.css";
import { NavLink } from 'react-router-dom';

function Header() {
  
  return (
    <header>
      <a href="/">
        <h1>Ethan Bréhin</h1>
      </a>
      <nav>
        <a class='links' href="/">Accueil</a>
        <button class='links' href="/skills">Compétences</button>
      </nav>
    </header>
  );
}

export default Header;