'use client';

import React, { useState, useEffect } from 'react';

interface Enrollment {
  name: string;
  city: string;
  course: string;
  time: string;
}

const mockEnrollments: Enrollment[] = [
  { name: 'Kavya', city: 'Indore', course: 'Expert in Data Science and Analytics with AI', time: '2 minutes ago' },
  { name: 'Rahul', city: 'Pune', course: 'Cloud DevOps Engineering Course', time: '5 minutes ago' },
  { name: 'Priyanka', city: 'Bangalore', course: 'Expert in Data Science and Analytics with AI', time: '1 minute ago' },
  { name: 'Aditya', city: 'Delhi', course: 'Cloud DevOps Engineering Course', time: '3 minutes ago' },
  { name: 'Meera', city: 'Hyderabad', course: 'Expert in Data Science and Analytics with AI', time: '4 minutes ago' },
  { name: 'Siddharth', city: 'Mumbai', course: 'Cloud DevOps Engineering Course', time: '2 minutes ago' },
  { name: 'Ananya', city: 'Chennai', course: 'Expert in Data Science and Analytics with AI', time: '6 minutes ago' },
  { name: 'Vikram', city: 'Gurugram', course: 'Cloud DevOps Engineering Course', time: '7 minutes ago' },
];

export default function SocialProof() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first toast after 4 seconds
    const startTimeout = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Loop through notifications every 12 seconds
    const interval = setInterval(() => {
      setVisible(false);
      // Wait for slide-out animation, then change index and show
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % mockEnrollments.length);
        setVisible(true);
      }, 500);
    }, 12000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, []);

  const current = mockEnrollments[currentIdx] || mockEnrollments[0];

  return (
    <div 
      className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 w-[calc(100%-2rem)] sm:w-full sm:max-w-sm transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3.5 rounded-2xl border border-border-light/80 bg-white/90 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-md hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-300">
        {/* Glow point */}
        <div className="relative flex h-3.5 w-3.5 items-center justify-center shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </div>

        {/* Text */}
        <div className="flex-1 text-[11px] sm:text-xs text-text-medium leading-relaxed font-medium">
          🎉 <strong className="text-text-dark font-semibold">{current.name}</strong> from <span className="underline decoration-coral decoration-2 underline-offset-2 font-semibold">{current.city}</span> enrolled for <span className="font-bold text-text-dark">{current.course}</span>
          <span className="block mt-0.5 text-[10px] text-text-muted">{current.time}</span>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setVisible(false)}
          className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-slate-100 text-text-muted hover:text-text-dark transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss notification"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
