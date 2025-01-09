import React from 'react';
import "../styles/components.css";
import { NavLink } from 'react-router-dom';

function Header() {
  
  return (
    <header>
      <NavLink to="/">
        <h1>Mon Portfolio</h1>
      </NavLink>
      <nav>
        <button id='linkSkills' href="/skills">skills</button>
      </nav>
    </header>
  );
}

export default Header;