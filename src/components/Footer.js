import React from 'react';
import "../styles/components.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact</h3>
          <p>email@exemple.com</p>
          <p>+33 1 23 45 67 89</p>
        </div>
        
        <div className="footer-section">
          <h3>Suivez-nous</h3>
          <div className="social-links">
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Instagram</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>À propos</h3>
          <p>© 2024 Votre Entreprise</p>
          <p>Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;