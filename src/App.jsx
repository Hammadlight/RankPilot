import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
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

// Authentication and Dashboard Views
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'login', 'signup', 'user-dashboard', 'admin-dashboard'
  const [sessionUser, setSessionUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch initial session check
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setSessionUser(session.user);
          await fetchUserRole(session.user.id);
        }
      } catch (err) {
        console.error("Error checking initial session:", err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // 2. Auth listener to react to sign ins/sign outs
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSessionUser(session.user);
        await fetchUserRole(session.user.id);
      } else {
        setSessionUser(null);
        setUserRole(null);
        setView('landing');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setUserRole(data.role);
        // Automatically redirect to dashboard if currently in landing/auth screens
        setView(prev => {
          if (prev === 'login' || prev === 'signup' || prev === 'landing') {
            return data.role === 'admin' ? 'admin-dashboard' : 'user-dashboard';
          }
          return prev;
        });
      }
    } catch (err) {
      console.error("Error fetching user role from database:", err.message);
      // Default fallback
      setUserRole('user');
      setView(prev => (prev === 'login' || prev === 'signup') ? 'user-dashboard' : prev);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  const handleAuthSuccess = async (user) => {
    setSessionUser(user);
    await fetchUserRole(user.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-teal-brand border-t-transparent rounded-full animate-spin mx-auto" />
          <span className="text-sm font-semibold text-gray-500">Connecting to RankPilot Hub...</span>
        </div>
      </div>
    );
  }

  // Routing View States
  if (view === 'login') {
    return <Login setView={setView} onAuthSuccess={handleAuthSuccess} />;
  }

  if (view === 'signup') {
    return <Signup setView={setView} onAuthSuccess={handleAuthSuccess} />;
  }

  if (view === 'user-dashboard' && sessionUser) {
    return <UserDashboard user={sessionUser} setView={setView} handleLogout={handleLogout} />;
  }

  if (view === 'admin-dashboard' && sessionUser && userRole === 'admin') {
    return <AdminDashboard user={sessionUser} setView={setView} handleLogout={handleLogout} />;
  }

  // Fallback to Landing page
  return (
    <div className="bg-white min-h-screen selection:bg-teal-brand/20 selection:text-teal-brand antialiased">
      <Navbar 
        setView={setView} 
        sessionUser={sessionUser} 
        userRole={userRole} 
        handleLogout={handleLogout} 
      />
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
