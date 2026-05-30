'use client';

import { CourseType } from '../types';
import HeroLeadForm from './HeroLeadForm';
import { CardStarsBackground } from '@/components/ui/card-stars';
import { useCursorGlow } from '../hooks/useCursorGlow';
import {
  HeroRevealDescription,
  HeroRevealHeading,
  HeroRevealLine,
} from './HeroRevealText';

interface HeroProps {
  activeCourse: CourseType;
  setActiveCourse: (course: CourseType) => void;
  openModal: (course: CourseType, purpose?: 'syllabus' | 'consultation' | 'quick') => void;
  cdecBatch?: string;
  cdecSeats?: string;
  XDSAAIBatch?: string;
  XDSAAISeats?: string;
}

export default function Hero({
  activeCourse,
  openModal,
  cdecBatch,
  cdecSeats,
  XDSAAIBatch,
  XDSAAISeats
}: HeroProps) {
  const { containerRef: heroRef, glowRef, glowVariant } = useCursorGlow(activeCourse);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative isolate w-full overflow-hidden border-b border-slate-100 pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-bg-main bg-dot-pattern"
        aria-hidden
      />

      <div
        ref={glowRef}
        aria-hidden
        className={`cursor-glow hero-cursor-glow hero-cursor-glow--${glowVariant} cursor-glow--${glowVariant}`}
      />

      <div className="relative z-[2] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Layout Grid: Left Content, Right Live Workspace Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Headings, trust bullets & premium CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 sm:space-y-8">

            {/* Live Program Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-text-dark border border-slate-200/60 shadow-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase tracking-widest text-[9px] font-black text-text-muted">Interactive Classroom to Corporate Track</span>
            </div>

            {/* Headings & description — left-to-right mask reveal */}
            <div className="space-y-4">
              {activeCourse === 'cdec' ? (
                <HeroRevealHeading
                  revealKey="cdec-heading"
                  className="text-4xl sm:text-5xl lg:text-[50px] font-bold tracking-wider text-text-dark leading-[1.08] font-display"
                >
                  <HeroRevealLine lineKey={`${activeCourse}-h1`} delay={0}>
                    Become a
                  </HeroRevealLine>
                  <HeroRevealLine lineKey={`${activeCourse}-h2`} delay={0.12}>
                    <span className="text-gradient font-bold">Production-Ready</span>
                  </HeroRevealLine>
                  <HeroRevealLine lineKey={`${activeCourse}-h3`} delay={0.24}>
                    Cloud DevOps
                  </HeroRevealLine>
                  <HeroRevealLine lineKey={`${activeCourse}-h4`} delay={0.36}>
                    Engineer.
                  </HeroRevealLine>
                </HeroRevealHeading>
              ) : (
                <HeroRevealHeading
                  revealKey="xdsaai-heading"
                  className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-wider text-text-dark leading-[1.08] font-display"
                >
                  <HeroRevealLine lineKey={`${activeCourse}-h1`} delay={0}>
                    Become an
                  </HeroRevealLine>
                  <HeroRevealLine lineKey={`${activeCourse}-h2`} delay={0.12}>
                    <span className="text-gradient font-bold">Industry-Ready</span>
                  </HeroRevealLine>
                  <HeroRevealLine lineKey={`${activeCourse}-h3`} delay={0.24}>
                    Data Scientist &amp;
                  </HeroRevealLine>
                  <HeroRevealLine lineKey={`${activeCourse}-h4`} delay={0.36}>
                    AI Expert.
                  </HeroRevealLine>
                </HeroRevealHeading>
              )}

              <HeroRevealDescription
                revealKey={activeCourse === 'cdec' ? 'cdec-desc' : 'xdsaai-desc'}
                delay={0.52}
                className="max-w-2xl text-base sm:text-lg text-text-medium leading-relaxed font-normal"
              >
                {activeCourse === 'cdec'
                  ? 'Gain hands-on expertise in AWS, Azure, Docker, Kubernetes, Terraform, Jenkins, and Git. Learn real pipelines, automated testing, and secure infrastructure deployment under professional guidance with 100% placement support.'
                  : 'Master Python, SQL, statistics, machine learning, deep learning, and AI-driven analytics. Gain high-demand expertise in Tableau, Power BI, Hadoop, Spark, R-Programming, and cloud platforms like AWS and Google Cloud through hands-on projects.'}
              </HeroRevealDescription>
            </div>

            {/* Trust and Key Value Bullets */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-text-dark">Live Interactive Mentorship</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-text-dark">20+ Production Capstone Projects</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-text-dark">Assured Placement Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-text-dark">Global Professional Certification</span>
              </div>
            </div>

            {/* Dynamic Next Batch Starting Date & Time Card */}
            <div className={`w-full rounded-2xl border bg-gradient-to-r p-4 flex items-center gap-4 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 ${activeCourse === 'cdec'
              ? 'border-coral/15 from-coral/5 to-pink-500/5'
              : 'border-purple/15 from-purple/5 to-indigo-500/5'
              }`}>
              {/* Pulsing decoration glow */}
              <div className={`absolute top-0 right-0 h-24 w-24 rounded-full blur-xl pointer-events-none ${activeCourse === 'cdec' ? 'bg-coral/5' : 'bg-purple/5'
                }`} />

              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border shadow-sm group-hover:scale-105 transition-transform duration-300 ${activeCourse === 'cdec'
                ? 'bg-coral/10 text-coral border-coral/15'
                : 'bg-purple/10 text-purple border-purple/15'
                }`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className={`block text-[9.5px] font-bold uppercase tracking-widest leading-none mb-1 ${activeCourse === 'cdec' ? 'text-coral' : 'text-purple'
                  }`}>
                  Live Interactive Cohort Schedule
                </span>
                <span className="block text-sm sm:text-base font-extrabold text-text-dark tracking-tight leading-tight">
                  Next Batch Starts: <span className={activeCourse === 'cdec' ? 'text-gradient-coral font-bold' : 'text-gradient-purple font-bold'}>
                    {activeCourse === 'cdec' ? (cdecBatch || 'May 25, 2026') : (XDSAAIBatch || 'May 26, 2026')}
                  </span>
                </span>
              </div>

              {/* Scarcity / Seats Remaining indicator */}
              <div className="hidden sm:flex flex-col items-end text-right justify-center gap-0.5 pl-4 shrink-0 border-l border-slate-200/80">
                <span className="text-[9.5px] font-extrabold uppercase text-text-muted tracking-wider leading-none">Seats Left</span>
                <span className={`text-base font-bold animate-pulse ${activeCourse === 'cdec' ? 'text-coral' : 'text-purple'
                  }`}>
                  {activeCourse === 'cdec' ? (cdecSeats || '04 / 20') : (XDSAAISeats || '06 / 20')}
                </span>
              </div>
            </div>

            {/* High-Converting CTA Widget */}
            <div className="w-full flex flex-col sm:flex-row flex-wrap gap-4 pt-2">

              {/* Primary Pulsing CTA */}
              <button
                onClick={() => openModal(activeCourse, 'consultation')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand text-white font-bold text-sm px-8 py-4.5 shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${activeCourse === 'cdec' ? 'shadow-coral/25 shadow-glow-coral' : 'shadow-purple/25 shadow-glow-purple'
                  }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Get Free Career Consultation</span>
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Secondary CTA: Syllabus trigger */}
              <button
                onClick={() => openModal(activeCourse, 'syllabus')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 hover:border-slate-800 bg-white hover:bg-slate-50 text-text-dark font-semibold text-sm px-6 py-4.5 transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <svg className="h-4.5 w-4.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Curriculum</span>
              </button>
            </div>

            {/* Admissions Status and Fast Response Trust */}
            <div className="flex items-center gap-2 text-xs font-extrabold text-text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Admissions for <strong>May cohorts</strong> close this week. Callbacks in under 30 minutes during working hours.</span>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Lead Form */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center relative w-full px-2 lg:px-0 gap-4">

            {/* Quick Info Cards: Duration & Mode of Training */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-[480px]">
              {/* Duration Card */}
              <div className={`relative overflow-hidden bg-white/70 backdrop-blur-lg border rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${activeCourse === 'cdec' ? 'border-coral/20 hover:border-coral/40' : 'border-purple/20 hover:border-purple/40'}`}>
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCourse === 'cdec' ? 'from-coral/5 to-transparent' : 'from-purple/5 to-transparent'}`} />
                <span className="relative block text-[10px] font-extrabold text-slate-500 mb-2.5 uppercase tracking-[0.15em]">Duration</span>
                <div className="relative flex items-center gap-2.5">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 shadow-inner ${activeCourse === 'cdec' ? 'bg-coral/10 text-coral' : 'bg-purple/10 text-purple'}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[15px] font-black text-slate-800 whitespace-nowrap">6 Months</span>
                </div>
              </div>

              {/* Mode of Training Card */}
              <div className={`relative overflow-hidden bg-white/70 backdrop-blur-lg border rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${activeCourse === 'cdec' ? 'border-coral/20 hover:border-coral/40' : 'border-purple/20 hover:border-purple/40'}`}>
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCourse === 'cdec' ? 'from-coral/5 to-transparent' : 'from-purple/5 to-transparent'}`} />
                <span className="relative block text-[10px] font-extrabold text-slate-500 mb-2.5 uppercase tracking-[0.15em]">Training Mode</span>
                <div className="relative flex items-center gap-2.5">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 shadow-inner ${activeCourse === 'cdec' ? 'bg-coral/10 text-coral' : 'bg-purple/10 text-purple'}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-black text-slate-800 leading-tight">Classroom & Online</span>
                </div>
              </div>
            </div>

            <HeroLeadForm activeCourse={activeCourse} />
          </div>

        </div>

        {/* Dynamic Trust Stats Dashboard Grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

          {/* Card 1 */}
          <CardStarsBackground glowColor="coral">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-coral/15 text-coral border border-coral/30 flex items-center justify-center shrink-0">
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">15 LPA</h3>
            </div>
            <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Highest Placement Package</span>
            <span className="block text-[10.5px] text-slate-400/90 mt-1">Direct corporate references & interviews</span>
          </CardStarsBackground>

          {/* Card 2 */}
          <CardStarsBackground glowColor="purple">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-purple/15 text-purple border border-purple/30 flex items-center justify-center shrink-0">
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">400+</h3>
            </div>
            <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Hiring Partner Companies</span>
            <span className="block text-[10.5px] text-slate-400/90 mt-1">Exclusive technical placement pool</span>
          </CardStarsBackground>

          {/* Card 3 */}
          <CardStarsBackground glowColor="emerald">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">20+</h3>
            </div>
            <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Capstone Architecture Labs</span>
            <span className="block text-[10.5px] text-slate-400/90 mt-1">Build live corporate portfolio sites</span>
          </CardStarsBackground>

          {/* Card 4 */}
          <CardStarsBackground glowColor="blue">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">1:1</h3>
            </div>
            <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Expert Mentorship & Mock Grids</span>
            <span className="block text-[10.5px] text-slate-400/90 mt-1">Clear technical barriers in real-time</span>
          </CardStarsBackground>

        </div>

      </div>

    </section>
  );
}
