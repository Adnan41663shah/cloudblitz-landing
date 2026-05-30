'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import type { PlacementPartner } from '../data/placement-partners';

export type InsightPlacement = 'top' | 'bottom';

function InsightIcon({ children, className }: { children: ReactNode; className: string }) {
  return (
    <span className={`inline-flex h-4 w-4 shrink-0 items-center justify-center ${className}`}>
      {children}
    </span>
  );
}

function PartnerInsightCard({
  partner,
  placement,
}: {
  partner: PlacementPartner;
  placement: InsightPlacement;
}) {
  const { displayName, industry, alumni, avgPackage, location } = partner;

  return (
    <div
      className="relative w-[11.5rem] rounded-xl border border-slate-200/90 bg-white px-3.5 py-3 text-center shadow-[0_12px_40px_rgba(15,23,42,0.14)] sm:w-[12.5rem]"
      role="tooltip"
    >
      <p className="text-sm font-extrabold tracking-tight text-text-dark sm:text-base">{displayName}</p>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-text-muted">
        <InsightIcon className="text-blue-500">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </InsightIcon>
        <span>{industry}</span>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-[11px] font-bold text-text-medium">
        <span className="inline-flex items-center gap-1">
          <InsightIcon className="text-emerald-600">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </InsightIcon>
          {alumni} Alumni
        </span>
        <span className="inline-flex items-center gap-1 text-blue-600">
          <InsightIcon className="text-blue-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </InsightIcon>
          {avgPackage}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-text-muted">
        <InsightIcon className="text-red-500">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </InsightIcon>
        <span>{location}</span>
      </div>

      {placement === 'bottom' ? (
        <>
          <span
            className="absolute bottom-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-b-white"
            aria-hidden
          />
          <span
            className="absolute bottom-full left-1/2 mb-px -translate-x-1/2 border-[8px] border-transparent border-b-slate-200/90"
            aria-hidden
          />
        </>
      ) : (
        <>
          <span
            className="absolute left-1/2 top-full -translate-x-1/2 border-[7px] border-transparent border-t-white"
            aria-hidden
          />
          <span
            className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-[8px] border-transparent border-t-slate-200/90"
            aria-hidden
          />
        </>
      )}
    </div>
  );
}

function useInsightPosition(
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
  placement: InsightPlacement,
) {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const update = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const gap = 10;
    const x = rect.left + rect.width / 2;
    const y = placement === 'top' ? rect.top - gap : rect.bottom + gap;
    setCoords({ x, y });
  }, [anchorRef, placement]);

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }

    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, update]);

  return coords;
}

function PartnerInsightPortal({
  partner,
  anchorRef,
  open,
  placement,
}: {
  partner: PlacementPartner;
  anchorRef: RefObject<HTMLElement | null>;
  open: boolean;
  placement: InsightPlacement;
}) {
  const [mounted, setMounted] = useState(false);
  const coords = useInsightPosition(anchorRef, open, placement);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open || !coords) return null;

  const transform = placement === 'top' ? 'translate(-50%, -100%)' : 'translate(-50%, 0)';

  return createPortal(
    <div
      className="pointer-events-none fixed z-[9999] transition-all duration-200 ease-out"
      style={{
        left: coords.x,
        top: coords.y,
        transform,
      }}
    >
      <PartnerInsightCard partner={partner} placement={placement} />
    </div>,
    document.body,
  );
}

export default function PartnerBrandCard({
  partner,
  insightPlacement = 'top',
}: {
  partner: PlacementPartner;
  insightPlacement?: InsightPlacement;
}) {
  const { Icon, name, displayName, brandColor, brandBg } = partner;
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const cardStyle = {
    '--partner-color': brandColor,
    '--partner-bg': brandBg,
  } as CSSProperties;

  const close = useCallback(() => setActive(false), []);

  const isTouchDevice = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  useEffect(() => {
    if (!active) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [active, close]);

  const showInsight = active;

  return (
    <article
      ref={rootRef}
      className={`partner-brand-card group relative shrink-0 ${showInsight ? 'is-insight-open z-30' : 'z-0 hover:z-20'}`}
      style={cardStyle}
      tabIndex={0}
      aria-label={`${name} — ${partner.alumni} alumni, avg package ${partner.avgPackage}, ${partner.location}`}
      onMouseEnter={() => {
        if (!isTouchDevice()) setActive(true);
      }}
      onMouseLeave={() => {
        if (!isTouchDevice()) setActive(false);
      }}
      onFocus={() => setActive(true)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setActive(false);
      }}
      onClick={() => {
        if (isTouchDevice()) setActive((v) => !v);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActive((v) => !v);
        }
      }}
    >
      <PartnerInsightPortal
        partner={partner}
        anchorRef={rootRef}
        open={showInsight}
        placement={insightPlacement}
      />

      <div className="partner-brand-card-inner flex min-h-[5.5rem] w-[6.75rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white px-3 py-3.5 shadow-[0_4px_18px_rgba(15,23,42,0.07)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-[var(--partner-color)] group-hover:bg-[var(--partner-bg)] group-hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)] group-focus-visible:ring-2 group-focus-visible:ring-coral/30 sm:min-h-[6rem] sm:w-[7.5rem] sm:gap-2.5 sm:rounded-2xl sm:px-3.5 sm:py-4 md:w-[8.25rem] lg:w-[8.75rem]">
        <div className="flex h-9 w-full items-center justify-center sm:h-10">
          {Icon ? (
            <Icon
              className="h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-300 group-hover:scale-110"
              style={{ color: brandColor }}
              aria-hidden
            />
          ) : (
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black sm:h-9 sm:w-9 sm:text-base"
              style={{ color: brandColor, backgroundColor: brandBg }}
              aria-hidden
            >
              {displayName.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <p
          className="line-clamp-2 w-full text-center text-[10px] font-extrabold leading-tight tracking-tight sm:text-[11px] md:text-xs"
          style={{ color: brandColor }}
        >
          {displayName}
        </p>
      </div>
    </article>
  );
}
