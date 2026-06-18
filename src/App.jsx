import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import WritingAssistant from './components/WritingAssistant';
import ToolsGrid from './components/ToolsGrid';
import CustomTemplates from './components/CustomTemplates';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white min-h-screen selection:bg-teal-brand/20 selection:text-teal-brand antialiased">
      <Navbar />
      <Hero />
      <Features />
      <WritingAssistant />
      <ToolsGrid />
      <CustomTemplates />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
