'use client';

import React, { useState, useEffect } from 'react';
import { CourseType } from '../types';
import HeroLeadForm from './HeroLeadForm';

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
  setActiveCourse,
  openModal,
  cdecBatch,
  cdecSeats,
  XDSAAIBatch,
  XDSAAISeats
}: HeroProps) {
  // Simulated logs state for DevOps console
  const [devopsLogs, setDevopsLogs] = useState<string[]>([]);
  // Simulated logs state for Data Science console
  const [dsLogs, setDsLogs] = useState<string[]>([]);
  // Dynamic metrics stats to animate
  const [accuracyValue, setAccuracyValue] = useState(0);

  const renderHeading = (text: string, isCdec: boolean) => {
    const keyword = isCdec ? "Cloud & DevOps" : "Data Science & AI";
    if (text.includes(keyword)) {
      const parts = text.split(keyword);
      return (
        <>
          {parts[0]}
          <span className={`relative inline-block ${isCdec ? 'hero-keyword-coral' : 'hero-keyword-purple'}`}>
            <span className={isCdec ? 'text-gradient-coral font-black' : 'text-gradient-purple font-black'}>
              {keyword}
            </span>
            <span className={`absolute -bottom-1 left-0 right-0 h-[3px] rounded-full ${isCdec ? 'bg-gradient-to-r from-coral to-orange-400' : 'bg-gradient-to-r from-purple to-pink-400'} opacity-60`} />
          </span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  // DevOps simulated terminal log loop
  useEffect(() => {
    if (activeCourse !== 'cdec') return;

    const logsList = [
      'cloudblitz-engine v1.8.4 starting pipeline...',
      '$ terraform init && terraform apply -auto-approve',
      '⟲ Initializing AWS and Azure cloud providers...',
      '✓ AWS Virtual Private Cloud (VPC) & subnets configured.',
      '✓ Security groups and RDS database instances established.',
      '$ docker build -t web-app:latest . && docker push',
      '✓ Containerizing application: Multi-stage Docker build success.',
      '✓ Pushing container image to secure cloud registry...',
      '$ kubectl apply -f k8s/deployment.yaml',
      '✓ Standardizing cluster scale: 5 active replicas requested.',
      '⟲ Spinning up Kubernetes pods... [Pod 1-5 STATUS: Running]',
      '✓ Ingress controller routing active on standard HTTP/S.',
      '✓ Datadog observability agents: Connected & streaming logs.',
      '✓ pipeline-deploy: PIPELINE COMPLETE [SUCCESS]'
    ];

    setDevopsLogs([]);
    let logIndex = 0;

    const interval = setInterval(() => {
      if (logIndex < logsList.length) {
        const nextLog = logsList[logIndex];
        if (nextLog !== undefined) {
          setDevopsLogs((prev) => [...prev, nextLog]);
        }
        logIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1400);

    return () => clearInterval(interval);
  }, [activeCourse]);

  // Data Science simulated terminal log loop + metric animator
  useEffect(() => {
    if (activeCourse !== 'X-DSAAI') return;

    const logsList = [
      'cloudblitz-ai-sandbox v2.0.1 loading components...',
      '$ python train_model.py --epochs 50 --lr 0.001',
      '⟲ Loading train dataset: 1,250,000 feature arrays...',
      '⟲ Initializing weight distributions & deep tensor matrices...',
      '↳ Epoch 10/50: loss: 0.284 | accuracy: 89.15%',
      '↳ Epoch 20/50: loss: 0.142 | accuracy: 93.88%',
      '↳ Epoch 30/50: loss: 0.076 | accuracy: 96.02%',
      '↳ Epoch 40/50: loss: 0.038 | accuracy: 97.41%',
      '↳ Epoch 50/50: loss: 0.012 | accuracy: 98.42%',
      '✓ Model convergence achieved. Optimizers completed training.',
      '$ python evaluate.py --model_weights=weights.pt',
      '✓ Evaluation Metrics: Precision: 97.8% | Recall: 98.1%',
      '✓ Model weights exported. AI API service ready in cloud sandbox.'
    ];

    setDsLogs([]);
    setAccuracyValue(0);
    let logIndex = 0;

    // Animate radial accuracy chart to 98%
    const accuracyTimer = setTimeout(() => {
      setAccuracyValue(98);
    }, 300);

    const logInterval = setInterval(() => {
      if (logIndex < logsList.length) {
        const nextLog = logsList[logIndex];
        if (nextLog !== undefined) {
          setDsLogs((prev) => [...prev, nextLog]);
        }
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 1500);

    return () => {
      clearTimeout(accuracyTimer);
      clearInterval(logInterval);
    };
  }, [activeCourse]);

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-bg-main bg-dot-pattern pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">

      {/* Decorative Shifting Background Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[40%] w-[50%] rounded-full bg-gradient-to-br from-coral/12 to-pink-500/5 blur-[130px] animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] -z-10 h-[50%] w-[55%] rounded-full bg-gradient-to-tr from-purple/12 to-indigo-500/5 blur-[150px] animate-pulse-glow" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Urgent High-Converting Scarcity Banner */}
        {/* <div className="w-full flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-coral/15 bg-coral/5 px-4 py-1.5 text-xs font-bold text-coral animate-bounce-subtle">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-coral"></span>
            </span>
            <span className="uppercase tracking-wider text-[10px] sm:text-[11px] font-black">
              ⏳ Limited Cohort Capacity • Only 8 Seats Remaining in May Batch
            </span>
          </div>
        </div> */}



        {/* Layout Grid: Left Content, Right Live Workspace Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Headings, trust bullets & premium CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 sm:space-y-8">

            {/* Live Program Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-text-dark border border-slate-200/60 shadow-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase tracking-widest text-[9px] font-black text-text-muted">Interactive Classroom to Corporate Track</span>
            </div>

            {/* Dynamic Bolder Headings */}
            <div className="space-y-4">
              {activeCourse === 'cdec' ? (
                <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-black tracking-[-0.02em] text-text-dark leading-[1.08]">
                  Become a{' '}
                  <span className="relative inline-block">
                    <span className="text-coral font-black">Production-Ready</span>
                    <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-coral to-orange-400 opacity-60" />
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  Cloud DevOps Engineer.
                </h1>
              ) : (
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-[-0.02em] text-text-dark leading-[1.08]">
                  Become an{' '}
                  <span className="relative inline-block">
                    <span className="text-purple font-black">Industry-Ready</span>
                    <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-purple to-pink-400 opacity-60" />
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  Data Scientist &amp; AI Expert.
                </h1>
              )}

              {/* Dynamic Description Paragraph */}
              <p className="max-w-2xl text-base sm:text-lg text-text-medium leading-relaxed font-semibold">
                {activeCourse === 'cdec'
                  ? "Gain hands-on expertise in AWS, Azure, Docker, Kubernetes, Terraform, Jenkins, and Git. Learn real pipelines, automated testing, and secure infrastructure deployment under professional guidance with 100% placement support."
                  : "Master Python, SQL, statistics, machine learning, deep learning, and AI-driven analytics. Gain high-demand expertise in Tableau, Power BI, Hadoop, Spark, R-Programming, and cloud platforms like AWS and Google Cloud through hands-on projects."
                }
              </p>
            </div>

            {/* Trust and Key Value Bullets */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-text-dark">Live Interactive Mentorship</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-text-dark">20+ Production Capstone Projects</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-text-dark">Assured Placement Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-text-dark">Global Professional Certification</span>
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
                <span className={`block text-[9.5px] font-black uppercase tracking-widest leading-none mb-1 ${activeCourse === 'cdec' ? 'text-coral' : 'text-purple'
                  }`}>
                  Live Interactive Cohort Schedule
                </span>
                <span className="block text-sm sm:text-base font-extrabold text-text-dark tracking-tight leading-tight">
                  Next Batch Starts: <span className={activeCourse === 'cdec' ? 'text-gradient-coral font-black' : 'text-gradient-purple font-black'}>
                    {activeCourse === 'cdec' ? (cdecBatch || 'May 25, 2026') : (XDSAAIBatch || 'May 26, 2026')}
                  </span>
                </span>
              </div>

              {/* Scarcity / Seats Remaining indicator */}
              <div className="hidden sm:flex flex-col items-end text-right justify-center gap-0.5 pl-4 shrink-0 border-l border-slate-200/80">
                <span className="text-[9.5px] font-extrabold uppercase text-text-muted tracking-wider leading-none">Seats Left</span>
                <span className={`text-base font-black animate-pulse ${activeCourse === 'cdec' ? 'text-coral' : 'text-purple'
                  }`}>
                  {activeCourse === 'cdec' ? (cdecSeats || '04 / 20') : (XDSAAISeats || '06 / 20')}
                </span>
              </div>
            </div>

            {/* High-Converting CTA Widget */}
            <div className="w-full flex flex-col sm:flex-row gap-4 pt-2">

              {/* Primary Pulsing CTA */}
              <button
                onClick={() => openModal(activeCourse, 'consultation')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand text-white font-black text-sm px-8 py-4.5 shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${activeCourse === 'cdec' ? 'shadow-coral/25 shadow-glow-coral' : 'shadow-purple/25 shadow-glow-purple'
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
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 hover:border-slate-800 bg-white hover:bg-slate-50 text-text-dark font-black text-sm px-6 py-4.5 transition-all cursor-pointer active:scale-95 shadow-sm"
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
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full px-2 gap-4">

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
          <div className="glass-card rounded-3xl p-5 border border-white/20 hover:-translate-y-1.5 hover:border-coral/20 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-coral/10 text-coral flex items-center justify-center shrink-0">
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-text-dark">15 LPA</h3>
            </div>
            <span className="block text-xs font-bold text-text-muted uppercase tracking-wider">Highest Placement Package</span>
            <span className="block text-[10px] text-text-medium mt-1">Direct corporate references & interviews</span>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-3xl p-5 border border-white/20 hover:-translate-y-1.5 hover:border-purple/20 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-purple/10 text-purple flex items-center justify-center shrink-0">
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-text-dark">400+</h3>
            </div>
            <span className="block text-xs font-bold text-text-muted uppercase tracking-wider">Hiring Partner Companies</span>
            <span className="block text-[10px] text-text-medium mt-1">Exclusive technical placement pool</span>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-3xl p-5 border border-white/20 hover:-translate-y-1.5 hover:border-emerald-500/20 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-text-dark">20+</h3>
            </div>
            <span className="block text-xs font-bold text-text-muted uppercase tracking-wider">Capstone Architecture Labs</span>
            <span className="block text-[10px] text-text-medium mt-1">Build live corporate portfolio sites</span>
          </div>

          {/* Card 4 */}
          <div className="glass-card rounded-3xl p-5 border border-white/20 hover:-translate-y-1.5 hover:border-blue-500/20 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-text-dark">1:1</h3>
            </div>
            <span className="block text-xs font-bold text-text-muted uppercase tracking-wider">Expert Mentorship & Mock Grids</span>
            <span className="block text-[10px] text-text-medium mt-1">Clear technical barriers in real-time</span>
          </div>

        </div>

        {/* Corporate Trust Badge / Placement Marquee Footer */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-slate-200/60 overflow-hidden text-center space-y-5">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-text-muted">
            Our Graduates Work At High-Growth Organizations Globally
          </span>

          {/* Infinite Moving Logo Cloud */}
          <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 before:bg-gradient-to-r before:from-bg-main before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 after:bg-gradient-to-l after:from-bg-main after:to-transparent">

            <div className="animate-scroll-left hover:pause-scroll-on-hover py-3 flex items-center gap-14 sm:gap-20">

              {/* Duplicate set of SVG monochrome logos for continuous loop */}
              {[1, 2].map((loop) => (
                <React.Fragment key={loop}>

                  {/* Google — clean wordmark SVG */}
                  <div className="text-slate-400 hover:text-slate-900 transition-colors shrink-0">
                    <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 74 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24zm17.96-.07c-3.04 0-5.52 2.31-5.52 5.5 0 3.16 2.48 5.5 5.52 5.5s5.52-2.34 5.52-5.5c0-3.19-2.48-5.5-5.52-5.5zm0 8.83c-1.67 0-3.11-1.38-3.11-3.33 0-1.97 1.44-3.33 3.11-3.33s3.11 1.36 3.11 3.33c0 1.95-1.44 3.33-3.11 3.33zm12.04-8.83c-3.04 0-5.52 2.31-5.52 5.5 0 3.16 2.48 5.5 5.52 5.5s5.52-2.34 5.52-5.5c0-3.19-2.48-5.5-5.52-5.5zm0 8.83c-1.67 0-3.11-1.38-3.11-3.33 0-1.97 1.44-3.33 3.11-3.33s3.11 1.36 3.11 3.33c0 1.95-1.44 3.33-3.11 3.33zm11.68-8.44v.87h-.09c-.58-.69-1.69-1.32-3.09-1.32-2.93 0-5.61 2.57-5.61 5.52 0 2.93 2.68 5.48 5.61 5.48 1.4 0 2.51-.63 3.09-1.34h.09v.85c0 2.11-1.13 3.24-2.95 3.24-1.49 0-2.41-1.07-2.79-1.97l-2.12.88c.61 1.47 2.22 3.27 4.91 3.27 2.85 0 5.27-1.68 5.27-5.77V8.51h-2.32zm-2.95 8.44c-1.67 0-2.86-1.4-2.86-3.33 0-1.95 1.19-3.33 2.86-3.33 1.64 0 2.95 1.4 2.95 3.35 0 1.93-1.31 3.31-2.95 3.31zm7.63-16.5h2.41v18h-2.41V.45zm9.32 14.22l1.87-1.26c.52.82 1.26 1.38 2.57 1.38 1.13 0 1.73-.56 1.73-1.33 0-.92-.7-1.25-1.88-1.78l-.65-.28c-1.87-.8-3.11-1.8-3.11-3.91 0-1.95 1.49-3.44 3.8-3.44 1.65 0 2.84.58 3.69 2.09l-1.8 1.15c-.44-.79-1.02-1.1-1.88-1.1-.86 0-1.4.54-1.4 1.24 0 .87.54 1.22 1.78 1.75l.65.28c2.2.94 3.44 1.9 3.44 4.06 0 2.32-1.82 3.62-4.27 3.62-2.39 0-3.94-1.14-4.54-2.47z" />
                    </svg>
                  </div>

                  {/* Microsoft */}
                  <div className="text-slate-400 hover:text-slate-900 transition-colors shrink-0 flex items-center gap-2">
                    <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <rect width="11" height="11" />
                      <rect x="12" width="11" height="11" />
                      <rect y="12" width="11" height="11" />
                      <rect x="12" y="12" width="11" height="11" />
                    </svg>
                    <span className="font-sans font-black tracking-tight text-base sm:text-lg">Microsoft</span>
                  </div>

                  {/* Amazon */}
                  <div className="text-slate-400 hover:text-slate-900 transition-colors shrink-0 flex flex-col items-center justify-center leading-none">
                    <span className="font-sans font-black tracking-tighter text-sm sm:text-base">amazon</span>
                    <svg className="h-2 w-14 sm:w-16" viewBox="0 0 78 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 12.5 C10 16, 25 17.5, 45 13.5 C60 10.5, 71 4.5, 75 1.5 C77 0.5, 75.5 -1, 74 0 C67.5 4, 53.5 10.5, 34 11 C18 11.5, 6.5 7, 2 5.5 C1.2 5.3, 0.5 6, 0.8 6.8 C1.1 7.5, 1.2 8, 1.5 12.5 Z" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Accenture */}
                  <div className="text-slate-400 hover:text-slate-900 transition-colors shrink-0 flex items-center gap-1">
                    <span className="font-sans font-black tracking-tight text-sm sm:text-base">accenture</span>
                    <span className="text-coral font-black text-base sm:text-lg">{`>`}</span>
                  </div>

                  {/* TCS */}
                  <div className="text-slate-400 hover:text-slate-900 transition-colors shrink-0">
                    <span className="font-sans font-black tracking-widest text-sm sm:text-base uppercase">tata consultancy services</span>
                  </div>

                  {/* AWS — clean full wordmark SVG */}
                  <div className="text-slate-400 hover:text-slate-900 transition-colors shrink-0">
                    <svg className="h-6 sm:h-7 w-auto" viewBox="0 0 60 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      {/* "AWS" full wordmark — 3 letter-paths: A, W, S */}
                      <path d="M10.01 6.48 6.44 17.52H8.9l.84-2.72h3.78l.84 2.72h2.46L12.57 6.48h-2.56zm-.47 6.48 1.26-4.03h.08l1.23 4.03H9.54zM23.08 6.48l-2.04 8.11h-.06l-2.06-8.11H16.2l2.99 11.04h2.46l2.05-8.32h.07l2.05 8.32h2.46l3-11.04h-2.72l-2.06 8.11h-.06l-2.05-8.11h-2.31zM36.59 11.56c-.38-.18-1.02-.36-1.91-.54-.81-.17-1.35-.34-1.61-.52-.26-.17-.39-.41-.39-.71 0-.29.12-.53.36-.71.24-.18.59-.27 1.06-.27.5 0 .9.11 1.19.33.29.22.46.52.51.91h2.33c-.07-.93-.43-1.67-1.08-2.2-.65-.54-1.54-.81-2.66-.81-1.13 0-2.02.28-2.67.83-.65.55-.97 1.26-.97 2.13 0 .7.2 1.26.6 1.68.4.42 1.07.75 2.01.99.47.12.84.22 1.11.31.27.09.49.2.66.34.17.14.26.33.26.57 0 .32-.14.58-.41.77-.27.19-.66.29-1.17.29-.55 0-.99-.13-1.3-.38-.31-.25-.5-.61-.56-1.06H29.6c.07 1 .46 1.77 1.15 2.32.69.54 1.63.81 2.82.81 1.2 0 2.14-.29 2.82-.87.68-.58 1.02-1.34 1.02-2.28 0-.73-.21-1.33-.62-1.79-.14-.17-.12-.18-.2-.22v.02z" />
                    </svg>
                  </div>

                </React.Fragment>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
