import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css';
import placeholderImage from '../data/placeholder-150.png';

function SkillsPage() {
  // État pour suivre quels éléments de la liste sont visibles
  const [visibleItems, setVisibleItems] = useState([]);

  // Identifiants uniques pour chaque élément (en fonction de leur index)
  const listItems = [
    {
      class: "odd",
      title: "Réaliser un développement d'application",
      text: "Pour un projet lors de ma seconde année de BUT Informatique, j'ai réalisé, dans une équipe de 7 personnes, une application pour un client fictif. Design, gestion des données, front end, et back end, ce projet m'a offert de l'expérience dans de nombreux domaines.",
      image: placeholderImage, // URL d'une image
    },
    {
      class: "even",
      title: "Optimiser des applications informatiques",
      text: "Dans le cadre du projet de seconde année de BUT Informatique, j'ai appris que l'optmisiation des requêtes réalisées sur notre base de données était aussi cruciale que l'optimisation du reste de l'application, qui comprenait l'utilisation de php, de css, et de javascript.",
      image: placeholderImage,
    },
    {
      class: "odd",
      title: "Administrer des systèmes informatiques communicants complexes",
      text: "Dans le cadre du projet de seconde année de BUT Informatique, j'ai réalisé une API, en langage C, capable de communiquer avec l'application que nous avons développé, moi, et mon équipe.",
      image: placeholderImage,
    },
    {
      class: "even",
      title: "Gérer des données de l'information",
      text: "Durant la troisième année de BUT Informatique, j'ai travaillé avec une équipe de 7 personnes. Accompagné de 2 personnes du groupe, j'ai réalisé un nettoyage de données avant de les intégrer à l'existant, réalisé par le reste de mon équipe.",
      image: placeholderImage,
    },
    {
      class: "odd",
      title: "Conduite de projet",
      text: "Lors du projet de troisième année de BUT Informatique, j'ai pu, avec mon équipe, faire le design d'une base de donnée pour gérer la recommendations de livres. J'ai également rédigé un questionnaire pour obtenir des données pour notre application de recommendation.",
      image: placeholderImage,
    },
    {
      class: "even",
      title: "Travailler dans une équipe informatique",
      text: "J'ai réalisé un stage lors de ma seconde année de BUT Informatique à Thalès, à Brest. J'ai, par la suite, eu le chance de travailler à nouveau dans cette entreprise dans le cadre de mon alternance en trosième année de BUT Informatique. Cette expérience m'a appris le travail d'équipe en entreprise.",
      image: placeholderImage,
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
                <div className='card'>
                  <section>
                    <h3>{`erreur image - ${item.title}`}</h3>
                    <p>{item.text}</p>
                  </section>
                  <img src={item.image} alt={`erreur image - \n${item.title}`} />
                </div>
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
