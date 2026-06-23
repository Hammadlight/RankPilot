import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  FileText, LogOut, Sparkles, Send, Trash2, Plus, 
  BookOpen, Folder, Calendar, Award, User, AlertCircle, FilePlus
} from 'lucide-react';

const UserDashboard = ({ user, handleLogout }) => {
  const [profile, setProfile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchProfile();
    fetchDocuments();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err.message);
    }
  };

  const fetchDocuments = async () => {
    setDocLoading(true);
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setDocuments(data || []);
    } catch (err) {
      console.error("Error fetching documents:", err.message);
    } finally {
      setDocLoading(false);
    }
  };

  const handleGenerateText = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setContent('');

    setTimeout(() => {
      const responses = [
        `Here is a quick overview of ${prompt}:\n\nArtificial Intelligence is scaling rapidly. Integrating smart workflows allows platforms to automate copywriting and user engagement. It improves speed-to-market and lowers editing overhead by 60%.`,
        `Draft for ${prompt}:\n\nAre you looking to scale your marketing hooks? RankPilot Tools automates SEO configurations and templates library queries in real-time, matching standard user parameters instantly. Try implementing these steps today.`,
        `Document concerning ${prompt}:\n\nWhen writing copy, SEO keyword density matters. Utilizing templates optimizes headlines and structural outlines. This document covers keyword clustering and content planning.`
      ];
      const selected = responses[Math.floor(Math.random() * responses.length)];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < selected.length) {
          setContent(prev => prev + selected[i]);
          i++;
        } else {
          clearInterval(interval);
          setLoading(false);
        }
      }, 10);
    }, 1200);
  };

  const handleSaveDocument = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const { data, error } = await supabase
        .from('documents')
        .insert({
          title: title.trim(),
          content: content,
          user_id: user.id
        })
        .select();

      if (error) throw error;

      setMessage({ text: 'Document saved successfully!', type: 'success' });
      setTitle('');
      setPrompt('');
      setContent('');
      fetchDocuments();

      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setMessage({ text: err.message || 'Failed to save document.', type: 'error' });
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDocuments(prev => prev.filter(doc => doc.id !== id));
      setMessage({ text: 'Document deleted.', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setMessage({ text: err.message || 'Failed to delete document.', type: 'error' });
    }
  };

  const totalWords = documents.reduce((acc, doc) => {
    return acc + (doc.content ? doc.content.split(/\s+/).filter(Boolean).length : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Banner */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-brand text-white">
              <BookOpen size={20} className="stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              RankPilot <span className="text-teal-brand">Workspace</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl">
              <User size={16} className="text-gray-500" />
              <span className="text-sm font-bold text-gray-700">{profile?.name || user.email}</span>
              <span className="px-2 py-0.5 rounded bg-teal-50 text-[10px] font-black text-teal-brand uppercase tracking-wider">
                {profile?.role || 'user'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Left Side: Stats and Document List */}
        <div className="lg:col-span-4 space-y-6">
          {/* Stats Box */}
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm grid grid-cols-2 gap-4">
            <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-50">
              <Folder className="text-teal-brand mb-2" size={24} />
              <span className="block text-2xl font-black text-gray-900">{documents.length}</span>
              <span className="text-xs text-gray-500 font-semibold uppercase">Documents</span>
            </div>
            <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-50">
              <Award className="text-purple-600 mb-2" size={24} />
              <span className="block text-2xl font-black text-gray-900">{totalWords}</span>
              <span className="text-xs text-gray-500 font-semibold uppercase">Words Written</span>
            </div>
          </div>

          {/* User Status Notice */}
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Workspace Isolation</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Row Level Security is enabled. General users are sandboxed and can only read, write, or delete drafts created under their own authenticated account.
            </p>
          </div>

          {/* Saved Documents Panel */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
            <h3 className="font-bold text-gray-950 text-lg mb-4">My Saved Drafts</h3>
            
            {message.text && message.type === 'success' && (
              <div className="mb-4 text-xs font-semibold text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                {message.text}
              </div>
            )}

            {docLoading ? (
              <div className="space-y-3 py-4">
                <div className="h-10 bg-gray-50 rounded-xl animate-pulse" />
                <div className="h-10 bg-gray-50 rounded-xl animate-pulse" />
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-gray-200 rounded-2xl">
                <FileText size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm font-bold text-gray-500">No drafts yet</p>
                <p className="text-xs text-gray-400 mt-1">Use the workspace to write and save.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-3 border border-gray-100 hover:border-teal-brand/20 bg-gray-50/50 hover:bg-white rounded-xl flex items-center justify-between gap-3 group transition-all">
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{doc.title}</h4>
                      <p className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <Calendar size={10} />
                        {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      aria-label="Delete document"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Writing Editor Workspace */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden flex flex-col h-[580px]">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <span className="font-bold text-gray-900 flex items-center gap-2">
                <FilePlus size={18} className="text-teal-brand" />
                <span>Smart AI Editor Workspace</span>
              </span>
            </div>

            <form onSubmit={handleSaveDocument} className="flex-1 flex flex-col p-6 gap-4 overflow-y-auto">
              
              {message.text && message.type === 'error' && (
                <div className="rounded-xl bg-red-50 p-4 border border-red-100 flex gap-3 text-sm text-red-700">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{message.text}</span>
                </div>
              )}

              {/* Title input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Document Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-brand/20 focus:border-teal-brand transition-all"
                  placeholder="e.g. AI Content Strategy, Facebook Ad Hook"
                  required
                />
              </div>

              {/* AI generator block */}
              <div className="bg-purple-50/30 border border-purple-100 rounded-2xl p-4 space-y-3">
                <label className="block text-[10px] font-bold text-purple-700 uppercase tracking-wider">AI Copilot Prompt</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-700 focus:outline-none focus:border-purple-400"
                    placeholder="Ask AI to write a draft paragraph..."
                  />
                  <button 
                    type="button"
                    onClick={handleGenerateText}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-teal-brand hover:bg-teal-light text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles size={13} />
                    )}
                    <span>{loading ? "Typing..." : "Generate"}</span>
                  </button>
                </div>
              </div>

              {/* Document Text Editor content */}
              <div className="flex-1 flex flex-col min-h-[200px]">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Editor Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 text-sm text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-brand/20 focus:border-teal-brand transition-all resize-none leading-relaxed"
                  placeholder="Your generated content or notes will appear here. Feel free to edit..."
                  required
                />
              </div>

              {/* Action Save button */}
              <div className="flex justify-end border-t border-gray-100 pt-4">
                <button
                  type="submit"
                  disabled={!title.trim() || !content.trim()}
                  className="px-6 py-3 bg-teal-brand hover:bg-teal-light disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none text-white rounded-xl text-sm font-bold shadow-md shadow-teal-brand/10 transition-all cursor-pointer"
                >
                  Save Draft
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
