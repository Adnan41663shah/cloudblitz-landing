'use client';

import React, { useState } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in localStorage as fallback
        localStorage.setItem('admin_token', data.token);
        
        // Redirect back to main page where customizer drawer will activate
        window.location.href = '/';
      } else {
        setError(data.error || 'Authentication failed. Please check password.');
      }
    } catch (err) {
      setError('Unable to connect to login server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-white font-sans relative overflow-hidden px-4">
      {/* Decorative dynamic ambient glow points */}
      <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-coral/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main glassmorphic login card */}
      <div className="w-full max-w-md transform overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-7 sm:p-10 shadow-2xl transition-all relative z-10 text-center animate-scale-up">
        {/* Brand header */}
        <div className="mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-purple text-white font-black text-lg shadow-lg shadow-coral/20 mb-4">
            CB
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
            Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
            Authentication required to modify live landing page content
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
              Admin Access Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={loading}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm sm:text-base text-white outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all font-mono tracking-widest disabled:opacity-50"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 rounded-2xl animate-shake">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-coral to-purple py-3.5 text-sm sm:text-base font-black text-white shadow-lg shadow-coral/15 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <span>Unlock Console</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">
          <a href="/">← Return to Landing Page</a>
        </div>
      </div>
    </div>
  );
}
