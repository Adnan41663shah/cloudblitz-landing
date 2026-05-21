'use client';

import React, { useState } from 'react';
import { SiteContent } from '../types/admin';
import { FAQItem } from '../types';

interface AdminCustomizerProps {
  content: SiteContent;
  onUpdateContent: (newContent: SiteContent) => void;
  onSave: () => Promise<void>;
  saving: boolean;
  onLogout: () => void;
}

export default function AdminCustomizer({
  content,
  onUpdateContent,
  onSave,
  saving,
  onLogout,
}: AdminCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'banner' | 'hero' | 'faqs'>('banner');
  const [editingFaqId, setEditingFaqId] = useState<number | null>(null);

  // Temporary state for adding a new FAQ
  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: '',
    category: 'general' as 'general' | 'placement' | 'curriculum' | 'pricing'
  });

  const handleTextChange = (key: keyof SiteContent, value: any) => {
    onUpdateContent({
      ...content,
      [key]: value,
    });
  };

  const handleNumberChange = (key: keyof SiteContent, value: string) => {
    const num = parseInt(value, 10) || 0;

    if (key === 'promoTimeHours' || key === 'promoTimeMinutes' || key === 'promoTimeSeconds') {
      const h = key === 'promoTimeHours' ? num : (content.promoTimeHours ?? 0);
      const m = key === 'promoTimeMinutes' ? num : (content.promoTimeMinutes ?? 0);
      const s = key === 'promoTimeSeconds' ? num : (content.promoTimeSeconds ?? 0);

      const newTargetTimestamp = Date.now() + (h * 3600 + m * 60 + s) * 1000;

      onUpdateContent({
        ...content,
        [key]: num,
        promoTargetTimestamp: newTargetTimestamp
      });
    } else {
      onUpdateContent({
        ...content,
        [key]: num,
      });
    }
  };

  // FAQ CRUD operations
  const handleUpdateFaq = (faqId: number, field: keyof FAQItem, value: string) => {
    const updatedFaqs = content.faqs.map(faq => {
      if (faq.id === faqId) {
        return { ...faq, [field]: value };
      }
      return faq;
    });
    onUpdateContent({
      ...content,
      faqs: updatedFaqs
    });
  };

  const handleDeleteFaq = (faqId: number) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      const updatedFaqs = content.faqs.filter(faq => faq.id !== faqId);
      onUpdateContent({
        ...content,
        faqs: updatedFaqs
      });
      if (editingFaqId === faqId) setEditingFaqId(null);
    }
  };

  const handleAddFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      alert('FAQ Question and Answer are required');
      return;
    }

    const nextId = content.faqs.length > 0 ? Math.max(...content.faqs.map(f => f.id)) + 1 : 1;
    const addedFaq: FAQItem = {
      id: nextId,
      question: newFaq.question.trim(),
      answer: newFaq.answer.trim(),
      category: newFaq.category
    };

    onUpdateContent({
      ...content,
      faqs: [...content.faqs, addedFaq]
    });

    setNewFaq({
      question: '',
      answer: '',
      category: 'general'
    });
  };

  return (
    <>
      {/* Floating Admin Badge Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 bottom-4 z-40 bg-slate-950 hover:bg-slate-900 text-white font-extrabold border border-white/10 shadow-2xl p-3.5 rounded-full flex items-center gap-2 cursor-pointer shadow-coral/10 hover:scale-105 active:scale-95 transition-all text-xs tracking-tight uppercase"
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <svg className="h-4 w-4 animate-spin-slow text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>⚙️ Admin Console</span>
      </button>

      {/* Main Sliding Drawer Shell */}
      <div
        className={`fixed left-0 top-0 h-full w-[360px] sm:w-[400px] bg-slate-950/98 backdrop-blur-2xl border-r border-white/10 text-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-brand flex items-center justify-center font-black text-xs">
              AD
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight leading-none uppercase">Live Customizer</h2>
              <span className="text-[9.5px] text-slate-400 font-bold">Modifications reflect on screen instantly</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 border-b border-white/10 text-center text-xs font-black select-none tracking-tight">
          <button
            onClick={() => setActiveTab('banner')}
            className={`py-3.5 border-b-2 transition-all ${activeTab === 'banner' ? 'border-coral text-coral bg-white/[0.02]' : 'border-transparent text-slate-400 hover:text-white'
              }`}
          >
            BANNER
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`py-3.5 border-b-2 transition-all ${activeTab === 'hero' ? 'border-coral text-coral bg-white/[0.02]' : 'border-transparent text-slate-400 hover:text-white'
              }`}
          >
            HERO COPY
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`py-3.5 border-b-2 transition-all ${activeTab === 'faqs' ? 'border-coral text-coral bg-white/[0.02]' : 'border-transparent text-slate-400 hover:text-white'
              }`}
          >
            FAQS
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          {/* TAB 1: Banner Details */}
          {activeTab === 'banner' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">
                  Top Promo Announcement Banner
                </label>
                <textarea
                  value={content.promoText}
                  onChange={(e) => handleTextChange('promoText', e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs sm:text-sm text-white outline-none focus:border-coral transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">
                    Hours Remaining
                  </label>
                  <input
                    type="number"
                    value={content.promoTimeHours}
                    onChange={(e) => handleNumberChange('promoTimeHours', e.target.value)}
                    min={0}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-center text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">
                    Minutes Remaining
                  </label>
                  <input
                    type="number"
                    value={content.promoTimeMinutes}
                    onChange={(e) => handleNumberChange('promoTimeMinutes', e.target.value)}
                    min={0}
                    max={59}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-center text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">
                    Seconds Remaining
                  </label>
                  <input
                    type="number"
                    value={content.promoTimeSeconds}
                    onChange={(e) => handleNumberChange('promoTimeSeconds', e.target.value)}
                    min={0}
                    max={59}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-center text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hero Details */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              {/* DevOps CDEC Section */}
              <div className="space-y-3.5 p-3.5 rounded-2xl border border-white/5 bg-white/[0.02]">
                <span className="inline-flex rounded-md bg-coral/10 px-2 py-0.5 text-[9px] font-black text-coral uppercase tracking-wider">
                  Cloud DevOps (CDEC)
                </span>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                    CDEC Next Batch Schedule Card
                  </label>
                  <input
                    type="text"
                    value={content.heroCDECBatchDate}
                    onChange={(e) => handleTextChange('heroCDECBatchDate', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs outline-none focus:border-coral transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                    CDEC Seats Left (e.g. 04 / 20)
                  </label>
                  <input
                    type="text"
                    value={content.heroCDECSeats || ''}
                    onChange={(e) => handleTextChange('heroCDECSeats', e.target.value)}
                    placeholder="04 / 20"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs outline-none focus:border-coral transition-all"
                  />
                </div>
              </div>

              {/* Data Science XDSAI Section */}
              <div className="space-y-3.5 p-3.5 rounded-2xl border border-white/5 bg-white/[0.02]">
                <span className="inline-flex rounded-md bg-purple/10 px-2 py-0.5 text-[9px] font-black text-purple uppercase tracking-wider">
                  Data Science & AI (XDSAI)
                </span>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                    XDSAI Next Batch Schedule Card
                  </label>
                  <input
                    type="text"
                    value={content.heroXDSAIBatchDate}
                    onChange={(e) => handleTextChange('heroXDSAIBatchDate', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs outline-none focus:border-coral transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                    XDSAI Seats Left (e.g. 06 / 20)
                  </label>
                  <input
                    type="text"
                    value={content.heroXDSAISeats || ''}
                    onChange={(e) => handleTextChange('heroXDSAISeats', e.target.value)}
                    placeholder="06 / 20"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs outline-none focus:border-coral transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FAQs Management */}
          {activeTab === 'faqs' && (
            <div className="space-y-5">
              {/* Add New FAQ Form */}
              <div className="space-y-3 p-3.5 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02]">
                <span className="block text-[10px] font-black uppercase text-emerald-400 tracking-wider mb-1">
                  Add New FAQ Record
                </span>
                <div>
                  <input
                    type="text"
                    placeholder="Enter FAQ Question..."
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Enter FAQ Answer..."
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    rows={2}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs outline-none focus:border-emerald-400 resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={newFaq.category}
                    onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value as any })}
                    className="flex-1 rounded-xl border border-white/10 bg-slate-900 p-2 text-xs"
                  >
                    <option value="general">Eligibility & General</option>
                    <option value="placement">Placements & Careers</option>
                    <option value="curriculum">Curriculum & Format</option>
                    <option value="pricing">EMI & Scholarships</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 rounded-xl text-xs font-black tracking-tight cursor-pointer"
                  >
                    Add FAQ
                  </button>
                </div>
              </div>

              {/* Editable FAQs List */}
              <div className="space-y-3">
                <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                  Manage Existing FAQs ({content.faqs.length})
                </span>

                {content.faqs.map((faq) => {
                  const isEditing = editingFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`p-3 rounded-xl border transition-colors ${isEditing ? 'border-coral bg-white/[0.02]' : 'border-white/5 bg-white/[0.01]'
                        }`}
                    >
                      {isEditing ? (
                        <div className="space-y-2.5 text-left">
                          <div>
                            <span className="text-[8px] font-black uppercase text-coral">Editing FAQ #{faq.id}</span>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleUpdateFaq(faq.id, 'question', e.target.value)}
                              className="w-full rounded-xl border border-white/10 bg-slate-900 p-2 text-xs mt-1"
                            />
                          </div>
                          <div>
                            <textarea
                              value={faq.answer}
                              onChange={(e) => handleUpdateFaq(faq.id, 'answer', e.target.value)}
                              rows={3}
                              className="w-full rounded-xl border border-white/10 bg-slate-900 p-2 text-xs resize-none"
                            />
                          </div>
                          <div className="flex gap-2">
                            <select
                              value={faq.category}
                              onChange={(e) => handleUpdateFaq(faq.id, 'category', e.target.value)}
                              className="flex-1 rounded-xl border border-white/10 bg-slate-900 p-2 text-xs"
                            >
                              <option value="general">Eligibility & General</option>
                              <option value="placement">Placements & Careers</option>
                              <option value="curriculum">Curriculum & Format</option>
                              <option value="pricing">EMI & Scholarships</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => setEditingFaqId(null)}
                              className="bg-coral text-white px-3 py-1.5 rounded-xl text-[10px] font-black cursor-pointer"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <span className="inline-block text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
                              Category: {faq.category}
                            </span>
                            <h4 className="text-xs font-bold text-slate-200 truncate leading-tight">
                              {faq.question}
                            </h4>
                            <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                              {faq.answer}
                            </p>
                          </div>

                          {/* Mini Controls */}
                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => setEditingFaqId(faq.id)}
                              className="p-1.5 rounded-md hover:bg-white/5 text-slate-400 hover:text-white"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteFaq(faq.id)}
                              className="p-1.5 rounded-md hover:bg-white/5 text-slate-400 hover:text-red-400"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Save and Logout Panel at Drawer Base */}
        <div className="p-4 border-t border-white/10 bg-slate-950 flex flex-col gap-3">
          <button
            onClick={onSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand hover:opacity-95 py-3 text-sm font-black text-white shadow-lg shadow-coral/15 disabled:opacity-50 cursor-pointer transition-all active:scale-95"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving to Database...</span>
              </>
            ) : (
              <>
                <span>Publish Updates Live</span>
                <svg className="h-4.5 w-4.5 animate-bounce-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </>
            )}
          </button>

          <button
            onClick={onLogout}
            className="w-full py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-red-500/10 hover:border-red-500/20 text-xs font-black text-slate-400 hover:text-red-400 cursor-pointer transition-colors text-center"
          >
            Log Out Session
          </button>
        </div>
      </div>
    </>
  );
}
