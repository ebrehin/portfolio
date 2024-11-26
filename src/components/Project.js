import React from 'react';
import projects from '../data/projects.json';

function Projects() {
  return (
    <section id="projects" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Mes Projets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md">
              <img src={project.image} alt={project.title} className="rounded mb-4" />
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
              <a href={project.link} className="text-blue-400 hover:underline">
                Voir plus
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
