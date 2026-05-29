'use client';

import React from 'react';
import Image from 'next/image';
import logoImg from '../assets/logo.webp';

interface FooterProps {
  setActiveCourse?: (course: 'cdec' | 'X-DSAAI') => void;
  openModal?: (course: 'cdec' | 'X-DSAAI', purpose?: 'syllabus' | 'consultation' | 'quick') => void;
}

export default function Footer({ setActiveCourse, openModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, course: 'cdec' | 'X-DSAAI', targetId: string) => {
    e.preventDefault();
    if (setActiveCourse) {
      setActiveCourse(course);
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-slate-100 border-t border-border-light pt-16 pb-8 transition-colors duration-300">


      {/* 2. Main Footer Grid info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 items-start">

        {/* Info Column */}
        <div className="col-span-1 sm:col-span-2 md:col-span-4 space-y-4">
          <a
            href="https://cloudblitz.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex items-center cursor-pointer transition-all duration-300 hover:scale-[1.02] shrink-0"
          >
            <Image
              src={logoImg}
              alt="CLOUDBLITZ"
              className="h-7 sm:h-8 w-auto object-contain"
              priority
            />
          </a>
          <p className="text-xs sm:text-sm text-text-medium leading-relaxed font-medium">
            Cloudblitz is a premium professional education platform delivering hands-on, live interactive training pathways in Cloud Computing, DevOps Engineering, Data Science, and Machine Learning.
          </p>
          <div className="text-xs text-text-muted space-y-1">
            <p>📍 2nd Floor, Dev heights, Lane Ring Road, above Carat, Pratap Nagar Square, Tatya Tope Nagar, Pratap Nagar, Nagpur, Maharashtra 440022</p>
            <p>✉ Email : <a href="mailto:support@cloudblitz.in">support@cloudblitz.in</a> </p>
            <p>📞 Phone: +91 98348 87259</p>
          </div>
        </div>

        {/* Link Columns */}
        <div className="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-2 space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-text-dark">DevOps Pathway</h4>
          <ul className="text-[11px] sm:text-xs text-text-medium space-y-2.5 font-medium">
            <li>
              <a
                href="#hero"
                onClick={(e) => handleLinkClick(e, 'cdec', 'hero')}
                className="hover:text-coral transition-colors"
              >
                Cloud DevOps (CDEC)
              </a>
            </li>
            <li>
              <a
                href="#syllabus"
                onClick={(e) => handleLinkClick(e, 'cdec', 'syllabus')}
                className="hover:text-coral transition-colors"
              >
                Syllabus Overview
              </a>
            </li>
            <li>
              <a
                href="#tools-showcase"
                onClick={(e) => handleLinkClick(e, 'cdec', 'tools-showcase')}
                className="hover:text-coral transition-colors"
              >
                Technologies & Tools
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-text-dark">Data Science Pathway</h4>
          <ul className="text-[11px] sm:text-xs text-text-medium space-y-2.5 font-medium">
            <li>
              <a
                href="#hero"
                onClick={(e) => handleLinkClick(e, 'X-DSAAI', 'hero')}
                className="hover:text-purple transition-colors"
              >
                Expert in AI (X-DSAAI)
              </a>
            </li>
            <li>
              <a
                href="#syllabus"
                onClick={(e) => handleLinkClick(e, 'X-DSAAI', 'syllabus')}
                className="hover:text-purple transition-colors"
              >
                Syllabus Overview
              </a>
            </li>
            <li>
              <a
                href="#placements"
                onClick={(e) => handleLinkClick(e, 'X-DSAAI', 'placements')}
                className="hover:text-purple transition-colors"
              >
                Career Outcomes
              </a>
            </li>
          </ul>
        </div>

        {/* Branches Column */}
        <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3 space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-text-dark">Our Campuses</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[11px] sm:text-xs text-text-medium font-medium">
            {[
              { name: 'Indore', address: '1st floor, IDBI BANK, Plot no, Sapna Sangeeta Rd, Tower Square, Khatiwala Tank, Indore, Madhya Pradesh 452014' },
              { name: 'Kothrud, Pune', address: '2nd floor, Kalpvrushksha Building, Mayur Colony, Kothrud, Pune Maharashtra 411038' },
              { name: 'Wakad, Pune', address: 'Fifth Floor, Bhama Pearl, near Wakad, Bhujbal Vasti, Wakad, Pimpri-Chinchwad, Maharashtra 411057' },
              { name: 'Nagpur', address: '2nd Floor, Dev Heights, Above Carat Lane, Ring Road, Pratap Nagar Square, Tatya Tope Nagar, Pratap Nagar, Nagpur, Maharashtra – 440022' },
              { name: 'Nashik', address: '2nd floor, Sakhare Arcade, above Biba Showroom, Opposite Anna Idli Restaurant, Near Canada Corner, College Road, Nashik, 422005' },
              { name: 'Kharadi, Pune', address: '15 3rd Floor, City Vista, Office No. 15A, 14A, A Wing, Fountain Road, Ashoka Nagar, Kharadi, Pune, Maharashtra 411014' },
              { name: 'Chakan, Pune', address: 'Vishal Capital 2nd floor, office no 215 and 216, Gat no 1638 and 1648 pune Nashik Highway chakan Tal-khed, Dist- pune pin -410501' },
              { name: 'Amravati', address: 'Ground floor, Narayan Niketan, opp dr. Sune hospital, narayan niketan, Rajapeth, Amravati Maharastra - 444606' },
              { name: 'Sambhaji Nagar', address: 'Coming Soon', isSoon: true },
            ].map((campus, idx) => (
              <a
                key={idx}
                href={campus.isSoon ? undefined : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.address)}`}
                target={campus.isSoon ? undefined : "_blank"}
                rel={campus.isSoon ? undefined : "noopener noreferrer"}
                title={campus.address}
                className={`flex items-center gap-1.5 transition-colors group ${campus.isSoon ? 'cursor-default opacity-70' : 'hover:text-coral cursor-pointer'}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${campus.isSoon ? 'bg-slate-300' : 'bg-coral group-hover:bg-coral'}`}></span>
                <span className="truncate" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {campus.name}
                  {campus.isSoon && <span className="text-[8px] bg-amber-100 text-amber-700 px-1 py-0.5 rounded font-black tracking-wider leading-none mt-0.5">SOON</span>}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Footer bottom copyright disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-text-muted gap-4">
        <div className="text-center sm:text-left">
          © {currentYear} CLOUDBLITZ Academic Networks. All rights reserved.
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); if (openModal) openModal('cdec', 'consultation'); }}
            className="hover:text-coral transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); if (openModal) openModal('cdec', 'consultation'); }}
            className="hover:text-coral transition-colors"
          >
            Privacy Policy
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-coral transition-colors font-semibold focus:outline-none"
          >
            <span>Back to Top</span>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>

    </footer>
  );
}
