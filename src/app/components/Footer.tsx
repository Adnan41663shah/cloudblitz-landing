'use client';

import React from 'react';
import Image from 'next/image';
import { FaAmazon, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { SiCognizant, SiInfosys, SiTcs } from 'react-icons/si';
import logoImg from '../assets/logo.webp';

const CapgeminiLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 171 38" fill="currentColor" {...props}>
    <path d="M163.434 22.698c3.728 0 6.607-3.038 6.644-6.64-.259-1.573-.81-4.483-4.893-4.483-4.464 0-5.945 6.24-9.58 10.262-.295 2.288-2.458 4.335-5.163 4.678.664.694 2.136 1.067 3.894 1.067 3.22 0 7.118-.969 9.157-2.982-2.72.035-4.47-1.713-4.643-4.136 1.327 1.608 2.827 2.234 4.584 2.234" />
    <path d="M134.795 12.77c0-1.981-.12-3.305-1.416-3.305-.591 0-.88.116-1.397.289.459 6.7-1.054 12.6-2.902 12.6-2.423 0-1.213-14.36-6.348-14.36-4.732 0-5.412 11.463-5.95 11.463-.367 0-.422-3.01-.403-5.304.199-1.102.306-2.088.306-2.838 0-1.068-.434-2.914-2.858-1.991.086 8.195-1.556 13.15-3.403 13.15-2.712 0-2.74-7.432-2.74-9.48 0-2 .143-4.673-2.828-3.721-.446 7.15-2.318 12.547-3.5 12.547-1.762 0-1.407-12.354-5.217-12.354-3.423 0-4.482 11.7-5.196 11.7-1.277 0 .399-13.172-4.545-13.172-2.595 0-3.625 4.399-4.641 9.32-.198.954-.405.982-.438-.093a68.349 68.349 0 0 1-.024-2.758c1.249-4.947-.275-6.774-2.566-5.456.738 9.129-3.451 13.592-6.667 13.592-1.163 0-2.076-.494-2.76-1.275 3.856-2.364 5.569-5.078 5.569-7.728 0-2.874-1.65-4.528-4.39-4.528-3.826 0-5.964 3.938-5.964 7.285 0 1.802.335 3.332.89 4.594-1.314.627-2.553 1.169-3.706 1.695-.1-3.444-.49-7.061-.786-10.397-2.035-.561-2.63.418-2.787 2.23-.36 4.135-1.892 6.7-3.246 6.7-1.02 0-1.641-1.24-1.716-2.557-.378-6.628 5.003-8.472 7.816-7.511.584-1.461-.057-2.514-2.595-2.514-3.08 0-5.381 1.87-7.068 4.27-1.127 1.6-2.427 2.735-4.156 4.108.044-.395.068-.79.068-1.178 0-4.674-2.533-6.725-4.951-6.725-2.001 0-3.258 1.2-3.988 3.04-.18-1.845-.547-2.642-1.62-2.642-.46 0-1.097.13-1.783.462.314 1.03.436 3.315.436 4.819 0 5.62-1.61 8.138-3.16 8.138-1.77 0-2.052-6.666-2.2-9.26a2.41 2.41 0 0 0-.868-.16c-1.601 0-1.81 2.152-2.205 4.13-.438 2.192-1.701 4.949-3.571 4.949-1.13 0-1.835-1.09-1.923-3.05-.184-3.973 3.122-8.682 8.295-7.217.678-1.583-.386-2.788-2.533-2.788-3.781 0-6.907 2.83-8.27 6.179-1.384 3.07-3.807 7.58-8.735 7.58-3.48 0-6.142-3.034-6.142-9.403 0-5.49 3.46-10.705 7.153-10.705 2.583 0 3.182 2.54 2.955 4.926 1.336 1.075 3.532.076 3.532-2.608 0-1.85-1.502-4.986-6.35-4.986C5.302.472 0 6.456 0 14.32c0 7.612 3.864 12.112 9.334 12.112 3.45 0 6.707-1.97 8.955-5.602.565 3.18 2.733 4.519 4.358 4.519 2.629 0 4.346-1.701 5.284-4.007.585 2.31 1.82 4.016 3.87 4.016 1.446 0 2.573-.731 3.422-1.906-.336 8.023-.762 13.138 3.979 12.13-.732-2.28-.966-6.433-.966-10.161 0-10.203 1.683-13.56 3.792-13.56 1.528 0 2.023 1.948 2.023 4.026 0 1.113-.106 2.392-.39 3.547C41.07 21.069 39 22.359 39 23.999c0 1.297.962 1.418 1.795 1.418 1.99 0 4.385-1.953 5.709-5.638 1.158-.7 2.318-1.503 3.429-2.596-.037.374-.06.75-.06 1.134 0 3.659 1.603 5.868 4.159 5.868 2.003 0 3.506-1.42 4.566-3.547.067 1.226.108 2.355.127 3.395-4.063 1.877-8.56 3.787-8.56 9.087 0 2.742 1.98 4.807 4.56 4.807 5.66 0 6.95-5.974 7.004-12.914 1.842-.8 3.215-1.416 4.799-2.198 1.354 1.694 3.194 2.544 4.883 2.544 3.195 0 5.593-1.693 7.52-5.125.342 2.612 1.019 5.125 2.407 5.125 2.533 0 3.045-13.24 4.929-13.24 1.442 0 .257 14.326 4.065 14.326 3.26 0 3.872-12.607 5.459-12.607 1.125 0 1.21 11.523 4.76 11.523 1.746 0 3.64-2.098 4.59-6.494.445 2.924 1.923 6.494 4.808 6.494 1.683 0 3.13-1.703 4.247-3.967.308 2.33.968 3.967 2.243 3.967 3.317 0 3.206-13.212 5.832-13.212 2.048 0 1.414 13.212 6.29 13.212 2.32 0 3.42-1.978 4.074-4.458.897 3.649 2.347 4.458 3.539 4.458.755 0 1.326-.266 2.074-1.158-3.77-1.636-3.453-7.588-3.453-11.433M54.962 35.456c-1.171 0-1.79-1.111-1.79-2.37 0-3.387 2.488-5.186 5.554-6.73-.14 7.407-1.861 9.1-3.764 9.1m15.23-24.01c1.14 0 1.793 1.047 1.68 2.553-.133 1.769-1.42 3.792-3.657 5.383-1.17-3.325-.3-7.936 1.978-7.936M106.316 6.438c1.087-.037 1.846-.97 1.85-2.08.004-1.11-.746-1.981-1.833-1.942-1.087.037-1.973.968-1.978 2.079-.005 1.11.873 1.98 1.961 1.943M133.338 7.001c.989-.035 1.796-.923 1.8-1.98.005-1.059-.794-1.887-1.785-1.852-.991.036-1.796.924-1.801 1.981-.004 1.058.796 1.887 1.786 1.851M170.072 15.793c-.081-4.187-2.074-7.72-5.145-10.54-2.332-2.13-5.103-3.747-8.008-4.965a28.877 28.877 0 0 0-.705-.287h-.001c-3.577 4.285-15.963 7.483-15.963 16.467 0 3.512 2.218 6.796 5.475 8.114 1.888.714 3.777.753 5.667.118 1.68-.552 3.062-1.594 4.211-2.864 3.638-4.022 5.118-10.26 9.581-10.26 4.084 0 4.634 2.907 4.895 4.481 0-.004-.002-.114-.007-.264" />
  </svg>
);

const DeloitteLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 24" fill="currentColor" {...props}>
    <text x="0" y="18" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" letterSpacing="-0.5">Deloitte</text>
    <circle cx="71" cy="18" r="2.5" fill="#86BC25" />
  </svg>
);

const hiringPartners = [
  { name: 'Amazon', logo: <FaAmazon className="h-6 w-auto max-w-full" /> },
  { name: 'Google', logo: <FaGoogle className="h-6 w-auto max-w-full" /> },
  { name: 'Microsoft', logo: <FaMicrosoft className="h-6 w-auto max-w-full" /> },
  { name: 'Capgemini', logo: <CapgeminiLogo className="h-4 sm:h-5 w-auto max-w-full" /> },
  { name: 'Cognizant', logo: <SiCognizant className="h-6 w-auto max-w-full" /> },
  { name: 'TCS', logo: <SiTcs className="h-6 w-auto max-w-full" /> },
  { name: 'Infosys', logo: <SiInfosys className="h-5 w-auto max-w-full" /> },
  { name: 'Deloitte', logo: <DeloitteLogo className="h-6 w-auto max-w-full" /> },
];

interface FooterProps {
  setActiveCourse?: (course: 'cdec' | 'xdsai') => void;
  openModal?: (course: 'cdec' | 'xdsai', purpose?: 'syllabus' | 'consultation' | 'quick') => void;
}

export default function Footer({ setActiveCourse, openModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, course: 'cdec' | 'xdsai', targetId: string) => {
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
      
      {/* 1. Hiring Partners Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-border-light text-center">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-text-muted mb-8">
          Our Graduates Work at Global Tech Leaders
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 sm:gap-10 items-center justify-items-center opacity-70">
          {hiringPartners.map((partner, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 transition-colors duration-300 select-none group w-full"
            >
              <div className="h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {partner.logo}
              </div>
              <span className="block text-[10px] font-semibold tracking-wider uppercase text-text-muted mt-2 group-hover:text-slate-700 transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

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
            <p>📍 corporate Office: Floor 4, Cyber Towers, Sector 62, Noida, UP, India</p>
            <p>✉ Email Support: admissions@cloudblitz.in</p>
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
                onClick={(e) => handleLinkClick(e, 'xdsai', 'hero')}
                className="hover:text-purple transition-colors"
              >
                Expert in AI (XDSAI)
              </a>
            </li>
            <li>
              <a 
                href="#syllabus" 
                onClick={(e) => handleLinkClick(e, 'xdsai', 'syllabus')}
                className="hover:text-purple transition-colors"
              >
                Syllabus Overview
              </a>
            </li>
            <li>
              <a 
                href="#placements" 
                onClick={(e) => handleLinkClick(e, 'xdsai', 'placements')}
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
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[11px] sm:text-xs text-text-medium font-medium">
            <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-coral rounded-full"></span> Pune (HQ)</span>
            <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-coral rounded-full"></span> Pune (Hinjewadi)</span>
            <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-coral rounded-full"></span> Pune (Kharadi)</span>
            <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-coral rounded-full"></span> Mumbai</span>
            <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-coral rounded-full"></span> Bangalore</span>
            <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-coral rounded-full"></span> Hyderabad</span>
            <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-coral rounded-full"></span> Delhi NCR</span>
            <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-coral rounded-full"></span> Chennai</span>
            <span className="flex items-center gap-1.5"><span className="h-1 w-1 bg-coral rounded-full"></span> Kolkata</span>
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
