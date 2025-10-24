'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import About from '@/components/About';
import Features from '@/components/Features';

export default function Home() {
  return (
    <div className=''>
      <Navbar />
      <HeroSection />
      <About />
      <Features />

      {/* Fitur */}

      <Footer />
    </div>
  );
}
