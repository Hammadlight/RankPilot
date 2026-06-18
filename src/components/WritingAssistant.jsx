import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, FileText, Layout, Settings, Mail, Send, Play, CheckCircle } from 'lucide-react';

const WritingAssistant = () => {
  const [prompt, setPrompt] = useState("Write an introduction for a blog post about artificial intelligence in marketing.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("Artificial Intelligence (AI) is no longer a futuristic concept—it is a vital tool driving marketing today. By analyzing massive data sets and predicting consumer behavior, AI enables marketers to deliver hyper-personalized experiences, optimize ad campaigns in real-time, and scale content generation like never before. In this article, we explore the top strategies to leverage AI in your marketing stack.");

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedText("");
    
    // Simulate typing effect after a short delay
    setTimeout(() => {
      setIsGenerating(false);
      const fullText = "Artificial Intelligence (AI) is no longer a futuristic concept—it is a vital tool driving marketing today. By analyzing massive data sets and predicting consumer behavior, AI enables marketers to deliver hyper-personalized experiences, optimize ad campaigns in real-time, and scale content generation like never before. In this article, we explore the top strategies to leverage AI in your marketing stack.";
      
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx < fullText.length) {
          setGeneratedText(prev => prev + fullText[currentIdx]);
          currentIdx++;
        } else {
          clearInterval(interval);
        }
      }, 10);
    }, 1500);
  };

  const bullets = [
    "Blog generation",
    "Product descriptions",
    "Marketing copy",
    "Social content",
    "Email writing"
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-brand text-xs font-semibold uppercase tracking-wider mb-5">
              <Sparkles size={12} />
              <span>Smart Writing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
              Intelligent Writing Assistant
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience the power of generative AI. Seamlessly craft high-converting copy, complete blog structures, or outreach emails in seconds. Our smart editor refines spelling, tone, and formatting on the fly.
            </p>
            <div className="space-y-4">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-teal-50 text-teal-brand">
                    <Check size={16} className="stroke-[3]" />
                  </div>
                  <span className="font-semibold text-gray-800">{bullet}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Dashboard Mockup in Lavender Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-[#F0EAFF] p-6 sm:p-10 rounded-[24px] shadow-sm flex justify-center items-center"
          >
            {/* The SaaS Dashboard container */}
            <div className="w-full bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden flex flex-col h-[420px]">
              
              {/* Browser Window Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-[11px] font-medium text-gray-400 bg-white border border-gray-200/80 px-4 py-0.5 rounded-md w-48 text-center truncate select-none">
                  app.rankpilot.com/editor
                </div>
                <div className="w-12" /> {/* spacer */}
              </div>

              {/* Dashboard Content split into Sidebar and Main Editor */}
              <div className="flex flex-1 overflow-hidden">
                
                {/* Mini Sidebar */}
                <div className="w-16 sm:w-44 bg-gray-50 border-r border-gray-100 p-3 hidden sm:flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-teal-brand/10 text-teal-brand font-medium text-xs">
                    <FileText size={16} />
                    <span className="hidden sm:inline">AI Editor</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-gray-500 hover:bg-gray-100 font-medium text-xs cursor-pointer">
                    <Layout size={16} />
                    <span className="hidden sm:inline">Templates</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-gray-500 hover:bg-gray-100 font-medium text-xs cursor-pointer">
                    <Mail size={16} />
                    <span className="hidden sm:inline">Campaigns</span>
                  </div>
                  <div className="mt-auto flex items-center gap-2 px-2.5 py-2 rounded-lg text-gray-500 hover:bg-gray-100 font-medium text-xs cursor-pointer">
                    <Settings size={16} />
                    <span className="hidden sm:inline">Settings</span>
                  </div>
                </div>

                {/* Main Workspace */}
                <div className="flex-1 flex flex-col p-4 overflow-y-auto">
                  
                  {/* Prompt Box */}
                  <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-3 mb-4 flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">AI Prompt Input</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-purple-400"
                        placeholder="Ask the AI to write something..."
                      />
                      <button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="px-3 py-1.5 rounded-lg bg-teal-brand hover:bg-teal-light text-white text-xs font-semibold flex items-center gap-1 transition-colors shrink-0 shadow-sm"
                      >
                        {isGenerating ? (
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send size={12} />
                        )}
                        <span>{isGenerating ? "Writing..." : "Run"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Document Workspace */}
                  <div className="flex-1 border border-gray-100 rounded-xl p-3 flex flex-col bg-white overflow-hidden">
                    <div className="border-b border-gray-100 pb-2 mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-700">Document Editor</span>
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      </div>
                    </div>
                    
                    {/* Simulated Text area with transition */}
                    <div className="flex-1 text-xs text-gray-600 leading-relaxed overflow-y-auto pr-1">
                      {isGenerating ? (
                        <div className="space-y-2.5 animate-pulse mt-1">
                          <div className="h-3 bg-gray-100 rounded w-5/6" />
                          <div className="h-3 bg-gray-100 rounded w-full" />
                          <div className="h-3 bg-gray-100 rounded w-4/5" />
                        </div>
                      ) : (
                        <p className="whitespace-pre-line border-l-2 border-teal-brand/30 pl-2">
                          {generatedText}
                          <span className="w-1.5 h-4 bg-teal-brand inline-block animate-pulse ml-0.5 align-middle" />
                        </p>
                      )}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WritingAssistant;
