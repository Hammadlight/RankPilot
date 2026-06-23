import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Users, FileText, LogOut, Search, Trash2, ShieldCheck, 
  Calendar, Layers, Database, UserCheck, AlertCircle, RefreshCw
} from 'lucide-react';

const AdminDashboard = ({ user, handleLogout }) => {
  const [profiles, setProfiles] = useState([]);
  const [allDocs, setAllDocs] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'documents'
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      // Fetch all user profiles
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profileErr) throw profileErr;
      setProfiles(profileData || []);

      // Fetch all documents with owner profile info
      const { data: docData, error: docErr } = await supabase
        .from('documents')
        .select('*, profiles(name, email)')
        .order('created_at', { ascending: false });

      if (docErr) throw docErr;
      setAllDocs(docData || []);
    } catch (err) {
      setMessage({ text: err.message || 'Failed to fetch administrative data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user document?')) return;
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAllDocs(prev => prev.filter(doc => doc.id !== id));
      setMessage({ text: 'User document deleted successfully by admin.', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setMessage({ text: err.message || 'Failed to delete document.', type: 'error' });
    }
  };

  // Filter profiles based on search query
  const filteredProfiles = profiles.filter(p => 
    (p.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter documents based on search query (by title or owner email)
  const filteredDocs = allDocs.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.profiles?.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-brand text-white shadow-sm shadow-teal-brand/10">
              <ShieldCheck size={20} className="stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              RankPilot <span className="text-teal-brand">Admin Console</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={fetchData}
              className="p-2 text-gray-400 hover:text-teal-brand hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
              title="Refresh data"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 text-red-700 rounded-xl">
              <Database size={16} />
              <span className="text-sm font-bold">Admin Session</span>
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

      {/* Main Admin Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-10 flex-1 w-full space-y-8">
        
        {/* Alerts */}
        {message.text && (
          <div className={`rounded-xl p-4 border flex gap-3 text-sm animate-fade-in ${
            message.type === 'error' 
              ? 'bg-red-50 border-red-100 text-red-700' 
              : 'bg-green-50 border-green-100 text-green-700'
          }`}>
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{message.text}</span>
          </div>
        )}

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex items-center gap-5">
            <div className="p-4 bg-teal-50 text-teal-brand rounded-2xl">
              <Users size={28} />
            </div>
            <div>
              <span className="text-3xl font-black text-gray-950 block">{profiles.length}</span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Registered Users</span>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex items-center gap-5">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
              <FileText size={28} />
            </div>
            <div>
              <span className="text-3xl font-black text-gray-950 block">{allDocs.length}</span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Saved User Documents</span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex items-center gap-5">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
              <Layers size={28} />
            </div>
            <div>
              <span className="text-3xl font-black text-gray-950 block">
                {profiles.length ? (allDocs.length / profiles.length).toFixed(1) : 0}
              </span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Average Drafts / User</span>
            </div>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
          
          {/* Controls Bar */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Tabs toggle */}
            <div className="flex bg-gray-50 border border-gray-100 p-1 rounded-xl w-full md:w-auto">
              <button
                onClick={() => { setActiveTab('users'); setSearchQuery(''); }}
                className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'users' ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Users size={16} />
                <span>Users ({profiles.length})</span>
              </button>
              <button
                onClick={() => { setActiveTab('documents'); setSearchQuery(''); }}
                className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'documents' ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <FileText size={16} />
                <span>User Documents ({allDocs.length})</span>
              </button>
            </div>

            {/* Live Search bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'users' ? "Search users by name/email..." : "Search docs by title/owner email..."}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-brand/20 focus:border-teal-brand transition-all"
              />
            </div>

          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="w-8 h-8 border-4 border-teal-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <span className="text-sm font-semibold text-gray-500">Loading directory...</span>
              </div>
            ) : activeTab === 'users' ? (
              /* USERS TABLE */
              <table className="min-w-full divide-y divide-gray-100 text-left text-sm text-gray-700">
                <thead className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Signed Up</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white font-medium text-gray-900">
                  {filteredProfiles.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-12 text-gray-400">
                        No user profiles found.
                      </td>
                    </tr>
                  ) : (
                    filteredProfiles.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-950">{p.name || '-'}</td>
                        <td className="px-6 py-4 text-gray-600">{p.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            p.role === 'admin' 
                              ? 'bg-red-50 text-red-700 border border-red-100' 
                              : 'bg-teal-50 text-teal-700 border border-teal-100'
                          }`}>
                            {p.role === 'admin' ? <ShieldCheck size={12} /> : <UserCheck size={12} />}
                            <span className="uppercase tracking-wider text-[9px]">{p.role}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-xs flex items-center gap-1.5">
                          <Calendar size={12} />
                          {new Date(p.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              /* DOCUMENTS TABLE */
              <table className="min-w-full divide-y divide-gray-100 text-left text-sm text-gray-700">
                <thead className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Document Title</th>
                    <th className="px-6 py-4">Owner Name</th>
                    <th className="px-6 py-4">Owner Email</th>
                    <th className="px-6 py-4">Saved Date</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white font-medium text-gray-900">
                  {filteredDocs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-gray-400">
                        No saved documents found.
                      </td>
                    </tr>
                  ) : (
                    filteredDocs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-950">{doc.title}</td>
                        <td className="px-6 py-4 text-gray-600">{doc.profiles?.name || '-'}</td>
                        <td className="px-6 py-4 text-gray-600">{doc.profiles?.email}</td>
                        <td className="px-6 py-4 text-gray-500 text-xs">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                            title="Moderator delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
