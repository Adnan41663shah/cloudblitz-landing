'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import VideoTestimonialThumbnail from './VideoTestimonialThumbnail';
import { toYouTubeWatchUrl } from '@/lib/youtube';
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
  { name: 'Bharat Biradar', role: 'Solution Engineer', package: '4.8 LPA', numericPackage: 4.8 },
];

interface VideoTestimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  package: string;
  /** YouTube watch, Shorts, or youtu.be link — thumbnail is derived automatically */
  youtubeUrl: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'vt-1',
    name: 'Aditya Kadu',
    location: 'Pune, Maharashtra',
    role: 'Associate Product Engineer',
    package: '18 LPA',
    youtubeUrl: 'https://www.youtube.com/shorts/Aa69-dE9Qz4',
  },
  {
    id: 'vt-2',
    name: 'Samiksha Meshram',
    location: 'Nagpur, Maharashtra',
    role: 'SRE Engineer',
    package: '11 LPA',
    youtubeUrl: 'https://www.youtube.com/shorts/on4_Rp3KJ_g',
  },
  {
    id: 'vt-3',
    name: 'Atharva Keskar',
    location: 'Mumbai, Maharashtra',
    role: 'Associate DevOps Engineer',
    package: '9.5 LPA',
    youtubeUrl: 'https://www.youtube.com/shorts/N0ig6w-QG_k',
  },
  {
    id: 'vt-4',
    name: 'Tanishq Vaishnav',
    location: 'Indore, Madhya Pradesh',
    role: 'Senior DevOps Engineer',
    package: '11 LPA',
    youtubeUrl: 'https://www.youtube.com/shorts/EngW7tLk6R8',
  },
  {
    id: 'vt-5',
    name: 'Apurva Donge',
    location: 'Hyderabad, Telangana',
    role: 'Senior Software Engineer',
    package: '11 LPA',
    youtubeUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
  },
  {
    id: 'vt-6',
    name: 'Siddharth Mulay',
    location: 'Bengaluru, Karnataka',
    role: 'DevOps Engineer',
    package: '13 LPA',
    youtubeUrl: 'https://www.youtube.com/shorts/jNQXAC9IVRw',
  },
  {
    id: 'vt-7',
    name: 'Simran Dhoke',
    location: 'Ahmedabad, Gujarat',
    role: 'Senior Azure Consultant',
    package: '9 LPA',
    youtubeUrl: 'https://youtu.be/aqz-KE-bpKQ',
  },
  {
    id: 'vt-8',
    name: 'Shiv Verma',
    location: 'Delhi NCR, India',
    role: 'Software Engineer',
    package: '9 LPA',
    youtubeUrl: 'https://www.youtube.com/shorts/LXb3EKWsInQ',
  },
];

function VideoTestimonialsRow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  const scrollByCards = useCallback((direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>('.video-testimonial-card');
    const gap = Number.parseFloat(getComputedStyle(track).gap || '16') || 16;
    const step = firstCard ? firstCard.offsetWidth + gap : track.clientWidth * 0.85;

    track.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollButtons();

    track.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);

    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [updateScrollButtons]);

  const navButtonClass =
    'video-testimonials-nav flex shrink-0 items-center justify-center rounded-full border border-border-light bg-white text-text-dark shadow-md transition-all duration-200 hover:border-coral/40 hover:bg-coral/5 hover:text-coral active:scale-95 disabled:pointer-events-none disabled:opacity-30 disabled:shadow-none';

  return (
    <div className="mt-14 sm:mt-16">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-coral">
            Video Stories
          </span>
          <h3 className="mt-1.5 text-xl font-bold tracking-tight text-text-dark sm:text-2xl">
            Watch graduates share their journey
          </h3>
        </div>
        <p className="text-xs font-medium text-text-muted sm:text-right">
          Use arrows or scroll • Tap a card to watch on YouTube
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => scrollByCards('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll video testimonials left"
          className={`${navButtonClass} h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11`}
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="relative min-w-0 flex-1">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-4 bg-gradient-to-r from-bg-main to-transparent sm:w-6"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-4 bg-gradient-to-l from-bg-main to-transparent sm:w-6"
            aria-hidden
          />

          <div
            ref={trackRef}
            className="video-testimonials-track flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 sm:gap-4 lg:gap-5"
          >
            {videoTestimonials.map((video) => (
              <a
                key={video.id}
                href={toYouTubeWatchUrl(video.youtubeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="video-testimonial-card group/card snap-start rounded-2xl border border-border-light bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-coral/30 hover:shadow-xl sm:rounded-3xl"
                aria-label={`Watch ${video.name}'s success story on YouTube`}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[inherit] bg-slate-200">
                  <VideoTestimonialThumbnail
                    youtubeUrl={video.youtubeUrl}
                    alt={`${video.name} video testimonial`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/10 transition-opacity duration-300 group-hover/card:from-slate-950/90" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-coral shadow-lg ring-4 ring-white/30 transition-all duration-300 group-hover/card:scale-110 sm:h-12 sm:w-12">
                      <svg className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>

                  <span className="absolute right-2.5 top-2.5 rounded-lg bg-black/55 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm sm:right-3 sm:top-3">
                    {video.package}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <p className="text-sm font-bold leading-tight text-white sm:text-base">{video.name}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-white/85 sm:text-xs">{video.role}</p>
                    <p className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-white/75 sm:text-[11px]">
                      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {video.location}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollByCards('right')}
          disabled={!canScrollRight}
          aria-label="Scroll video testimonials right"
          className={`${navButtonClass} h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11`}
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

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
            Read direct stories of how Cloudblitz&apos;s live interactive labs, structured syllabus, and committed support enabled successful career changes.
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
                  &quot;{rev.text}&quot;
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

        {/* Video testimonials — horizontal scroll (2 visible mobile, 4 desktop) */}
        <VideoTestimonialsRow />
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
