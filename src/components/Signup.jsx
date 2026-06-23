import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Terminal, KeyRound, Mail, AlertCircle, ArrowLeft, User } from 'lucide-react';

const Signup = ({ setView, onAuthSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      if (authError) throw authError;

      // Handle cases where email confirmation is enabled (or disabled)
      if (data?.user) {
        // If email confirmation is required, session might be null.
        if (data.session) {
          onAuthSuccess(data.user);
        } else {
          setSuccess(true);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow design */}
      <div className="absolute top-0 right-0 w-full h-[300px] bg-teal-brand/10 blur-[100px] -z-10" />

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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Or{' '}
          <button 
            onClick={() => setView('login')}
            className="font-bold text-teal-brand hover:text-teal-light focus:outline-none focus:underline"
          >
            sign in to your existing account
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-100/50 border border-gray-100 sm:rounded-3xl sm:px-10">
          
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Registration Complete</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We've sent a confirmation email to <span className="font-semibold text-gray-700">{email}</span>. Please verify your email to log in and join the hub.
              </p>
              <button
                onClick={() => setView('login')}
                className="mt-4 w-full flex justify-center py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-semibold bg-white text-gray-700 hover:bg-gray-50 focus:outline-none transition-all cursor-pointer"
              >
                Go to Sign In
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSignup}>
              
              {error && (
                <div className="rounded-xl bg-red-50 p-4 border border-red-100 flex gap-3 text-sm text-red-700">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full bg-gray-50/50 border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-brand/20 focus:border-teal-brand transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default Signup;
