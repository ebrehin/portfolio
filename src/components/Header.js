import React from 'react';

function Header() {

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#222', color: '#fff' }}>
      <h1>Mon Portfolio</h1>
      <nav>
        <a href="/skills" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>
          skills
        </a>
      </nav>
    </header>
  );
}

export default Header;
