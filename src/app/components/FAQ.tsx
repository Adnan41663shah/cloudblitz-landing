'use client';

import React, { useState, useEffect } from 'react';
import { FAQItem } from '../types';

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'Who is eligible to join these courses? Do I need a technical coding background?',
    answer: 'Our programs are engineered to support both beginners and intermediate developers. While prior programming exposure is helpful, it is NOT mandatory. The curriculums commence with standard fundamentals (Linux basics for DevOps, Python scripting for Data Science) before transitioning to production-level scaling.',
    category: 'general'
  },
  {
    id: 2,
    question: 'How does the placement support system work? Is there a placement assurance?',
    answer: 'We deliver comprehensive career acceleration services: resume optimization, portfolio design, LinkedIn profile audits, and dedicated weekly technical mock interviews. You also gain direct access to our exclusive network of over 400+ corporate hiring partners who prioritize interviewing our students.',
    category: 'placement'
  },
  {
    id: 3,
    question: 'What is the schedule of the live classes? Can I balance it with a full-time job?',
    answer: 'Absolutely. Over 70% of our active batches consist of working professionals. Classes are organized on weekends (Saturdays and Sundays) or late evenings on weekdays. All classes are live and interactive, and recorded high-definition sessions are published to your learning dashboard within 3 hours.',
    category: 'curriculum'
  },
  {
    id: 4,
    question: 'Are there options for zero-interest EMI financing or discount scholarships?',
    answer: 'Yes! We support the learner community by offering up to 27% scholarship discount options for registrations locked during active promotional campaigns. Zero-interest monthly installment plans (EMIs) spanning 6, 9, or 12 months are available through our leading financial partners.',
    category: 'pricing'
  },
  {
    id: 5,
    question: 'Do I work on realistic industrial projects? What will be on my resume?',
    answer: 'Yes. Our curriculums contain extensive capstone implementations mimicking enterprise architectures. You will deploy multi-region configurations, automate pipelines (CI/CD) on live instances for CDEC, or train transformers, configure RAG vector models, and launch dashboards for X-DSAAI.',
    category: 'curriculum'
  },
  {
    id: 6,
    question: 'Is the course certificate globally accredited and verified?',
    answer: 'Yes, upon successful completion of the capstone validation benchmarks and mock interview checks, you will receive a verifiable digital credential with unique identifiers that can be easily embedded in your LinkedIn profile, showing complete project alignment.',
    category: 'general'
  }
];

interface FAQProps {
  customFaqItems?: FAQItem[];
}

export default function FAQ({ customFaqItems }: FAQProps) {
  const [activeCategory, setActiveCategory] = useState<'general' | 'placement' | 'curriculum' | 'pricing'>('general');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    { id: 'general', label: 'Eligibility & General' },
    { id: 'placement', label: 'Placements & Careers' },
    { id: 'curriculum', label: 'Curriculum & Format' },
    { id: 'pricing', label: 'EMI & Scholarships' }
  ];

  const currentFaqItems = customFaqItems || faqItems;
  const filteredFAQs = currentFaqItems.filter((faq) => faq.category === activeCategory);

  // Auto-expand first item in current category when filtered list changes
  useEffect(() => {
    if (filteredFAQs.length > 0 && expandedFAQ === null) {
      setExpandedFAQ(filteredFAQs[0].id);
    }
  }, [filteredFAQs, expandedFAQ]);

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <section id="faq" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark tracking-tight">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <p className="text-sm sm:text-base text-text-muted">
          Got questions? We have compiled responses to help you understand batch eligibility, schedules, placement procedures, and pricing policies.
        </p>
      </div>

      {/* Tabs list & Accordions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Categories Navigation */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 shrink-0 select-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as any);
                setExpandedFAQ(null);
              }}
              className={`flex-1 shrink-0 lg:shrink-1 text-left px-5 py-4 rounded-2xl border text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition-all ${activeCategory === cat.id ? 'border-coral bg-coral/5 text-coral shadow-sm' : 'border-border-light bg-transparent text-text-medium hover:border-slate-300'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordions list */}
        <div className="lg:col-span-8 space-y-4">
          {filteredFAQs.map((faq) => {
            const isExpanded = expandedFAQ === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${isExpanded ? 'border-purple bg-white shadow-md' : 'border-border-light bg-white/40 hover:bg-white'}`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left outline-none font-bold text-xs sm:text-sm text-text-dark"
                  aria-expanded={isExpanded}
                >
                  <span className="pr-4 leading-relaxed">{faq.question}</span>
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${isExpanded ? 'border-purple bg-purple text-white rotate-180' : 'border-border-light text-text-muted bg-white'}`}>
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-border-light bg-slate-50/50 rounded-b-2xl">
                    <p className="text-xs sm:text-sm font-medium text-text-medium leading-relaxed mt-3">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
