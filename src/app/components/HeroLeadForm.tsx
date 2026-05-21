'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CourseType } from '../types';

interface HeroLeadFormProps {
  activeCourse: CourseType;
}

const COUNTRIES = [
  { code: '+91', country: 'IN', flag: 'in', name: 'India' },
  { code: '+1', country: 'US', flag: 'us', name: 'United States' },
  { code: '+44', country: 'GB', flag: 'gb', name: 'United Kingdom' },
  { code: '+971', country: 'AE', flag: 'ae', name: 'United Arab Emirates' },
  { code: '+61', country: 'AU', flag: 'au', name: 'Australia' },
  { code: '+65', country: 'SG', flag: 'sg', name: 'Singapore' },
  { code: '+49', country: 'DE', flag: 'de', name: 'Germany' }
];

export default function HeroLeadForm({ activeCourse }: HeroLeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('fresher');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close country dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const selectedCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Full Name is required';

    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  const themeClass = activeCourse === 'cdec' ? 'border-coral/20 shadow-glow-coral' : 'border-purple/20 shadow-glow-purple';
  const primaryColor = activeCourse === 'cdec' ? 'text-coral' : 'text-purple';

  return (
    <div className={`relative w-full max-w-[480px] rounded-3xl border bg-white p-6 sm:p-8 shadow-2xl transition-all duration-500 ${themeClass}`}>
      {/* Decorative gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 w-full bg-gradient-brand rounded-t-3xl" />

      {!success ? (
        <>
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-text-dark tracking-tight leading-snug">
              Kickstart Your Tech Career
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-text-muted leading-relaxed font-semibold">
              Fill the form below to lock in your free 1-on-1 expert mentorship session with our senior tech advisors.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11.5px] font-bold uppercase tracking-wider text-text-medium mb-1">
                Full Name <span className={`${primaryColor} font-bold`}>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amit Sharma"
                className={`w-full rounded-2xl border ${errors.name ? 'border-red-500 bg-red-500/5' : 'border-border-light bg-slate-50/50'} px-4 py-2.5 text-sm text-text-dark outline-none focus:${activeCourse === 'cdec' ? 'border-coral focus:ring-coral/20' : 'border-purple focus:ring-purple/20'} focus:ring-2 transition-all`}
              />
              {errors.name && <p className="mt-1 text-xs font-medium text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-[11.5px] font-bold uppercase tracking-wider text-text-medium mb-1">
                Email Address <span className="text-text-muted text-[10px] font-normal lowercase">(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full rounded-2xl border ${errors.email ? 'border-red-500 bg-red-500/5' : 'border-border-light bg-slate-50/50'} px-4 py-2.5 text-sm text-text-dark outline-none focus:${activeCourse === 'cdec' ? 'border-coral focus:ring-coral/20' : 'border-purple focus:ring-purple/20'} focus:ring-2 transition-all`}
              />
              {errors.email && <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[11.5px] font-bold uppercase tracking-wider text-text-medium mb-1">
                Phone Number <span className={`${primaryColor} font-bold`}>*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative shrink-0 w-[105px]" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`w-full rounded-2xl border border-border-light bg-slate-50/50 px-3 py-2.5 text-sm text-text-dark outline-none focus:${activeCourse === 'cdec' ? 'border-coral focus:ring-coral/20' : 'border-purple focus:ring-purple/20'} focus:ring-2 transition-all flex items-center justify-between font-semibold hover:bg-slate-100/50 cursor-pointer`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <img
                        src={`https://flagcdn.com/w40/${selectedCountry.flag}.png`}
                        alt={`${selectedCountry.name} flag`}
                        className="h-3.5 w-5 object-cover rounded-[2px] shadow-sm shrink-0 border border-slate-200"
                      />
                      <span className="truncate">{selectedCountry.code}</span>
                    </div>
                    <svg className={`h-3 w-3 text-text-muted transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute left-0 mt-1 w-64 rounded-2xl border border-border-light bg-white py-1 shadow-xl z-50 animate-scale-up max-h-40 overflow-y-auto">
                      {COUNTRIES.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setCountryCode(c.code);
                            setDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2.5 text-left text-xs text-text-dark hover:bg-slate-50 flex items-center justify-between transition-colors duration-150 cursor-pointer ${countryCode === c.code ? (activeCourse === 'cdec' ? 'bg-coral/5 text-coral font-semibold' : 'bg-purple/5 text-purple font-semibold') : 'font-medium'
                            }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <img
                              src={`https://flagcdn.com/w40/${c.flag}.png`}
                              alt={`${c.name} flag`}
                              className="h-3.5 w-5 object-cover rounded-[2px] shadow-sm shrink-0 border border-slate-200"
                            />
                            <span className="truncate">{c.name}</span>
                          </div>
                          <span className={countryCode === c.code ? (activeCourse === 'cdec' ? 'text-coral' : 'text-purple') : 'text-text-muted'}>
                            {c.code}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) setPhone(val);
                  }}
                  placeholder="10-digit number"
                  className={`flex-1 min-w-0 rounded-2xl border ${errors.phone ? 'border-red-500 bg-red-500/5' : 'border-border-light bg-slate-50/50'} px-4 py-2.5 text-sm text-text-dark outline-none focus:${activeCourse === 'cdec' ? 'border-coral focus:ring-coral/20' : 'border-purple focus:ring-purple/20'} focus:ring-2 transition-all font-mono tracking-wider`}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs font-medium text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-[11.5px] font-bold uppercase tracking-wider text-text-medium mb-1">
                Selected Course
              </label>
              <div className={`flex items-center gap-3 p-3 rounded-2xl border ${activeCourse === 'cdec'
                ? 'border-coral/20 bg-coral/5 text-coral'
                : 'border-purple/20 bg-purple/5 text-purple'
                }`}>
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-[11px] shrink-0 shadow-sm ${activeCourse === 'cdec' ? 'bg-gradient-to-br from-coral to-pink-500 text-white' : 'bg-gradient-to-br from-purple to-indigo-600 text-white'
                  }`}>
                  {activeCourse === 'cdec' ? 'CB' : 'DS'}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-bold truncate leading-tight text-text-dark">
                    {activeCourse === 'cdec' ? 'Cloud DevOps Engineering (CDEC)' : 'Expert in Data Science & AI (XDSAI)'}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-brand py-3.5 text-base font-black text-white shadow-lg shadow-coral/20 hover:shadow-coral/35 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Download Syllabus & Proceed</span>
                  <svg className="h-4.5 w-4.5 animate-bounce-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 animate-scale-up">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-text-dark tracking-tight">Application Received!</h3>
          <p className="mt-3 text-sm text-text-muted max-w-sm leading-relaxed">
            Congratulations <strong>{name}</strong>! Your inquiry for <strong>{activeCourse === 'cdec' ? 'Cloud DevOps (CDEC)' : 'Data Science & AI (XDSAI)'}</strong> is confirmed. An expert counselor will contact you shortly.
          </p>
        </div>
      )}
    </div>
  );
}
