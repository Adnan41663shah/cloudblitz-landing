'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useCursorGlow } from '../hooks/useCursorGlow';
import { CourseType, ModalPurpose } from '../types';
import logoImg from '../assets/logo.webp';
import whatsappIcon from '../assets/whatsapp-color-svgrepo-com.svg';

interface HeaderProps {
  activeCourse: CourseType;
  setActiveCourse: (course: CourseType) => void;
  openModal: (course: CourseType, purpose?: ModalPurpose) => void;
  promoText?: string;
  promoTimeHours?: number;
  promoTimeMinutes?: number;
  promoTimeSeconds?: number;
}

export default function Header({
  activeCourse,
  setActiveCourse,
  openModal,
  promoText,
  promoTimeHours,
  promoTimeMinutes,
  promoTimeSeconds
}: HeaderProps) {
  const { containerRef: headerGlowRef, glowRef, glowVariant } = useCursorGlow(activeCourse);

  const propTime = useMemo(
    () => ({
      hours: promoTimeHours ?? 5,
      minutes: promoTimeMinutes ?? 42,
      seconds: promoTimeSeconds ?? 19,
    }),
    [promoTimeHours, promoTimeMinutes, promoTimeSeconds],
  );

  const propTimeKey = `${promoTimeHours ?? ''}-${promoTimeMinutes ?? ''}-${promoTimeSeconds ?? ''}`;

  const [timeLeft, setTimeLeft] = useState(propTime);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [lastPropTimeKey, setLastPropTimeKey] = useState(propTimeKey);

  // Reset countdown when admin updates promo timer props (during render, not in an effect)
  if (lastPropTimeKey !== propTimeKey) {
    setLastPropTimeKey(propTimeKey);
    setTimeLeft(propTime);
    setPromoDismissed(false);
  }

  const isTimeUp =
    timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  const promoVisible = !promoDismissed && !isTimeUp;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll event detector for dynamic sticky header transitions
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer decrement effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }

        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Calculate offest if navbar is sticky
      const offset = scrolled ? 85 : 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* 1. Sleek Promo Countdown Banner */}
      {promoVisible && (
        <div className="w-full bg-gradient-to-r from-coral via-purple to-indigo-900 text-white py-2.5 px-4 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold gap-3 relative shadow-inner overflow-hidden">
          {/* Shimmer line background overlay */}
          <div className="absolute inset-0 bg-white/5 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:250px_250px] animate-shimmer pointer-events-none" />

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 relative z-10 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-ping shrink-0" />
              <span className="tracking-loose font-extrabold">{promoText || "✨ May Special: Get 27% OFF + Free 1-on-1 Mock Interviews!"}</span>
            </div>
            <button
              onClick={() => openModal(activeCourse, 'offer')}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-3 py-1 text-[10px] font-black uppercase rounded-lg shadow-md transition-all duration-200 active:scale-95 whitespace-nowrap hover:shadow-yellow-400/25 cursor-pointer"
            >
              Avail Offer
            </button>
          </div>

          <div className="flex items-center gap-5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-[10px] uppercase font-bold tracking-wider hidden md:inline-block">Special Offer Ends In:</span>
              <span className="font-mono text-[11px] font-black bg-black/25 px-2.5 py-1 rounded-lg border border-white/10 tracking-widest text-yellow-300 flex gap-0.5 shadow-inner">
                <span>{formatNumber(timeLeft.hours)}</span>
                <span className="animate-pulse text-white/50">:</span>
                <span>{formatNumber(timeLeft.minutes)}</span>
                <span className="animate-pulse text-white/50">:</span>
                <span>{formatNumber(timeLeft.seconds)}</span>
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold bg-white/10 px-2 py-1 rounded-lg border border-white/5">
              <span className="text-yellow-400 text-xs">★</span>
              <span>4.9/5 Trust Rating</span>
            </div>

            <button
              onClick={() => setPromoDismissed(true)}
              className="absolute sm:relative top-2 sm:top-auto right-3 sm:right-auto text-white/60 hover:text-white transition-colors duration-200 p-0.5 rounded-md hover:bg-white/10"
              aria-label="Dismiss banner"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 2. Glassmorphic main Navigation bar (Sticky) */}
      <div
        className={`w-full z-50 transition-all duration-300 sticky top-0 bg-transparent ${scrolled ? 'py-2.5' : 'py-0'}`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav
            ref={headerGlowRef}
            className={`glass-nav glass-nav--glow relative isolate overflow-hidden rounded-4xl flex items-center justify-between px-6 transition-all duration-300 h-16 md:h-17 shadow-md`}
          >
            <div
              ref={glowRef}
              aria-hidden
              className={`cursor-glow cursor-glow--compact cursor-glow--${glowVariant}`}
            />

            <div className="relative z-[2] flex w-full items-center justify-between">
            {/* Logo Branding with soft ambient hover glow */}
            <a
              href="https://cloudblitz.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center cursor-pointer transition-all duration-300 hover:scale-[1.02] shrink-0"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-coral/10 to-purple/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <Image
                src={logoImg}
                alt="CLOUDBLITZ"
                className="h-7 sm:h-8 lg:h-9 w-auto object-contain relative z-10"
                priority
              />
            </a>

            {/* Desktop Nav Items & Course Switcher */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-text-medium">
              <button
                onClick={() => scrollToSection('highlights')}
                className="relative py-2 px-3 text-xs xl:text-sm text-text-medium hover:text-text-dark transition-all duration-300 group"
              >
                <span>Why Choose Us</span>
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-coral to-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </button>
              <button
                onClick={() => scrollToSection('syllabus')}
                className="relative py-2 px-3 text-xs xl:text-sm text-text-medium hover:text-text-dark transition-all duration-300 group"
              >
                <span>Curriculum</span>
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-coral to-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </button>

              {/* Course Switcher - Premium Toggle Layout */}
              <div className="inline-flex rounded-2xl border border-slate-200/50 bg-slate-100/50 p-1 shadow-inner backdrop-blur-md ml-2 relative overflow-hidden">
                <button
                  onClick={() => {
                    setActiveCourse('cdec');
                    scrollToSection('hero');
                  }}
                  className={`relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black transition-all duration-300 border ${activeCourse === 'cdec'
                    ? 'bg-coral border-coral text-white shadow-md shadow-coral/25 scale-100'
                    : 'border-transparent text-text-medium hover:text-coral hover:bg-coral/5'
                    }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-300 ${activeCourse === 'cdec'
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse'
                    : 'bg-coral'
                    }`} />
                  <span className="whitespace-nowrap">Cloud DevOps [CDEC]</span>
                </button>

                <button
                  onClick={() => {
                    setActiveCourse('X-DSAAI');
                    scrollToSection('hero');
                  }}
                  className={`relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black transition-all duration-300 border ${activeCourse === 'X-DSAAI'
                    ? 'bg-purple border-purple text-white shadow-md shadow-purple/25 scale-100'
                    : 'border-transparent text-text-medium hover:text-purple hover:bg-purple/5'
                    }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-300 ${activeCourse === 'X-DSAAI'
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse'
                    : 'bg-purple'
                    }`} />
                  <span className="whitespace-nowrap">Data Science & AI [X-DSAAI]</span>
                </button>
              </div>
            </div>

            {/* Desktop Right side CTA Buttons (High Converting Combo) */}
            <div className="hidden lg:flex items-center gap-3.5">
              <a
                href="https://wa.me/919834887259?text=Hi!%20I'm%20interested%20in%20learning%20more%20about%20CloudBlitz%20courses.%20Can%20you%20help%20me?"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/40 hover:bg-emerald-50/80 px-4.5 h-11 text-xs font-bold text-emerald-600 transition-all duration-300 shadow-sm backdrop-blur-md active:scale-95 hover:-translate-y-0.5 cursor-pointer hover:shadow-emerald-500/5"
              >
                <Image
                  src={whatsappIcon}
                  alt="WhatsApp"
                  width={18}
                  height={18}
                  className="h-4.5 w-4.5 object-contain"
                />
                <span>WhatsApp</span>
              </a>


            </div>

            {/* Mobile Menu Actions */}
            <div className="flex lg:hidden items-center gap-2.5">
              <a
                href="https://wa.me/919834887259?text=Hi!%20I'm%20interested%20in%20learning%20more%20about%20CloudBlitz%20courses.%20Can%20you%20help%20me?"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/15 bg-emerald-50/30 hover:bg-emerald-50/60 transition-all active:scale-95 shadow-sm backdrop-blur-md"
                aria-label="Chat on WhatsApp"
              >
                <Image
                  src={whatsappIcon}
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-text-medium transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            </div>
          </nav>

          {/* Mobile Drawer menu (Gorgeously App-Like) */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-4 right-4 mt-2 z-50 rounded-3xl border border-slate-200/50 bg-white/95 p-5 shadow-2xl flex flex-col gap-4 animate-scale-up backdrop-blur-xl">
          {/* Mobile Course Switcher Header */}
          <div className="flex flex-col gap-2.5 p-2 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-[9px] font-black text-text-muted uppercase tracking-widest px-2.5 pt-1.5 pb-0.5">
              Select Active Curriculum Stream
            </div>
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  setActiveCourse('cdec');
                  scrollToSection('hero');
                }}
                className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs transition-all duration-300 border ${activeCourse === 'cdec'
                  ? 'bg-coral border-coral text-white shadow-md shadow-coral/15'
                  : 'border-slate-200/60 text-text-medium hover:text-coral bg-white hover:bg-coral/5'
                  }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-300 ${activeCourse === 'cdec'
                  ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse'
                  : 'bg-coral'
                  }`} />
                <span>DevOps [CDEC]</span>
              </button>

              <button
                onClick={() => {
                  setActiveCourse('X-DSAAI');
                  scrollToSection('hero');
                }}
                className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs transition-all duration-300 border ${activeCourse === 'X-DSAAI'
                  ? 'bg-purple border-purple text-white shadow-md shadow-purple/15'
                  : 'border-slate-200/60 text-text-medium hover:text-purple bg-white hover:bg-purple/5'
                  }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-300 ${activeCourse === 'X-DSAAI'
                  ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse'
                  : 'bg-purple'
                  }`} />
                <span>Data Science [X-DSAAI]</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1 py-1">
            <button
              onClick={() => scrollToSection('highlights')}
              className="w-full text-left text-sm text-text-medium hover:text-coral transition-colors py-3 border-b border-slate-100 px-2 flex items-center justify-between"
            >
              <span>Why Choose Us</span>
              <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection('syllabus')}
              className="w-full text-left text-sm text-text-medium hover:text-coral transition-colors py-3 px-2 flex items-center justify-between"
            >
              <span>Explore Curriculum</span>
              <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Big high converting button for mobile drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openModal(activeCourse, 'consultation');
            }}
            className="w-full relative flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand hover:opacity-95 py-4 text-xs font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer overflow-hidden text-center"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Talk to Career Expert (Free Call)</span>
          </button>
        </div>
      )}

        </div>
      </div>
    </>
  );
}
