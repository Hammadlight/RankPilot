import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Terminal, KeyRound, Mail, AlertCircle, ArrowLeft } from 'lucide-react';

const Login = ({ setView, onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) throw authError;

      if (data?.user) {
        onAuthSuccess(data.user);
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow design */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-teal-brand/10 blur-[100px] -z-10" />

      {/* Back button */}
      <button 
        onClick={() => setView('landing')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </button>

      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="p-3.5 rounded-2xl bg-teal-brand text-white mb-4 shadow-md">
          <Terminal size={28} className="stroke-[2.5]" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Or{' '}
          <button 
            onClick={() => setView('signup')}
            className="font-bold text-teal-brand hover:text-teal-light focus:outline-none focus:underline"
          >
            create a new account
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-100/50 border border-gray-100 sm:rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {error && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-100 flex gap-3 text-sm text-red-700 animate-shake">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full bg-gray-50/50 border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-brand/20 focus:border-teal-brand transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <KeyRound size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full bg-gray-50/50 border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-brand/20 focus:border-teal-brand transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-teal-brand hover:bg-teal-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-brand transition-all-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Test Admin Credentials Note */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-200 text-xs text-gray-600 space-y-1 leading-relaxed">
              <p className="font-bold text-gray-700">💡 Testing Admin Access:</p>
              <p>Sign in with email <code className="bg-white px-1.5 py-0.5 rounded border font-semibold text-teal-brand">admin@rankpilot.com</code> and your chosen password. The backend trigger automatically configures this email with the <span className="font-semibold text-gray-800">admin</span> role.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
