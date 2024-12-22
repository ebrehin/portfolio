import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollText from '../components/ScrollText';
import ThreeScene from '../components/ThreeScene';

export default function HomePage() {
  return (
    <>
      <ThreeScene />
      <ScrollText />
      <Footer />
    </>
  );
}
