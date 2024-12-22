import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './contexts/NavigationContext.js';
import HomePage from './pages/HomePage';
import SkillsPage from './pages/SkillsPage';

function App() {
  return (
    <Router>
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Routes>
      </NavigationProvider>
    </Router>
  );
}

export default App;