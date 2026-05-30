'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { CourseType, ModalPurpose } from '../types';
import { downloadSyllabusPdf, getSyllabusFileMeta } from '@/lib/syllabus-download';

type ToastStatus = 'idle' | 'preparing' | 'success' | 'failed';

type LeadPayload = {
  name: string;
  email?: string;
  countryCode: string;
  phone: string;
  experience: string;
  course: CourseType;
  purpose: ModalPurpose;
  promoText?: string;
};

type SyllabusDownloadContextValue = {
  runSyllabusDownloadFlow: (payload: LeadPayload) => Promise<void>;
  retryDownload: () => Promise<void>;
  dismissToast: () => void;
};

const SyllabusDownloadContext = createContext<SyllabusDownloadContextValue | null>(null);

export function useSyllabusDownload() {
  const ctx = useContext(SyllabusDownloadContext);
  if (!ctx) {
    throw new Error('useSyllabusDownload must be used within SyllabusDownloadProvider');
  }
  return ctx;
}

function animateProgress(
  setProgress: (value: number) => void,
  target: number,
  durationMs: number,
): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();

    const step = (now: number) => {
      const ratio = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - ratio) ** 2;
      setProgress(Math.round(eased * target));
      if (ratio < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
}

export function SyllabusDownloadProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ToastStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [course, setCourse] = useState<CourseType | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDismissTimer = useCallback(() => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  }, []);

  const dismissToast = useCallback(() => {
    clearDismissTimer();
    setStatus('idle');
    setProgress(0);
    setCourse(null);
    setErrorMessage('');
  }, [clearDismissTimer]);

  const scheduleAutoDismiss = useCallback(() => {
    clearDismissTimer();
    dismissTimerRef.current = setTimeout(() => {
      dismissToast();
    }, 8000);
  }, [clearDismissTimer, dismissToast]);

  const attemptPdfDownload = useCallback(async (targetCourse: CourseType) => {
    setStatus('preparing');
    setProgress(12);
    await animateProgress(setProgress, 55, 500);
    const downloaded = await downloadSyllabusPdf(targetCourse);
    await animateProgress(setProgress, 100, 350);

    if (downloaded) {
      setStatus('success');
      scheduleAutoDismiss();
    } else {
      setStatus('failed');
      setErrorMessage('The syllabus PDF could not be downloaded. Please try again.');
    }
  }, [scheduleAutoDismiss]);

  const runSyllabusDownloadFlow = useCallback(
    async (payload: LeadPayload) => {
      clearDismissTimer();
      setCourse(payload.course);
      setErrorMessage('');
      setStatus('preparing');
      setProgress(8);

      try {
        await animateProgress(setProgress, 35, 400);

        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            countryCode: payload.countryCode,
            phone: payload.phone,
            experience: payload.experience,
            course: payload.course,
            purpose: payload.purpose,
            promoText: payload.promoText,
            landingForm: 'LeadFormModal',
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          setStatus('failed');
          setErrorMessage(data.error || 'Something went wrong. Please try again.');
          return;
        }

        await attemptPdfDownload(payload.course);
      } catch {
        setStatus('failed');
        setErrorMessage('Unable to connect. Check your network and try again.');
      }
    },
    [attemptPdfDownload, clearDismissTimer],
  );

  const retryDownload = useCallback(async () => {
    if (!course) return;
    clearDismissTimer();
    setErrorMessage('');
    await attemptPdfDownload(course);
  }, [attemptPdfDownload, clearDismissTimer, course]);

  useEffect(() => () => clearDismissTimer(), [clearDismissTimer]);

  const isVisible = status !== 'idle';
  const meta = course ? getSyllabusFileMeta(course) : null;

  return (
    <SyllabusDownloadContext.Provider value={{ runSyllabusDownloadFlow, retryDownload, dismissToast }}>
      {children}

      {isVisible && (
        <div
          className="fixed bottom-4 left-4 z-[60] w-[min(100vw-2rem,22rem)] animate-scale-up sm:bottom-5 sm:left-5 sm:w-[min(100vw-2.5rem,24rem)]"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-md">
            <div className="flex items-start gap-3 p-4">
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  status === 'success'
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : status === 'failed'
                      ? 'bg-red-500/10 text-red-600'
                      : 'bg-coral/10 text-coral'
                }`}
              >
                {status === 'preparing' && (
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {status === 'success' && (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {status === 'failed' && (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              <div className="min-w-0 flex-1">
                {status === 'preparing' && (
                  <>
                    <p className="text-sm font-bold text-text-dark">Preparing your download</p>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {meta ? `${meta.label} syllabus` : 'Generating syllabus PDF…'}
                    </p>
                  </>
                )}
                {status === 'success' && (
                  <>
                    <p className="text-sm font-bold text-emerald-700">Download started successfully</p>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {meta?.fileName} should appear in your downloads folder.
                    </p>
                  </>
                )}
                {status === 'failed' && (
                  <>
                    <p className="text-sm font-bold text-red-700">Download incomplete</p>
                    <p className="mt-0.5 text-xs text-text-muted leading-relaxed">{errorMessage}</p>
                  </>
                )}

                {status === 'preparing' && (
                  <div className="mt-3">
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-coral to-purple transition-[width] duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                      {progress}% complete
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={dismissToast}
                className="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label="Dismiss notification"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {status === 'failed' && course && (
              <div className="border-t border-slate-100 px-4 py-3">
                <button
                  type="button"
                  onClick={retryDownload}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-2.5 text-xs font-bold text-white shadow-md transition-transform active:scale-[0.98] sm:text-sm"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Re-download syllabus
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </SyllabusDownloadContext.Provider>
  );
}
