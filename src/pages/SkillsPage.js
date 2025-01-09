import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css';

function SkillsPage() {
  // État pour suivre quels éléments de la liste sont visibles
  const [visibleItems, setVisibleItems] = useState([]);

  // Identifiants uniques pour chaque élément (en fonction de leur index)
  const listItems = [
    {
      class: "odd",
      title: "Titre 1",
      text: "Ceci est le paragraphe pour l'élément 1.",
      image: "https://via.placeholder.com/150", // URL d'une image
    },
    {
      class: "even",
      title: "Titre 2",
      text: "Ceci est le paragraphe pour l'élément 2.",
      image: "https://via.placeholder.com/150",
    },
    {
      class: "odd",
      title: "Titre 3",
      text: "Ceci est le paragraphe pour l'élément 3.",
      image: "https://via.placeholder.com/150",
    },
    {
      class: "even",
      title: "Titre 4",
      text: "Ceci est le paragraphe pour l'élément 4.",
      image: "https://via.placeholder.com/150",
    },
    {
      class: "odd",
      title: "Titre 5",
      text: "Ceci est le paragraphe pour l'élément 5.",
      image: "https://via.placeholder.com/150",
    },
    {
      class: "even",
      title: "Titre 6",
      text: "Ceci est le paragraphe pour l'élément 6.",
      image: "https://via.placeholder.com/150",
    },
    {
      class: "odd",
      title: "Titre 7",
      text: "Ceci est le paragraphe pour l'élément 7.",
      image: "https://via.placeholder.com/150",
    }
  ];

  useEffect(() => {
    // Fonction pour afficher les premiers éléments au chargement
    const initialAnimation = () => {
      handleScroll(); // Afficher les éléments visibles
    };

    // Fonction pour gérer le scroll
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      listItems.forEach((_, index) => {
        const item = document.getElementById(`list-item-${index}`);
        if (item) {
          const rect = item.getBoundingClientRect();
          if (rect.top <= windowHeight && !visibleItems.includes(index)) {
            setVisibleItems((prev) => [...prev, index]);
          }
        }
      });
    };

    initialAnimation();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [listItems, visibleItems]);

  return (
    <div>
      <Header />
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Compétences</h1>
        <ul className="animated-list">
          {listItems.map((item, index) => (
            <li key={index} id={`list-item-${index}`} className={visibleItems.includes(index) ? 'visible' : ''}>
              <div className={item.class}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <img src={item.image} alt={item.title} />
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export default SkillsPage;
