'use client';

import React, { useState } from 'react';

interface Review {
  name: string;
  role: string;
  package: string;
  text: string;
  initials: string;
  bgColor: string;
}

interface Placement {
  name: string;
  role: string;
  package: string;
  numericPackage: number;
}

const reviews: Review[] = [
  {
    name: 'Sakshi Thakre',
    role: 'IT Analyst',
    package: '11 LPA',
    text: 'I want to express my appreciation to Cloudblitz for their excellent live training and mentorship. Their support helped me land a package of 11 LPA, and I can\'t wait to embark on this new journey!',
    initials: 'ST',
    bgColor: 'bg-coral/10 text-coral border-coral/20'
  },
  {
    name: 'Atharva Keskar',
    role: 'Associate DevOps Engineer',
    package: '9.5 LPA',
    text: 'I want to thank Cloudblitz for their live training, mentorship and support. Thanks to them, I secured a package of 9.5 LPA and am excited to start my new journey!',
    initials: 'AK',
    bgColor: 'bg-purple/10 text-purple border-purple/20'
  },
  {
    name: 'Tanishq Vaishnav',
    role: 'Senior DevOps Engineer',
    package: '11 LPA',
    text: 'Thanks to Cloudblitz, I secured an 11 LPA package! The practical classes and supportive mentors were crucial to my success. I\'m excited to begin this new chapter and appreciate the team\'s guidance!',
    initials: 'TV',
    bgColor: 'bg-accent-green/10 text-accent-green border-accent-green/20'
  }
];

const placements: Placement[] = [
  { name: 'Kiran Bhoyar', role: 'Software Engineer', package: '18 LPA', numericPackage: 18.0 },
  { name: 'Siddharth Mulay', role: 'DevOps Engineer', package: '13 LPA', numericPackage: 13.0 },
  { name: 'Sakshi Thakre', role: 'IT Analyst', package: '11 LPA', numericPackage: 11.0 },
  { name: 'Apurva Donge', role: 'Senior Software Engineer', package: '11 LPA', numericPackage: 11.0 },
  { name: 'Tanishq Vaishnav', role: 'Senior DevOps Engineer', package: '11 LPA', numericPackage: 11.0 },
  { name: 'Avinash Shelke', role: 'Associate Consultant', package: '10.5 LPA', numericPackage: 10.5 },
  { name: 'Roshan Pimpalkar', role: 'Senior DevOps Engineer', package: '10.5 LPA', numericPackage: 10.5 },
  { name: 'Atharva Keskar', role: 'Associate DevOps Engineer', package: '9.5 LPA', numericPackage: 9.5 },
  { name: 'Shiv Verma', role: 'Software Engineer', package: '9 LPA', numericPackage: 9.0 },
  { name: 'Shiv Ranjan Mahato', role: 'Middle Release Engineer', package: '9 LPA', numericPackage: 9.0 },
  { name: 'Simran Dhoke', role: 'Senior Azure Consultant', package: '9 LPA', numericPackage: 9.0 },
  { name: 'Tajesh Kamdi', role: 'Site Reliability Engineer', package: '8.5 LPA', numericPackage: 8.5 },
  { name: 'Ruchika Wasekar', role: 'DevOps Engineer', package: '8 LPA', numericPackage: 8.0 },
  { name: 'Vighnesh Manthapurwar', role: 'Associate Consultant', package: '7.6 LPA', numericPackage: 7.6 },
  { name: 'VAMAN RATHOD', role: 'Site Reliability Engineer', package: '7.5 LPA', numericPackage: 7.5 },
  { name: 'Vaishnavi Pardeshi', role: 'Senior Software Engineer', package: '7 LPA', numericPackage: 7.0 },
  { name: 'Seema Umadi', role: 'Senior Software Engineer', package: '6.8 LPA', numericPackage: 6.8 },
  { name: 'Sumedh Joshi', role: 'DevOps Engineer', package: '6.6 LPA', numericPackage: 6.6 },
  { name: 'Amrita Chouhan', role: 'Software Engineer', package: '6.5 LPA', numericPackage: 6.5 },
  { name: 'Tushar Shinde', role: 'DevOps Engineer', package: '6 LPA', numericPackage: 6.0 },
  { name: 'Bharat Biradar', role: 'Solution Engineer', package: '4.8 LPA', numericPackage: 4.8 }
];

