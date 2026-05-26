'use client';

import React from 'react';
import Image from 'next/image';
import bannerImage from '../assets/image.png';

interface HighlightCard {
  id: number;
  title: string;
  description: string;
  badge: string;
  iconBg: string;
  icon: React.ReactNode;
}

const highlights: HighlightCard[] = [
  {
    id: 1,
    title: 'Live Interactive Classes',
    description: 'Learn in real-time from active industry experts. Interact, clear doubts instantly, and engage with live hands-on walkthroughs.',
    badge: 'Dual Mode',
    iconBg: 'bg-emerald-500/10 text-emerald-500',
    icon: (
      <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 2,
    title: '20+ Industry Grade Projects',
    description: 'Build robust professional portfolios mimicking commercial architectures in AWS, Docker, AI modelling, and database scale.',
    badge: '100% Practical',
    iconBg: 'bg-coral/10 text-coral',
    icon: (
      <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Mock Interviews & Resumes',
    description: 'Collaborate with dedicated resume reviewers, optimize LinkedIn profiles, and pass realistic technical grid mock interviews.',
    badge: 'Career Ready',
    iconBg: 'bg-purple/10 text-purple',
    icon: (
      <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Placement Support & Referrals',
    description: 'Tap into our exclusive partner network of over 400+ corporate entities offering active hiring processes and direct student paths.',
    badge: '400+ Hiring Partners',
    iconBg: 'bg-blue-500/10 text-blue-500',
    icon: (
      <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function Highlights() {
  return (
    <section id="highlights" className="w-full relative overflow-hidden border-y border-slate-200/50 bg-slate-50 py-16 sm:py-24 flex items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src={bannerImage}
          alt="Professional Tech Learning Environment"
          fill
          sizes="100vw"
          priority
          className="object-cover object-[center_28%] lg:object-right"
        />
        {/* Responsive dual overlay structure */}
        {/* 1. Desktop mode overlay: clean light gradient fade from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent hidden lg:block" />
        {/* 2. Mobile/Tablet overlay: Solid high opacity light background to maintain text legibility */}
        <div className="absolute inset-0 bg-slate-50/92 lg:hidden" />
      </div>

      {/* Highlights Grid Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Heading and 2x2 Highlights Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">

            {/* Header Content */}
            <div className="max-w-2xl mb-10 space-y-3.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1 text-xs font-bold text-coral uppercase tracking-wider">
                Engineered for Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark tracking-tight leading-tight">
                Engineered for <span className="text-gradient">Career Transitions</span>
              </h2>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed font-semibold">
                We bridge the gap between classroom syntax and corporate expectation by delivering a fully immersive, feedback-driven education structure.
              </p>
            </div>

            {/* Grid layout for Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5.5">
              {highlights.map((h) => (
                <div
                  key={h.id}
                  className="group relative bg-white/70 backdrop-blur-md rounded-3xl p-5 border border-white/60 hover:bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-coral/20"
                >
                  {/* Icon and Badge Header */}
                  <div className="flex justify-between items-center mb-4.5">
                    <div className={`p-2.5 rounded-xl ${h.iconBg}`}>
                      {h.icon}
                    </div>
                    <span className="text-[9.5px] font-extrabold tracking-wider uppercase text-text-muted bg-slate-100/80 px-2.5 py-0.5 rounded-full group-hover:bg-coral/10 group-hover:text-coral transition-colors">
                      {h.badge}
                    </span>
                  </div>

                  {/* Title & Description Content */}
                  <h3 className="text-base font-bold text-text-dark mb-1.5 group-hover:text-coral transition-colors">
                    {h.title}
                  </h3>
                  <p className="text-[12.5px] text-text-medium leading-relaxed font-semibold">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Intentionally Empty (showcases image.png professional background on desktop) */}
          <div className="hidden lg:block lg:col-span-5 h-[350px] pointer-events-none select-none" />

        </div>
      </div>
    </section>
  );
}
