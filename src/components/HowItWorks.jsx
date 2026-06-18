import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, FileText, ChevronRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Choose Template",
      desc: "Select from over 50+ specialized AI templates designed for marketing, sales, SEO, or social media.",
      icon: Layers,
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      step: "02",
      title: "Input Prompts",
      desc: "Provide brief instructions or details about your product, audience, and preferred tone of voice.",
      icon: Sparkles,
      color: "bg-purple-50 text-purple-600 border-purple-100"
    },
    {
      step: "03",
      title: "Generate & Refine",
      desc: "Get instant, professional output. Refine and format the generated content directly in our smart editor.",
      icon: FileText,
      color: "bg-teal-50 text-teal-brand border-teal-100"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-extrabold uppercase text-teal-brand tracking-wider mb-3 block">
            Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            How RankPilot works
          </h2>
          <p className="text-gray-600">
            Generate high-performing copies and automate content creation workflows in three simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          
          {steps.map((stepItem, idx) => {
            const IconComponent = stepItem.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center md:items-start text-center md:text-left relative group"
              >
                {/* Step indicator circle */}
                <div className="flex items-center justify-between w-full mb-6">
                  <span className="text-5xl font-black text-gray-100 group-hover:text-teal-brand/10 transition-colors">
                    {stepItem.step}
                  </span>
                  
                  {/* Icon */}
                  <div className={`p-3.5 rounded-2xl border ${stepItem.color}`}>
                    <IconComponent size={22} className="stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {stepItem.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {stepItem.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