export default function PlacementsAndReviews() {
  const [filter, setFilter] = useState<'all' | 'high' | 'mid'>('all');

  const filteredPlacements = placements.filter((p) => {
    if (filter === 'high') return p.numericPackage >= 10.0;
    if (filter === 'mid') return p.numericPackage < 10.0;
    return true;
  });

  // Split filtered placements into two rows
  const row1 = filteredPlacements.filter((_, idx) => idx % 2 === 0);
  const row2 = filteredPlacements.filter((_, idx) => idx % 2 !== 0);

  // Helper function to repeat items enough times to avoid blank gaps on large monitors
  const getRepeatedItems = (items: Placement[]) => {
    if (items.length === 0) return [];
    const minCount = 16; // guarantee seamless infinite loop
    const factor = Math.ceil(minCount / items.length);
    return Array(factor).fill(items).flat();
  };

  const row1Repeated = getRepeatedItems(row1);
  const row2Repeated = getRepeatedItems(row2);

  return (
    <section id="placements" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border-light relative overflow-hidden">
      {/* Dynamic high-performance inline styles to guarantee marquee animation functions instantly */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .animate-scroll-left {
          display: flex !important;
          width: max-content !important;
          animation: scroll-left 35s linear infinite !important;
          will-change: transform;
        }

        .animate-scroll-right {
          display: flex !important;
          width: max-content !important;
          animation: scroll-right 35s linear infinite !important;
          will-change: transform;
        }

        .pause-scroll-on-hover:hover {
          animation-play-state: paused !important;
        }
      `}} />

      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-coral/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple/5 rounded-full blur-[120px] pointer-events-none" />

      {/* SECTION 1: LEARNER REVIEWS */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[10px] font-extrabold uppercase text-purple tracking-wider bg-purple/10 px-3.5 py-1.5 rounded-full">
            Alumni Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight font-display">
            Hear from our <span className="text-gradient">Successful Graduates</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted">
            Read direct stories of how Cloudblitz's live interactive labs, structured syllabus, and committed support enabled successful career changes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="rounded-3xl border border-border-light bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Quote icon glow */}
              <div className="absolute top-6 right-8 text-slate-100 font-serif text-7xl select-none leading-none group-hover:text-coral/10 transition-colors pointer-events-none">
                “
              </div>
              
              <div className="space-y-4 relative z-10">
                {/* Star rating */}
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-text-medium leading-relaxed font-normal italic font-serif">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border-light relative z-10">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center font-bold text-sm border shrink-0 ${rev.bgColor}`}>
                  {rev.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-dark">{rev.name}</h4>
                  <p className="text-[11px] text-text-muted font-medium">{rev.role}</p>
                </div>
                <div className="ml-auto font-semibold text-xs text-coral bg-coral/5 px-2.5 py-1 rounded-lg">
                  {rev.package}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: RECENT PLACEMENT TRACKS */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <span className="text-[10px] font-extrabold uppercase text-coral tracking-wider bg-coral/10 px-3.5 py-1.5 rounded-full">
            Transitions Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight font-display">
            Glimpse of our <span className="text-gradient">Recent Placements</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted">
            Explore the roles and annual packages obtained by our learners after completing their technical evaluation and landing secure opportunities.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-10 select-none">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${filter === 'all' ? 'bg-text-dark text-white shadow-md' : 'border border-border-light hover:border-slate-300 text-text-medium'}`}
          >
            All Placements ({placements.length})
          </button>
          <button 
            onClick={() => setFilter('high')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${filter === 'high' ? 'bg-coral text-white shadow-md' : 'border border-border-light hover:border-slate-300 text-text-medium'}`}
          >
            High packages (10+ LPA)
          </button>
          <button 
            onClick={() => setFilter('mid')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${filter === 'mid' ? 'bg-purple text-white shadow-md' : 'border border-border-light hover:border-slate-300 text-text-medium'}`}
          >
            Sustained Packages (&lt; 10 LPA)
          </button>
        </div>

        {/* Placement Cards Infinite Scroll Carousels */}
        <div className="relative w-full overflow-hidden py-4 flex flex-col gap-6 sm:gap-8 select-none">
          {/* Side Fade Mask Overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-bg-main to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-bg-main to-transparent z-10 pointer-events-none" />

          {/* Row 1: Leftward moving track */}
          {row1Repeated.length > 0 && (
            <div className="w-full overflow-hidden flex">
              <div className="animate-scroll-left pause-scroll-on-hover flex gap-4 sm:gap-6 py-1">
                {row1Repeated.map((p, idx) => (
                  <div 
                    key={`row1-${idx}`} 
                    className="w-[260px] sm:w-[300px] shrink-0 rounded-2xl border border-border-light bg-white/40 p-5 hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-text-dark group-hover:text-coral transition-colors">{p.name}</h4>
                      <p className="text-[11px] text-text-muted font-normal">{p.role}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Salary Package</span>
                      <span className="text-xs sm:text-sm font-semibold text-purple bg-purple/5 px-2.5 py-1 rounded-lg">
                        {p.package}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Row 2: Rightward moving track */}
          {row2Repeated.length > 0 && (
            <div className="w-full overflow-hidden flex">
              <div className="animate-scroll-right pause-scroll-on-hover flex gap-4 sm:gap-6 py-1">
                {row2Repeated.map((p, idx) => (
                  <div 
                    key={`row2-${idx}`} 
                    className="w-[260px] sm:w-[300px] shrink-0 rounded-2xl border border-border-light bg-white/40 p-5 hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-text-dark group-hover:text-coral transition-colors">{p.name}</h4>
                      <p className="text-[11px] text-text-muted font-normal">{p.role}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Salary Package</span>
                      <span className="text-xs sm:text-sm font-semibold text-purple bg-purple/5 px-2.5 py-1 rounded-lg">
                        {p.package}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
