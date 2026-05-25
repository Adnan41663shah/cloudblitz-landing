"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type StarLayerProps = {
  count: number;
  size: number;
  duration: number;
  starColor: string;
  className?: string;
};

// Highly performant, optimized static stars cache to prevent heavy calculations
const starsCache: Record<string, string> = {};
function getCachedStars(count: number, starColor: string): string {
  const cacheKey = `${count}-${starColor}`;
  if (starsCache[cacheKey]) return starsCache[cacheKey]!;

  const shadows: string[] = [];
  // Use a smaller area appropriate for card dimensions rather than 4000px
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 800) - 400;
    const y = Math.floor(Math.random() * 800) - 400;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  
  const result = shadows.join(", ");
  starsCache[cacheKey] = result;
  return result;
}

function StarLayer({
  count = 100,
  size = 1,
  duration = 50,
  starColor = "#fff",
  className,
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>("");

  React.useEffect(() => {
    setBoxShadow(getCachedStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      animate={{ y: [0, -400] }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      className={cn("absolute top-0 left-0 w-full h-[400px] pointer-events-none select-none", className)}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[400px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

type CardStarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  starColor?: string;
  glowColor?: "coral" | "purple" | "emerald" | "blue";
};

export function CardStarsBackground({
  children,
  className,
  factor = 0.03, // Subtle parallax
  speed = 40,
  starColor = "#ffffff",
  glowColor,
  ...props
}: CardStarsBackgroundProps) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  // Smooth springs with high damping for butter-smooth performance
  const springX = useSpring(offsetX, { stiffness: 45, damping: 25 });
  const springY = useSpring(offsetY, { stiffness: 45, damping: 25 });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor],
  );

  const handleMouseLeave = React.useCallback(() => {
    // Return springs to center gracefully
    offsetX.set(0);
    offsetY.set(0);
  }, [offsetX, offsetY]);

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full h-full rounded-3xl p-5 border shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer select-none",
        "bg-gradient-to-br from-slate-950 to-slate-900",
        glowColor === "coral" && "border-coral/20 hover:border-coral/40 hover:shadow-coral/5",
        glowColor === "purple" && "border-purple/20 hover:border-purple/40 hover:shadow-purple/5",
        glowColor === "emerald" && "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/5",
        glowColor === "blue" && "border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/5",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Dynamic Cosmic Color Glow Background */}
      {glowColor === "coral" && (
        <div className="absolute inset-0 z-0 opacity-12 bg-[radial-gradient(circle_at_20%_20%,#ff6b00_0%,transparent_60%)] pointer-events-none" />
      )}
      {glowColor === "purple" && (
        <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle_at_20%_20%,#8f2fe2_0%,transparent_60%)] pointer-events-none" />
      )}
      {glowColor === "emerald" && (
        <div className="absolute inset-0 z-0 opacity-12 bg-[radial-gradient(circle_at_20%_20%,#10b981_0%,transparent_60%)] pointer-events-none" />
      )}
      {glowColor === "blue" && (
        <div className="absolute inset-0 z-0 opacity-12 bg-[radial-gradient(circle_at_20%_20%,#3b82f6_0%,transparent_60%)] pointer-events-none" />
      )}

      {/* Mouse Parallax Moving Stars - Optimized Counts for 60fps Card Performance */}
      <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 z-0 pointer-events-none">
        <StarLayer
          count={80} // 80 stars size 1
          size={1}
          duration={speed}
          starColor={starColor}
        />
        <StarLayer
          count={25} // 25 stars size 2
          size={1.5}
          duration={speed * 1.8}
          starColor={starColor}
        />
        <StarLayer
          count={10} // 10 stars size 3
          size={2.2}
          duration={speed * 2.5}
          starColor={starColor}
        />
      </motion.div>

      {/* Card Content Wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
