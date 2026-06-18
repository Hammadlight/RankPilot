import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-[#0B7767] pt-36 pb-28 md:pt-48 md:pb-40 overflow-hidden flex flex-col justify-center items-center text-center">
      {/* Background soft glowing gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-teal-light/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[55%] rounded-full bg-[#0D8D7B]/30 blur-[100px]" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-8 shadow-sm"
        >
          <Sparkles size={14} className="text-teal-200 animate-pulse" />
          <span>AI Platform • Unleash the Power of AI</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl"
        >
          Ultimate AI Generator <span className="inline-block hover:scale-110 transition-transform cursor-default">⚡</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-teal-50 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Generate AI content, automate workflows, and grow your business faster with powerful AI tools.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#templates"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0B7767] hover:bg-[#0B7767] hover:text-white hover:border-white border-2 border-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-black/20 transform hover:-translate-y-0.5"
          >
            Start Writing Now
            <ArrowRight size={18} />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-all-300 transform hover:-translate-y-0.5"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Curved SVG Wave Transition at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-[60px] md:h-[120px]"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,32L120,42.7C240,53,480,75,720,80C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" 
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
