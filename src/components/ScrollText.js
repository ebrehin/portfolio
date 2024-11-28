import React from 'react';
import { motion } from 'framer-motion';

function ScrollText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{ margin: '50px', textAlign: 'center' }}
    >
      <h1>Bienvenue dans mon portfolio !</h1>
      <p>Merci de visiter mon site web.</p>
    </motion.div>
  );
}

export default ScrollText;
