import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.section
      id="about"
      className="py-16 bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">À propos de moi</h2>
        <p className="text-gray-400">
          Développeur passionné par la création de sites modernes et performants.
        </p>
      </div>
    </motion.section>
  );
}

export default About;
