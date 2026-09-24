"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/** Conteúdo que surge com blur + subida ao entrar na tela. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Cabeçalho de seção no estilo "01 / SOBRE" + frase grande. */
export function SectionHeader({
  index,
  label,
  title,
  subtitle,
  className,
}: {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-14 max-w-3xl", className)}>
      <Reveal>
        <p className="label-mono text-sky-glow mb-5">
          {index} / {label}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="mt-6 text-lg leading-relaxed text-neutral-400">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Linha divisória fina com um feixe que avança conforme o scroll. */
export function Divider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className="relative h-px w-full bg-white/10" aria-hidden>
      <motion.div
        className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{ scaleX }}
      />
    </div>
  );
}
