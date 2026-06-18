import React from 'react';
import { CheckCircle2, Award, Zap, Layers, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const checklist = [
    "AI content generation",
    "SEO optimization",
    "Smart templates",
    "Image generation",
    "Social media content",
    "Marketing tools",
    "Business automation"
  ];

  const stats = [
    { number: "100+", label: "AI Tools", desc: "For every use case", icon: Zap, color: "text-amber-500 bg-amber-50" },
    { number: "50+", label: "Templates", desc: "Professionally written", icon: Layers, color: "text-blue-500 bg-blue-50" },
    { number: "Millions+", label: "Words Generated", desc: "By active writers", icon: Award, color: "text-teal-brand bg-teal-50" },
    { number: "99%", label: "Satisfaction", desc: "From global users", icon: Users, color: "text-purple-500 bg-purple-50" }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
          >
            The Future of AI.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed"
          >
            A modern AI platform built to help creators, marketers, entrepreneurs, and businesses generate content faster.
          </motion.p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Checklist */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Built for ultimate productivity</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Accelerate your content workflow with our state-of-the-art suite. We handle the heavy lifting so you can focus on strategy.
            </p>
            <ul className="space-y-4">
              {checklist.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3.5 text-gray-800 font-medium text-base sm:text-lg">
                  <CheckCircle2 className="text-teal-brand shrink-0 stroke-[2.5]" size={22} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column: Stat Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)" }}
                  className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm transition-all duration-300 flex flex-col items-start"
                >
                  <div className={`p-3 rounded-xl mb-6 ${stat.color}`}>
                    <IconComponent size={24} className="stroke-[2.5]" />
                  </div>
                  <h4 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-2">
                    {stat.number}
                  </h4>
                  <p className="font-bold text-gray-800 text-lg mb-1">{stat.label}</p>
                  <p className="text-sm text-gray-500">{stat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
