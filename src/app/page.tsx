'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { CourseType, ModalPurpose } from './types';
import Header from './components/Header';
import whatsappIcon from './assets/whatsapp-color-svgrepo-com.svg';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Syllabus from './components/Syllabus';
import TechShowcase from './components/TechShowcase';
import PlacementsAndReviews from './components/PlacementsAndReviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SocialProof from './components/SocialProof';
import LeadFormModal from './components/LeadFormModal';
import { SiteContent } from './types/admin';
import AdminCustomizer from './components/AdminCustomizer';

export default function Home() {
  const [activeCourse, setActiveCourse] = useState<CourseType>('cdec');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPreselectedCourse, setModalPreselectedCourse] = useState<CourseType>('cdec');
  const [modalPurpose, setModalPurpose] = useState<ModalPurpose>('consultation');
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  // Dynamic Site Content state with premium fallback defaults
  const [content, setContent] = useState<SiteContent>({
    promoText: "✨ May Special: Get 27% OFF + Free 1-on-1 Mock Interviews!",
    promoTimeHours: 5,
    promoTimeMinutes: 42,
    promoTimeSeconds: 19,
    heroCDECBatchDate: "MAY 28, 2026 | 8:00 PM IST",
    heroCDECSeats: "04 / 20",
    heroXDSAIBatchDate: "MAY 28, 2026 | 8:00 PM IST",
    heroXDSAISeats: "06 / 20",
    faqs: []
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load dynamic content from MongoDB (or safe serverless fallback)
  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/api/content');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (err) {
        console.error('Failed to fetch customized landing page content:', err);
      }
    }
    loadContent();
  }, []);

  // Verify if active admin session exists
  useEffect(() => {
    async function checkAdminSession() {
      try {
        const token = localStorage.getItem('admin_token');
        if (!token) return;

        const response = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.verified) {
            setIsAdmin(true);
          }
        }
      } catch (err) {
        console.error('Verification connection failed:', err);
      }
    }
    checkAdminSession();
  }, []);

  const handleSaveContent = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token') || '';
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert('All modifications published live successfully!');
      } else {
        alert(data.error || 'Failed to publish modifications to database.');
      }
    } catch (err) {
      alert('Unable to connect to database server. Please check connection.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    // Clear cookies by setting maxAge to 0 or calling clear
    document.cookie = "admin_token=; path=/; max-age=0;";
    setIsAdmin(false);
    alert('Logged out admin session.');
  };

  // Set hasOpenedOnce tracker when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setHasOpenedOnce(true);
    }
  }, [isModalOpen]);

  // Initial 3-second auto-open timer upon arrival
  useEffect(() => {
    if (hasOpenedOnce) return;

    const mountTimer = setTimeout(() => {
      // Default auto-open uses consultation purpose
      openModalWithCourse(activeCourse, 'consultation');
    }, 3000);

    return () => clearTimeout(mountTimer);
  }, [hasOpenedOnce, activeCourse]);

  // 30-second recurring auto-open loop when modal is closed
  useEffect(() => {
    if (isModalOpen) return;

    const loopTimer = setTimeout(() => {
      openModalWithCourse(activeCourse, 'consultation');
    }, 60000);

    return () => clearTimeout(loopTimer);
  }, [isModalOpen, activeCourse]);

  // Ad Routing / Parameter Redirection Logic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      // Support multiple query keys: course, ad, utm_campaign
      const courseParam = params.get('course') || params.get('ad') || params.get('utm_campaign');

      if (courseParam) {
        const val = courseParam.toLowerCase();
        if (['devops', 'cdec', 'cloud', 'aws'].some(term => val.includes(term))) {
          setActiveCourse('cdec');
        } else if (['datascience', 'xdsai', 'data', 'ai', 'analytics'].some(term => val.includes(term))) {
          setActiveCourse('xdsai');
        }
      }
    }
  }, []);

  const openModalWithCourse = (course: CourseType, purpose: ModalPurpose = 'consultation') => {
    setModalPreselectedCourse(course);
    setModalPurpose(purpose);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col w-full bg-bg-main text-text-medium transition-colors duration-300 font-sans antialiased">

      {/* 1. Header with promo banner & navigation links */}
      <Header
        activeCourse={activeCourse}
        setActiveCourse={setActiveCourse}
        openModal={openModalWithCourse}
        promoText={content.promoText}
        promoTimeHours={content.promoTimeHours}
        promoTimeMinutes={content.promoTimeMinutes}
        promoTimeSeconds={content.promoTimeSeconds}
      />

      {/* Main page container */}
      <main className="flex-1 w-full relative z-10 flex flex-col items-center">

        {/* 2. Interactive Hero Section */}
        <Hero
          activeCourse={activeCourse}
          setActiveCourse={setActiveCourse}
          openModal={openModalWithCourse}
          cdecBatch={content.heroCDECBatchDate}
          cdecSeats={content.heroCDECSeats}
          xdsaiBatch={content.heroXDSAIBatchDate}
          xdsaiSeats={content.heroXDSAISeats}
        />

        {/* 3. Global value highlights */}
        <Highlights />

        {/* 4. Syllabus Expandable Accordions */}
        <Syllabus
          activeCourse={activeCourse}
          openModal={openModalWithCourse}
        />

        {/* 5. Interactive Technologies & Tools Showcase */}
        <TechShowcase
          activeCourse={activeCourse}
          openModal={openModalWithCourse}
        />

        {/* Real Alumni Testimonials & Placements Tracks */}
        <PlacementsAndReviews />

        {/* 6. Categorized FAQs */}
        <FAQ
          customFaqItems={content.faqs && content.faqs.length > 0 ? content.faqs : undefined}
        />

      </main>

      {/* 7. Compliant corporate Footer */}
      <Footer
        setActiveCourse={setActiveCourse}
        openModal={openModalWithCourse}
      />

      {/* 8. Floating Social Proof looping alert */}
      <SocialProof />

      {/* 9. Glassmorphic lead capture modal */}
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedCourse={modalPreselectedCourse}
        purpose={modalPurpose}
        promoText={content.promoText}
      />

      {/* Premium Floating Side Panel (Middle-Right) */}
      <div className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 p-1.5 md:p-2 rounded-full shadow-2xl flex flex-col gap-2.5 md:gap-3 py-3.5 md:py-4 transition-all duration-300 hover:shadow-slate-400/15">

          {/* 1. WhatsApp Action */}
          <a
            href="https://wa.me/919999999999?text=Hi%20Cloudblitz,%20I%20am%20interested%20in%20learning%20more%20about%20your%20courses."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white hover:bg-emerald-50/20 border border-emerald-500/20 shadow-md shadow-slate-200/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Chat on WhatsApp"
          >
            <span className="absolute top-[-1px] right-[-1px] flex h-3 w-3 items-center justify-center z-10">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <Image
              src={whatsappIcon}
              alt="WhatsApp"
              width={24}
              height={24}
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />

            {/* Elegant Tooltip */}
            <span className="group-hover:opacity-100 group-hover:-translate-x-2 opacity-0 pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900/90 backdrop-blur-md rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 transform scale-95 origin-right group-hover:scale-100 z-50">
              Chat on WhatsApp
            </span>
          </a>

          {/* 2. Free Consultation Action */}
          <button
            onClick={() => openModalWithCourse(activeCourse, 'consultation')}
            className="group relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-br from-coral to-purple text-white shadow-md shadow-coral/15 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Book Free Consultation"
          >
            <svg className="h-5 w-5 md:h-5.5 md:w-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>

            {/* Elegant Tooltip */}
            <span className="group-hover:opacity-100 group-hover:-translate-x-2 opacity-0 pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900/90 backdrop-blur-md rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 transform scale-95 origin-right group-hover:scale-100 z-50">
              Book Free Consultation
            </span>
          </button>

          {/* 3. Fast Stream Switcher Dashboard grid button */}
          <button
            onClick={() => {
              const nextCourse = activeCourse === 'cdec' ? 'xdsai' : 'cdec';
              setActiveCourse(nextCourse);
              const element = document.getElementById('hero');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 hover:text-slate-900 shadow-md shadow-slate-100 hover:shadow-slate-200/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Switch Curriculum Track"
          >
            <svg className="h-5 w-5 md:h-5.5 md:w-5.5 text-slate-600 group-hover:text-slate-800" fill="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="4" height="4" rx="1" />
              <rect x="10" y="3" width="4" height="4" rx="1" />
              <rect x="17" y="3" width="4" height="4" rx="1" />
              <rect x="3" y="10" width="4" height="4" rx="1" />
              <rect x="10" y="10" width="4" height="4" rx="1" />
              <rect x="17" y="10" width="4" height="4" rx="1" />
              <rect x="3" y="17" width="4" height="4" rx="1" />
              <rect x="10" y="17" width="4" height="4" rx="1" />
              <rect x="17" y="17" width="4" height="4" rx="1" />
            </svg>

            {/* Elegant Tooltip */}
            <span className="group-hover:opacity-100 group-hover:-translate-x-2 opacity-0 pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900/90 backdrop-blur-md rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 transform scale-95 origin-right group-hover:scale-100 z-50">
              Switch to {activeCourse === 'cdec' ? 'Data Science' : 'Cloud DevOps'}
            </span>
          </button>

        </div>
      </div>

      {/* 10. Sliding visual admin customizer panel */}
      {isAdmin && (
        <AdminCustomizer
          content={content}
          onUpdateContent={setContent}
          onSave={handleSaveContent}
          saving={saving}
          onLogout={handleLogout}
        />
      )}

    </div>
  );
}
