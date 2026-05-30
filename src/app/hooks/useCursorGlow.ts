'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { CourseType } from '../types';

const LERP = 0.12;

function canUseCursorGlow() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return window.matchMedia('(hover: hover)').matches;
}

export function useCursorGlow(activeCourse: CourseType) {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);

  const glowVariant = activeCourse === 'cdec' ? 'coral' : 'purple';

  const applyPosition = useCallback(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const { x, y } = currentRef.current;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }, []);

  const setGlowVisible = useCallback((visible: boolean) => {
    const glow = glowRef.current;
    if (!glow) return;
    glow.style.opacity = visible ? '1' : '0';
    visibleRef.current = visible;
  }, []);

  useEffect(() => {
    if (!canUseCursorGlow()) return;

    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const isInsideContainer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    };

    const updateTarget = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      targetRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      const inside = isInsideContainer(e.clientX, e.clientY);

      if (!inside) {
        if (visibleRef.current) setGlowVisible(false);
        return;
      }

      updateTarget(e.clientX, e.clientY);

      if (!visibleRef.current) {
        currentRef.current = { ...targetRef.current };
        setGlowVisible(true);
        applyPosition();
      }
    };

    const onMouseLeave = () => {
      setGlowVisible(false);
    };

    let rafId = 0;
    const tick = () => {
      if (visibleRef.current) {
        const target = targetRef.current;
        const current = currentRef.current;

        current.x += (target.x - current.x) * LERP;
        current.y += (target.y - current.y) * LERP;

        applyPosition();
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [applyPosition, setGlowVisible]);

  return {
    containerRef,
    glowRef,
    glowVariant,
  };
}

/** @deprecated Use useCursorGlow */
export const useHeroCursorGlow = useCursorGlow;
