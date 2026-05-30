'use client';

import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

export type TechShowcaseGlowVariant = 'cyan' | 'blue' | 'purple' | 'green' | 'orange' | 'red';

export interface TechShowcaseCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glowVariant?: TechShowcaseGlowVariant;
  surfaceClassName?: string;
  /** Pixels outside the card edge where the border glow still activates */
  proximity?: number;
}

const LERP = 0.14;
const DEFAULT_PROXIMITY = 96;

function distanceOutsideRect(clientX: number, clientY: number, rect: DOMRect) {
  const dx = Math.max(rect.left - clientX, 0, clientX - rect.right);
  const dy = Math.max(rect.top - clientY, 0, clientY - rect.bottom);
  return Math.hypot(dx, dy);
}

/** Nearest point on the card perimeter — used when the cursor is outside the card */
function nearestBorderPoint(clientX: number, clientY: number, rect: DOMRect) {
  return {
    x: Math.max(0, Math.min(rect.width, clientX - rect.left)),
    y: Math.max(0, Math.min(rect.height, clientY - rect.top)),
  };
}

export function TechShowcaseCard({
  children,
  className = '',
  surfaceClassName = '',
  glowVariant = 'cyan',
  proximity = DEFAULT_PROXIMITY,
  ...props
}: TechShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0, opacity: 0, active: false });
  const currentRef = useRef({ x: 0, y: 0, opacity: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    function tick() {
      const el = cardRef.current;
      if (!el) return;

      const { x: targetX, y: targetY, opacity: targetOpacity, active } = targetRef.current;
      let { x, y, opacity } = currentRef.current;

      x += (targetX - x) * LERP;
      y += (targetY - y) * LERP;
      opacity += (targetOpacity - opacity) * LERP;
      currentRef.current = { x, y, opacity };

      const rect = el.getBoundingClientRect();
      const angle =
        Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI) + 90;

      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
      el.style.setProperty('--glow-angle', `${angle}deg`);
      el.style.setProperty('--border-glow-opacity', String(Math.max(0, opacity)));

      const stillMoving =
        active ||
        Math.abs(targetX - x) > 0.4 ||
        Math.abs(targetY - y) > 0.4 ||
        Math.abs(targetOpacity - opacity) > 0.01;

      if (stillMoving) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        if (!active && opacity < 0.02) {
          el.removeAttribute('data-glow-active');
        }
      }
    }

    function startGlowLoop() {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const distance = distanceOutsideRect(event.clientX, event.clientY, rect);

      if (distance > proximity) {
        if (targetRef.current.active) {
          targetRef.current = { ...targetRef.current, active: false, opacity: 0 };
          startGlowLoop();
        }
        return;
      }

      const { x, y } = nearestBorderPoint(event.clientX, event.clientY, rect);
      const inside = distance === 0;
      const opacity = inside ? 1 : Math.max(0.72, 1 - (distance / proximity) * 0.35);

      targetRef.current = { x, y, opacity, active: true };
      el.setAttribute('data-glow-active', 'true');
      startGlowLoop();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [proximity]);

  return (
    <div
      ref={cardRef}
      className={`tech-showcase-card tech-showcase-card--${glowVariant} ${className}`}
      {...props}
    >
      <div className={`tech-showcase-card__surface ${surfaceClassName}`}>{children}</div>
    </div>
  );
}

export function getTechShowcaseGlowVariant(
  badgeText: string,
  isDevops: boolean,
): TechShowcaseGlowVariant {
  const token = badgeText.match(/text-([a-z]+)-/)?.[1];

  switch (token) {
    case 'orange':
    case 'amber':
      return 'orange';
    case 'sky':
      return 'cyan';
    case 'blue':
    case 'indigo':
      return 'blue';
    case 'purple':
    case 'rose':
      return 'purple';
    case 'emerald':
      return 'green';
    case 'red':
      return 'red';
    case 'slate':
      return 'blue';
    default:
      return isDevops ? 'cyan' : 'purple';
  }
}
