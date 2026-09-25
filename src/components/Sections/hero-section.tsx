"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import dynamic from "next/dynamic";
import { useGraphics } from "@/lib/use-is-desktop";

// three.js só é baixado no navegador, depois do conteúdo principal
const HeroScene = dynamic(() => import("@/components/Effects/hero-scene"), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const t = useTranslations("hero");
  const tA11y = useTranslations("a11y");
  const { webgl, lite } = useGraphics();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-grid" aria-hidden />

      {/* Linha superior de metadados */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-start justify-between px-6 pt-8"
      >
        <div>
          <p className="label-mono text-neutral-400">
            <span className="text-amber-glow">00</span> {"//"} {t("role")}
          </p>
          <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-neutral-600 uppercase">
            React · Next.js · TypeScript · C# · .NET
          </p>
        </div>
        <p className="label-mono hidden text-neutral-500 sm:block">
          Fortaleza, CE — BR
        </p>
      </motion.div>

      {/* Nome em partículas; texto comum só se não houver WebGL */}
      <div className="relative flex min-h-[300px] flex-1 items-center justify-center">
        {webgl && <HeroScene lite={lite} />}
        <h1
          className={
            webgl !== false
              ? "sr-only"
              : "relative z-10 px-6 text-center text-5xl font-light tracking-[0.15em] text-white sm:text-6xl"
          }
        >
          Jeferson Fernandes
          <span className="sr-only"> — {t("role")}</span>
        </h1>
      </div>

      {/* Chamada e ações */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.2, ease }}
          className="label-mono leading-relaxed text-neutral-300"
        >
          “{t("description")}”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-amber-glow"
          >
            {t("viewProjects")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <a
            href="/CVJefersonFernandes.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
          >
            <Download className="h-4 w-4" />
            {t("downloadCV")}
          </a>
          <a
            href="https://github.com/jefersonfernandes539"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tA11y("github")}
            className="rounded-md border border-white/20 p-3 text-neutral-300 transition-colors hover:border-white/50 hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/jeferson-f-04343a111/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tA11y("linkedin")}
            className="rounded-md border border-white/20 p-3 text-neutral-300 transition-colors hover:border-white/50 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => scrollTo("about")}
          aria-label={tA11y("scrollDown")}
          className="mx-auto mt-12 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-2xl text-amber-glow drop-shadow-[0_0_12px_rgba(245,196,107,0.6)]">
            {"</>"}
          </span>
          <span className="label-mono flex items-center gap-1 text-neutral-500">
            {t("explore")} <ArrowDown className="h-3 w-3 animate-bounce" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}
