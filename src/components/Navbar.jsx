import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, User, LogOut, ArrowRight } from 'lucide-react';

const Navbar = ({ setView, sessionUser, userRole, handleLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Templates', href: '#templates' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' }
  ];

  const handleDashboardRedirect = () => {
    if (userRole === 'admin') {
      setView('admin-dashboard');
    } else {
      setView('user-dashboard');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Left: Brand Logo & Name */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className={`p-2 rounded-xl transition-all duration-300 ${
            isScrolled ? 'bg-teal-brand text-white' : 'bg-white text-teal-brand'
          }`}>
            <Terminal size={20} className="stroke-[2.5]" />
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}>
            RankPilot <span className={isScrolled ? 'text-teal-brand' : 'text-teal-brand/90'}>Tools</span>
          </span>
        </a>

        {/* Center: Desktop Nav Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-black/5 ${
                isScrolled 
                  ? 'text-gray-600 hover:text-gray-900' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right: Action Buttons based on Auth state */}
        <div className="hidden sm:flex items-center gap-3">
          {sessionUser ? (
            <>
              <button
                onClick={handleDashboardRedirect}
                className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all duration-200 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-teal-brand hover:bg-teal-50/50' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <User size={16} />
                <span>Go to Workspace</span>
              </button>
              <button
                onClick={handleLogout}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all-300 shadow-md ${
                  isScrolled 
                    ? 'bg-red-50 text-red-700 hover:bg-red-100 hover:shadow-red-100/10' 
                    : 'bg-white/10 text-white border border-white/20 hover:bg-red-600 hover:text-white hover:border-red-600'
                }`}
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setView('login')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-50' 
                    : 'text-white hover:text-white hover:bg-white/10'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setView('signup')}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all-300 shadow-lg cursor-pointer ${
                  isScrolled 
                    ? 'bg-teal-brand text-white hover:bg-teal-light hover:shadow-teal-brand/20' 
                    : 'bg-white text-teal-brand hover:bg-teal-brand hover:text-white hover:shadow-black/10'
                }`}
              >
                Join Hub
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl py-6 px-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-teal-brand font-medium py-1 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <hr className="border-gray-100 my-2" />
            <div className="flex flex-col gap-3">
              {sessionUser ? (
                <>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); handleDashboardRedirect(); }}
                    className="text-center py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <User size={16} />
                    <span>Workspace Dashboard</span>
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                    className="text-center py-2.5 rounded-xl text-sm font-bold bg-red-50 text-red-700 hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); setView('login'); }}
                    className="text-center py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); setView('signup'); }}
                    className="text-center py-2.5 rounded-xl text-sm font-medium bg-teal-brand text-white hover:bg-teal-light transition-all"
                  >
                    Join Hub
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
