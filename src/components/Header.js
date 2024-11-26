import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ton Nom</h1>
        <ul className="flex space-x-4">
          <li><a href="#about" className="hover:text-blue-400">À propos</a></li>
          <li><a href="#projects" className="hover:text-blue-400">Projets</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
