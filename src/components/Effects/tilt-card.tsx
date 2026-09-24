"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * Card com inclinação 3D e um spotlight que segue o cursor.
 * Só reage a mouse; em touch ou com "reduzir movimento" fica estático.
 */
export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const spring = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useSpring(0, spring);

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(90,180,240,0.12), rgba(245,196,107,0.05) 40%, transparent 65%)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    glowX.set(px * 100);
    glowY.set(py * 100);
    glowOpacity.set(1);
    if (!reducedMotion) {
      rotateY.set((px - 0.5) * maxTilt * 2);
      rotateX.set(-(py - 0.5) * maxTilt * 2);
    }
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  };

  return (
    <div className={cn("[perspective:1000px]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full"
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight, opacity: glowOpacity }}
        />
      </motion.div>
    </div>
  );
}
