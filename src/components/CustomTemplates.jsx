import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Sparkles } from 'lucide-react';
import { templatesData } from '../data/templates';

const CustomTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Marketing", "Business", "Social Media", "SEO", "E-Commerce"];

  // Filter logic
  const filteredTemplates = templatesData.filter(template => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="templates" className="py-24 bg-gray-50/30 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Custom Templates.
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Choose from a wide collection of AI-powered templates.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10">
          {/* Left: Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-teal-brand text-white shadow-md shadow-teal-brand/10'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right: Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-teal-brand transition-all"
            />
          </div>
        </div>

        {/* Templates Count */}
        <div className="mb-6 flex justify-between items-center px-2">
          <span className="text-sm font-bold text-gray-600">
            Showing {filteredTemplates.length} templates
          </span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="text-xs font-semibold text-teal-brand hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Templates Catalog List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <motion.div
                    layout
                    key={template.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -2 }}
                    className="group bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 hover:border-teal-brand/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6"
                  >
                    {/* Left side: Icon + Title/Desc container */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className="p-3.5 rounded-xl bg-teal-50 text-teal-brand shrink-0 transition-all-300 group-hover:bg-teal-brand group-hover:text-white">
                        <IconComponent size={20} className="stroke-[2.5]" />
                      </div>
                      
                      {/* Title & Desc */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-base group-hover:text-teal-brand transition-colors">
                            {template.title}
                          </h3>
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                            {template.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
                          {template.description}
                        </p>
                      </div>
                    </div>

                    {/* Right side: Use Template Button */}
                    <div className="self-end sm:self-center shrink-0 w-full sm:w-auto">
                      <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-50 hover:bg-teal-brand border border-gray-200 group-hover:border-teal-brand text-gray-700 hover:text-white transition-all-300 cursor-pointer shadow-sm">
                        <span>Use Template</span>
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white border border-gray-100 rounded-2xl"
              >
                <div className="p-4 bg-gray-50 rounded-full inline-block mb-4 text-gray-400">
                  <Search size={32} />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">No templates found</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  We couldn't find any templates matching "{searchQuery}". Try selecting another category or refining your query.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default CustomTemplates;
