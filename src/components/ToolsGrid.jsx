import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Edit, Mail, Megaphone, ShoppingBag, Search, Share2, Layout } from 'lucide-react';

const ToolsGrid = () => {
  const tools = [
    {
      title: "Blog Generator",
      desc: "Instant drafts for blog posts.",
      icon: FileText,
      bg: "bg-rose-50/70 hover:bg-rose-50 border-rose-100",
      iconColor: "text-rose-600 bg-rose-100/80",
    },
    {
      title: "Article Writer",
      desc: "Structure long-form content.",
      icon: Edit,
      bg: "bg-blue-50/70 hover:bg-blue-50 border-blue-100",
      iconColor: "text-blue-600 bg-blue-100/80",
    },
    {
      title: "Email Writer",
      desc: "Create professional emails.",
      icon: Mail,
      bg: "bg-emerald-50/70 hover:bg-emerald-50 border-emerald-100",
      iconColor: "text-emerald-600 bg-emerald-100/80",
    },
    {
      title: "Ad Copy Generator",
      desc: "Write high-converting ads.",
      icon: Megaphone,
      bg: "bg-violet-50/70 hover:bg-violet-50 border-violet-100",
      iconColor: "text-violet-600 bg-violet-100/80",
    },
    {
      title: "Product Description",
      desc: "Optimized ecommerce descriptions.",
      icon: ShoppingBag,
      bg: "bg-amber-50/70 hover:bg-amber-50 border-amber-100",
      iconColor: "text-amber-600 bg-amber-100/80",
    },
    {
      title: "SEO Content",
      desc: "Rank higher on Google search.",
      icon: Search,
      bg: "bg-teal-50/70 hover:bg-teal-50 border-teal-100",
      iconColor: "text-teal-600 bg-teal-100/80",
    },
    {
      title: "Social Media Post",
      desc: "Captivate social feeds.",
      icon: Share2,
      bg: "bg-pink-50/70 hover:bg-pink-50 border-pink-100",
      iconColor: "text-pink-600 bg-pink-100/80",
    },
    {
      title: "Landing Page Copy",
      desc: "Convert page visitors into clients.",
      icon: Layout,
      bg: "bg-orange-50/70 hover:bg-orange-50 border-orange-100",
      iconColor: "text-orange-600 bg-orange-100/80",
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-extrabold uppercase text-teal-brand tracking-wider mb-3 block">
            Tools Library
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Write anything in seconds
          </h2>
          <p className="text-gray-600">
            A comprehensive suite of specialized templates engineered to automate your writing workloads.
          </p>
        </div>

        {/* 2col Mobile / 4col Desktop Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {tools.map((tool, idx) => {
            const IconComponent = tool.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col items-start text-left cursor-pointer ${tool.bg}`}
              >
                <div className={`p-2.5 rounded-xl mb-4 ${tool.iconColor}`}>
                  <IconComponent size={20} className="stroke-[2.5]" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1.5 leading-tight">
                  {tool.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-snug">
                  {tool.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ToolsGrid;
