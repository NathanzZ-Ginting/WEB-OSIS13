import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { News } from '../components/News';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
export function Home() {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <News />
        <ContactForm />
      </main>
      <Footer />
    </div>;
}