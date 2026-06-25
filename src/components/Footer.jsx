import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-400 pt-20 pb-10 border-t border-gray-900">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-brand text-white">
                <Terminal size={20} className="stroke-[2.5]" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                RankPilot <span className="text-teal-brand">Tools</span>
              </span>
            </a>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mt-2">
              Accelerating growth for content creators, marketers, and businesses with generative artificial intelligence.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a href="#twitter" aria-label="Twitter" className="p-2 rounded-xl bg-gray-900 hover:bg-teal-brand hover:text-white transition-all duration-200">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://github.com/Hammadlight" aria-label="GitHub" className="p-2 rounded-xl bg-gray-900 hover:bg-teal-brand hover:text-white transition-all duration-200">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="p-2 rounded-xl bg-gray-900 hover:bg-teal-brand hover:text-white transition-all duration-200">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-3 lg:col-start-7 flex flex-col gap-4">
            <h4 className="text-sm font-extrabold uppercase text-white tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#templates" className="hover:text-white transition-colors">Templates</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>
          </div>

          {/* Resources Col */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-extrabold uppercase text-white tracking-wider">
              Resources
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="#blog" className="hover:text-white transition-colors">Blog</a>
              <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
              <a href="#support" className="hover:text-white transition-colors">Help & Support</a>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>

        </div>

        <hr className="border-gray-900 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Made by Hammad RankPilot Tools. All rights reserved.
          </p>
          
          <button
            onClick={handleScrollToTop}
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
