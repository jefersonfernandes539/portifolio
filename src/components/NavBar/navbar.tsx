"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { Toggle } from "@/components";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export const SECTIONS = [
  "home",
  "about",
  "projects",
  "experience",
  "contact",
] as const;

export default function Navbar() {
  const t = useTranslations("navbar");
  const tA11y = useTranslations("a11y");
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Marca a seção que ocupa o meio da tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => scrollToSection("home")}
            className="text-lg font-light tracking-[0.25em] text-white"
          >
            JEFERSON
          </button>

          <div className="hidden md:flex items-center rounded-full border border-white/15 bg-black/40 p-1">
            {SECTIONS.map((id, index) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors",
                  activeSection === id
                    ? "text-black"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative">
                  {String(index).padStart(2, "0")}{" "}
                  <span className="hidden lg:inline">{t(id)}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="label-mono hidden xl:flex items-center gap-2 text-neutral-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t("available")}
            </span>
            <Toggle.Language />
            <button
              onClick={() => scrollToSection("contact")}
              className="label-mono rounded-md border border-amber-glow/40 px-3 py-2 text-amber-glow transition-colors hover:bg-amber-glow hover:text-black"
            >
              {t("hire")}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? tA11y("closeMenu") : tA11y("openMenu")}
            aria-expanded={isOpen}
            className="md:hidden p-2 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Progresso de leitura da página */}
        <motion.div
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-sky-glow via-violet-400 to-amber-glow"
          style={{ scaleX: progress }}
        />
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col justify-center px-8"
          >
            <nav className="space-y-6">
              {SECTIONS.map((id, index) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-baseline gap-4 text-left"
                >
                  <span className="font-mono text-sm text-sky-glow">
                    {String(index).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-4xl font-medium tracking-tight",
                      activeSection === id ? "text-white" : "text-neutral-500"
                    )}
                  >
                    {t(id)}
                  </span>
                </motion.button>
              ))}
            </nav>
            <div className="mt-12 flex items-center gap-4">
              <Toggle.Language />
              <button
                onClick={() => scrollToSection("contact")}
                className="label-mono rounded-md border border-amber-glow/40 px-4 py-3 text-amber-glow"
              >
                {t("hire")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
