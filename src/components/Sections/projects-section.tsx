"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TiltCard } from "@/components/Effects/tilt-card";
import { Reveal, SectionHeader } from "@/components/Effects/reveal";
import { cn } from "@/lib/utils";

type Category = "frontend" | "backend" | "fullstack";

const projects: {
  id: number;
  key: string;
  image: string;
  tags: string[];
  category: Category;
  githubUrl: string;
  liveUrl: string;
}[] = [
  {
    id: 1,
    key: "project1",
    image: "/img1.png",
    tags: ["React", "Next.js", "TypeScript", "ShadCN", "C#", "PostgreSQL", "EF ORM"],
    category: "fullstack",
    githubUrl: "https://github.com/jefersonfernandes539/OscFrontend",
    liveUrl: "https://redemobilize.up.railway.app/",
  },
  {
    id: 2,
    key: "project2",
    image: "/project2.png",
    tags: ["React", "Next.js", "TypeScript", "ShadCN"],
    category: "frontend",
    githubUrl: "https://github.com/jefersonfernandes539/portifolio-psicologa",
    liveUrl: "https://portifoliopsicologa.vercel.app/",
  },
  {
    id: 3,
    key: "project3",
    image: "/project3.png",
    tags: ["C#", "PostgreSQL", "EF ORM"],
    category: "backend",
    githubUrl: "https://github.com/jefersonfernandes539/OscBackend",
    liveUrl: "https://redemobilize-backend.up.railway.app/api/onglocation",
  },
];

// Só mostra filtros que têm pelo menos um projeto
const categories = [
  "all",
  ...(["frontend", "backend", "fullstack"] as const).filter((c) =>
    projects.some((p) => p.category === c)
  ),
];

export function ProjectsSection() {
  const t = useTranslations("projects");
  const tNav = useTranslations("navbar");
  const tSec = useTranslations("sections");
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            index="02"
            label={tNav("projects")}
            title={tSec("projectsHeadline")}
            subtitle={t("subtitle")}
          />
          <Reveal className="mb-14">
            <div
              role="tablist"
              className="inline-flex flex-wrap rounded-full border border-white/15 bg-black/40 p-1"
            >
              {categories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active === c}
                  onClick={() => setActive(c)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
                    active === c ? "text-black" : "text-neutral-400 hover:text-white"
                  )}
                >
                  {active === c && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative">{t(`categories.${c}`)}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <TiltCard className="h-full" maxTilt={5}>
                  <div className="frame group flex h-full flex-col p-3">
                    <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
                      <Image
                        src={project.image}
                        alt={t(`${project.key}.title`)}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                      <span className="label-mono absolute left-3 top-3 border border-white/20 bg-black/70 px-2 py-1 backdrop-blur">
                        <span className="text-amber-glow">
                          {t(`categories.${project.category}`)}
                        </span>{" "}
                        <span className="text-white">
                          {String(project.id).padStart(2, "0")}
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                      <p className="font-mono text-[0.68rem] uppercase tracking-widest text-neutral-500">
                        {project.tags.join(" · ")}
                      </p>
                      <h3 className="mt-2 text-xl font-medium text-white">
                        {t(`${project.key}.title`)}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">
                        {t(`${project.key}.description`)}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label-mono inline-flex items-center gap-2 text-neutral-400 transition-colors hover:text-white"
                        >
                          <Github className="h-3.5 w-3.5" /> {t("code")}
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label-mono inline-flex items-center gap-1 text-sky-glow transition-colors hover:text-white"
                        >
                          {t("demo")} <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 text-center">
          <a
            href="https://github.com/jefersonfernandes539"
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono inline-flex items-center gap-2 text-neutral-300 transition-colors hover:text-amber-glow"
          >
            {t("viewMore")} <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
