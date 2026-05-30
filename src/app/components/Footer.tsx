'use client';

import React from 'react';
import Image from 'next/image';
import logoImg from '../assets/logo.webp';

interface FooterProps {
  setActiveCourse?: (course: 'cdec' | 'X-DSAAI') => void;
  openModal?: (course: 'cdec' | 'X-DSAAI', purpose?: 'syllabus' | 'consultation' | 'quick') => void;
}

type CampusBranch = {
  name: string;
  mapsUrl?: string;
  isSoon?: boolean;
};

const CAMPUS_BRANCHES: CampusBranch[] = [
  {
    name: 'Indore',
    mapsUrl:
      'https://www.google.com/maps/place/CloudBlitz/@22.6971787,75.8648668,17z/data=!3m1!4b1!4m6!3m5!1s0x3962fd2d5d0e8799:0x4ef3aad5473410b0!8m2!3d22.6971787!4d75.8648668!16s%2Fg%2F11k48n_vfw?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'Kothrud, Pune',
    mapsUrl:
      'https://www.google.com/maps/place/Second+Floor,+CloudBlitz,+Kalpavruksha+Building,+Mayur+Colony,+Kothrud,+Pune,+Maharashtra+411038/data=!4m2!3m1!1s0x3bc2bf52ddca9669:0xd4da49f26f3a0565?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBjI1LjUuMhgAINeCAyp-LDk0MjU1NDQzLDk0MjQyNTgzLDk0MjIzMjk5LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjEyNjY1LDk0MjA3Mzk0LDk0MjA3NTA2LDk0MjA4NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDk0MjI5ODM5LDQ3MDg0MzkzLDk0MjEzMjAwQgJJTg%3D%3D&skid=176664ed-587c-4366-9be1-3c1def023a42',
  },
  {
    name: 'Wakad, Pune',
    mapsUrl:
      'https://www.google.com/maps/place/CloudBlitz+~+Wakad+Pune/@18.5920408,73.7546079,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b9973e8f2fef:0xa002c203d8c79740!8m2!3d18.5920408!4d73.7571828!16s%2Fg%2F11l5ftrrhc?entry=tts',
  },
  {
    name: 'Nagpur',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=CloudBlitz+Nagpur+Pratap+Nagar+Ring+Road',
  },
  {
    name: 'Nashik',
    mapsUrl:
      'https://www.google.com/maps/place/CloudBlitz/@20.0047601,73.7664138,17z/data=!4m6!3m5!1s0x3bddeb12b5109fad:0x3376a6815efbbc30!8m2!3d20.0047601!4d73.7689887!16s%2Fg%2F11xn9g3jq1?entry=tts&g_ep=EgoyMDI1MDcwOS4wIPu8ASoASAFQAw%3D%3D&skid=24d7bb70-37f8-462f-b4a8-73ae9a3abb44',
  },
  {
    name: 'Kharadi, Pune',
    mapsUrl:
      'https://www.google.com/maps/place/CloudBlitz/@18.5612539,73.9417357,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c3c713d8fbf3:0xfc791165040102ff!8m2!3d18.5612539!4d73.9443106!16s%2Fg%2F11yk37rtkr?entry=tts&g_ep=EgoyMDI1MDkxMC4wIPu8ASoASAFQAw%3D%3D&skid=5de34393-828c-4320-a970-2fd36c72d076',
  },
  {
    name: 'Chakan, Pune',
    mapsUrl:
      'https://www.google.com/maps?q=18.7593690,73.8585210&entry=gps&lucs=,94297699,94275415,94284490,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyOTc2OTksOTQyNzU0MTUsOTQyODQ0OTAsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAklO&skid=27fe308e-f91f-4d0e-860e-09a01c82e973&g_st=ic',
  },
  {
    name: 'Amravati',
    mapsUrl:
      'https://www.google.com/maps?q=20.9203830,77.7565310&entry=gps&lucs=,94297699,94275415,94284490,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyOTc2OTksOTQyNzU0MTUsOTQyODQ0OTAsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAklO&skid=aca7a412-ad11-4d84-8c55-4f9c7731bb9a&g_st=ic',
  },
  { name: 'Sambhaji Nagar', isSoon: true },
];

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
            {CAMPUS_BRANCHES.map((campus) =>
              campus.isSoon || !campus.mapsUrl ? (
                <span
                  key={campus.name}
                  className="flex cursor-default items-center gap-1.5 opacity-70"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1 truncate">
                    {campus.name}
                    <span className="mt-0.5 rounded bg-amber-100 px-1 py-0.5 text-[8px] font-black leading-none tracking-wider text-amber-700">
                      SOON
                    </span>
                  </span>
                </span>
              ) : (
                <a
                  key={campus.name}
                  href={campus.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${campus.name} location in a new tab`}
                  className="group flex cursor-pointer items-center gap-1.5 transition-colors hover:text-coral"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral transition-colors group-hover:bg-coral" />
                  <span className="truncate">{campus.name}</span>
                </a>
              ),
            )}
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
