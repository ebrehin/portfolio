import React from 'react';
import "../styles/components.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section vertical">
          <h3>Contact</h3>
          <p>ethan.brehin@etudiant.univ-rennes.fr</p>
        </div>
        
        <div className="footer-section">
          <h3>Réseaux/CV</h3>
          <div className="links">
            <a href="https://www.linkedin.com/in/ethan-brehin-a49059291" className="link">LinkedIn</a>
            <a href="/public/BREHIN_Ethan_CV.pdf" download="brehin_ethan_cv.pdf" className="link">Télécharger mon CV</a>
            <a href="https://www.instagram.com/alwe_brh" className="link">Plus de Brh</a>
          </div>
        </div>
        
        <div className="footer-section vertical">
          <h3>À propos</h3>
          <a href="https://github.com/ebrehin/portfolio" className="link">Lien vers le projet</a>
          <a href="https://github.com/ebrehin/portfolio/blob/main/credits.txt" className="link">Crédits</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;