'use client';

import React, { useState } from 'react';
import { CourseType, ModalPurpose } from '../types';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse: CourseType;
  purpose?: ModalPurpose;
  promoText?: string;
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

export default function LeadFormModal({ isOpen, onClose, preselectedCourse, purpose = 'consultation', promoText }: LeadFormModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('fresher');
  const [course, setCourse] = useState<CourseType>(preselectedCourse);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Sync state with preselected course when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCourse(preselectedCourse);
      setSuccess(false);
      setName('');
      setEmail('');
      setPhone('');
      setCountryCode('+91');
      setExperience('fresher');
      setDropdownOpen(false);
      setErrors({});
    }
  }, [isOpen, preselectedCourse]);

  // Click outside to close country dropdown
  React.useEffect(() => {
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

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Full Name is required';

    // Email is optional: validate only if user entered some value
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

    // Determine customized content based on 'purpose' trigger mode
    let headingText = "Kickstart Your Tech Career";
    let descriptionText = "Fill the form to download the program syllabus, lock in active rewards, and book a 1-on-1 career call.";
    let submitButtonText = "Download Syllabus";
    let successContent = (
      <p className="mt-3 text-sm sm:text-base text-text-muted max-w-md leading-relaxed">
        Congratulations <strong>{name}</strong>! Your program enrollment inquiry for <strong>{course === 'cdec' ? 'Cloud DevOps (CDEC)' : 'Data Science & AI (XDSAI)'}</strong> has been provisioned.
      </p>
    );
  
    if (purpose === 'consultation') {
      headingText = "Book Free Career Consultation";
      descriptionText = "Fill the form below to lock in your free 1-on-1 expert mentorship session with our senior tech advisors.";
      submitButtonText = "Confirm Consultation Slot";
      successContent = (
        <p className="mt-3 text-sm sm:text-base text-text-muted max-w-md leading-relaxed">
          Congratulations <strong>{name}</strong>! Your free 1-on-1 career consultation slot has been reserved. One of our senior advisors will call you shortly.
        </p>
      );
    } else if (purpose === 'quick') {
      headingText = "Get Quick Assistance";
      descriptionText = "Have questions? Fill the form below to request callback assistance and get detailed program info.";
      submitButtonText = "Request Callback";
      successContent = (
        <p className="mt-3 text-sm sm:text-base text-text-muted max-w-md leading-relaxed">
          Congratulations <strong>{name}</strong>! Your callback request is received. Our academic coordinator will reach out to you within 30 minutes during working hours.
        </p>
      );
    } else if (purpose === 'syllabus') {
      headingText = "Download Detailed Syllabus";
      descriptionText = "Fill the form below to receive the complete, industry-vetted program curriculum and unlock cohort details.";
      submitButtonText = "Download Syllabus";
      successContent = (
        <p className="mt-3 text-sm sm:text-base text-text-muted max-w-md leading-relaxed">
          Congratulations <strong>{name}</strong>! Your detailed syllabus download link has been sent to your email.
        </p>
      );
    } else if (purpose === 'offer') {
      headingText = "Avail Special Promotion";
      descriptionText = "Register below to secure the current active promotional offer and claim your free 1-on-1 industry mock interviews.";
      submitButtonText = "Avail Promotional Offer Now";
      successContent = (
        <p className="mt-3 text-sm sm:text-base text-text-muted max-w-md leading-relaxed">
          Congratulations <strong>{name}</strong>! Your exclusive slot is locked in. The active promotional offer has been secured: <strong className="text-coral">{promoText || "May Special Offer"}</strong> for <strong>{course === 'cdec' ? 'Cloud DevOps (CDEC)' : 'Data Science & AI (XDSAI)'}</strong>. Our onboarding advisor will contact you shortly!
        </p>
      );
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur - reduced to 1.5px and lowered overlay opacity to preserve background legibility */}
      <div 
        className="absolute inset-0 bg-slate-950/15 transition-opacity duration-300"
        style={{ backdropFilter: 'blur(1.5px)', WebkitBackdropFilter: 'blur(1.5px)' }}
        onClick={onClose}
      />
      
      {/* Modal Container - increased max-width to lg (512px) and increased padding to p-5/sm:p-7 */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-3xl border border-border-light bg-white p-5 text-left shadow-2xl transition-all sm:p-7 animate-scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!success ? (
          <>
            {/* Header Section - condensed margins and slightly scaled down copy */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-2.5 py-0.5 text-[11px] font-bold text-coral">
                <span className="flex h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
                Special Batch Registration Open
              </span>
              <h3 className="mt-1.5 text-xl sm:text-2xl font-black text-text-dark tracking-tight leading-snug">
                {headingText}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-text-muted leading-relaxed font-semibold">
                {descriptionText}
              </p>
              {purpose === 'offer' && (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-coral/10 via-purple/10 to-indigo-900/10 border border-coral/20 p-3.5 mt-2.5">
                  <div className="absolute inset-0 bg-white/5 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250px_250px] animate-shimmer pointer-events-none" />
                  <span className="block text-[9px] font-black text-coral uppercase tracking-widest mb-1.5">
                    Active Promotional Offer
                  </span>
                  <span className="text-xs sm:text-sm font-black text-text-dark tracking-tight leading-snug block">
                    {promoText || "✨ May Special: Get 27% OFF + Free 1-on-1 Mock Interviews!"}
                  </span>
                </div>
              )}
            </div>

            {/* Form - adjusted spacing to space-y-3.5 */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-text-medium mb-1">
                  Full Name <span className="text-coral font-bold">*</span>
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amit Sharma"
                  className={`w-full rounded-2xl border ${errors.name ? 'border-red-500 bg-red-500/5' : 'border-border-light bg-slate-50/50'} px-3.5 py-2 text-sm sm:text-base text-text-dark outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all`}
                />
                {errors.name && <p className="mt-0.5 text-xs font-medium text-red-500">{errors.name}</p>}
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
                  className={`w-full rounded-2xl border ${errors.email ? 'border-red-500 bg-red-500/5' : 'border-border-light bg-slate-50/50'} px-3.5 py-2 text-sm sm:text-base text-text-dark outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all`}
                />
                {errors.email && <p className="mt-0.5 text-xs font-medium text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-text-medium mb-1">
                  Phone Number <span className="text-coral font-bold">*</span>
                </label>
                <div className="flex gap-2">
                  {/* Country Code Dropdown selector */}
                  <div className="relative shrink-0 w-[105px]" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full rounded-2xl border border-border-light bg-slate-50/50 px-2.5 py-2 text-sm sm:text-base text-text-dark outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all flex items-center justify-between font-semibold hover:bg-slate-100/50 cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <img 
                          src={`https://flagcdn.com/w40/${selectedCountry.flag}.png`}
                          alt={`${selectedCountry.name} flag`}
                          className="h-3 w-4.5 object-cover rounded-[1px] shadow-sm shrink-0 border border-slate-200"
                        />
                        <span className="truncate">{selectedCountry.code}</span>
                      </div>
                      <svg className={`h-2.5 w-2.5 text-text-muted transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            className={`w-full px-3 py-2 text-left text-xs text-text-dark hover:bg-slate-50 flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                              countryCode === c.code ? 'bg-coral/5 text-coral font-semibold' : 'font-medium'
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
                            <span className={countryCode === c.code ? 'text-coral font-semibold' : 'text-text-muted font-normal'}>
                              {c.code}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Digit-only 10-digit Phone Number Input */}
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) setPhone(val);
                    }}
                    placeholder="10-digit number"
                    className={`flex-1 min-w-0 rounded-2xl border ${errors.phone ? 'border-red-500 bg-red-500/5' : 'border-border-light bg-slate-50/50'} px-3.5 py-2 text-sm sm:text-base text-text-dark outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all font-mono tracking-wider`}
                  />
                </div>
                {errors.phone && <p className="mt-0.5 text-xs font-medium text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-text-medium mb-1">
                  Selected Course (Auto-Extracted)
                </label>
                <div className={`flex items-center gap-2.5 p-2.5 rounded-2xl border ${
                  course === 'cdec' 
                    ? 'border-coral/20 bg-coral/5 text-coral' 
                    : 'border-purple/20 bg-purple/5 text-purple'
                }`}>
                  <div className={`h-8.5 w-8.5 rounded-xl flex items-center justify-center font-bold text-[10.5px] shrink-0 shadow-sm ${
                    course === 'cdec' ? 'bg-gradient-to-br from-coral to-pink-500 text-white' : 'bg-gradient-to-br from-purple to-indigo-600 text-white'
                  }`}>
                    {course === 'cdec' ? 'CB' : 'DS'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-bold truncate leading-tight text-text-dark">
                      {course === 'cdec' ? 'Cloud DevOps Engineering (CDEC)' : 'Expert in Data Science & AI (XDSAI)'}
                    </span>
                    <span className="block text-[9.5px] text-text-muted mt-0.5">
                      Program track synchronized automatically
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-text-medium mb-1">
                  Current Experience Level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full rounded-2xl border border-border-light bg-slate-50/50 px-3.5 py-2.5 text-sm sm:text-base text-text-dark outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all cursor-pointer"
                >
                  <option value="fresher">College Student / Fresher</option>
                  <option value="junior">Junior Developer / Engineer (1 - 3 Years)</option>
                  <option value="mid">Mid-Level Professional (3 - 5 Years)</option>
                  <option value="senior">Senior Lead / Expert (5+ Years)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2.5 w-full flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-brand py-3 text-sm sm:text-base font-black text-white shadow-lg shadow-coral/20 hover:shadow-coral/35 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Securing Your Slot...</span>
                  </>
                ) : (
                  <>
                    <span>{submitButtonText}</span>
                    <svg className="h-4 w-4 animate-bounce-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 animate-scale-up">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-text-dark tracking-tight">Application Received!</h3>
            {successContent}
          </div>
        )}
      </div>
    </div>
  );
}
