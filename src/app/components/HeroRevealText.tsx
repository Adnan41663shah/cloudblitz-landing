'use client';

import { motion, useReducedMotion } from 'motion/react';
import { type ReactNode } from 'react';

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const REVEAL_DURATION = 1;

const revealHidden = {
  clipPath: 'inset(0 100% 0 0)',
  y: 16,
  filter: 'blur(6px)',
};

const revealVisible = {
  clipPath: 'inset(0 0 0 0)',
  y: 0,
  filter: 'blur(0px)',
};

type HeroRevealLineProps = {
  children: ReactNode;
  /** Stagger delay in seconds */
  delay?: number;
  className?: string;
  lineKey?: string;
};

/** Single heading line with left-to-right clip mask reveal */
export function HeroRevealLine({ children, delay = 0, className = '', lineKey }: HeroRevealLineProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span className={`hero-reveal-line block overflow-hidden ${className}`}>
      <motion.span
        key={lineKey}
        className="hero-reveal-line__text inline-block"
        initial={reduceMotion ? revealVisible : revealHidden}
        animate={revealVisible}
        transition={{
          duration: reduceMotion ? 0 : REVEAL_DURATION,
          delay: reduceMotion ? 0 : delay,
          ease: REVEAL_EASE,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

type HeroRevealHeadingProps = {
  children: ReactNode;
  className?: string;
  revealKey?: string;
};

export function HeroRevealHeading({ children, className = '', revealKey }: HeroRevealHeadingProps) {
  return (
    <h1 key={revealKey} className={`hero-reveal-heading ${className}`}>
      {children}
    </h1>
  );
}

type HeroRevealDescriptionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  revealKey?: string;
};

export function HeroRevealDescription({
  children,
  className = '',
  delay = 0.52,
  revealKey,
}: HeroRevealDescriptionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <p key={revealKey} className={className}>
      <span className="hero-reveal-line block overflow-hidden">
        <motion.span
          key={revealKey ? `${revealKey}-desc` : 'desc'}
          className="hero-reveal-line__text inline-block w-full"
          initial={reduceMotion ? revealVisible : revealHidden}
          animate={revealVisible}
          transition={{
            duration: reduceMotion ? 0 : REVEAL_DURATION,
            delay: reduceMotion ? 0 : delay,
            ease: REVEAL_EASE,
          }}
        >
          {children}
        </motion.span>
      </span>
    </p>
  );
}
