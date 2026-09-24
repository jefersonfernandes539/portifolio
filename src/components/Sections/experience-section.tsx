"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { Reveal, SectionHeader } from "@/components/Effects/reveal";

const WORK_IDS = [5, 4, 3, 2, 1]; // mais recente primeiro

export function ExperienceSection() {
  const t = useTranslations("experienceSection");
  const tNav = useTranslations("navbar");
  const tSec = useTranslations("sections");

  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  const items = [...WORK_IDS.map((id) => work(id)), education()];

  function work(id: number) {
    return {
      key: `work-${id}`,
      type: tSec("work"),
      title: t(`work.${id}.role`),
      place: t(`work.${id}.company`),
      period: t(`work.${id}.period`),
      description: t.raw(`work.${id}.description`) as string[],
      skills: t.raw(`work.${id}.skills`) as string[],
    };
  }

  function education() {
    return {
      key: "education-1",
      type: tSec("education"),
      title: t("education.1.degree"),
      place: t("education.1.institution"),
      period: t("education.1.period"),
      description: [t("education.1.description")],
      skills: [] as string[],
    };
  }

  return (
    <section id="experience" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="03"
          label={tNav("experience")}
          title={tSec("experienceHeadline")}
          subtitle={t("subtitle")}
        />

        <ol ref={listRef} className="relative">
          {/* Linha do tempo que se acende com o scroll */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 md:left-[calc(220px+7px)]"
            aria-hidden
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-sky-glow via-violet-400 to-amber-glow"
              style={{ scaleY: lineProgress }}
            />
          </div>

          {items.map((item, i) => (
            <li
              key={item.key}
              className="relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-[220px_1fr] md:gap-0 md:pl-0"
            >
              <Reveal className="md:pr-10 md:text-right">
                <p className="label-mono text-amber-glow">{item.period}</p>
                <p className="label-mono mt-2 text-neutral-600">
                  {String(i + 1).padStart(2, "0")} · {item.type}
                </p>
              </Reveal>

              {/* Marcador */}
              <span
                className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border border-white/30 bg-black md:left-[220px]"
                aria-hidden
              >
                <span className="absolute inset-[4px] rounded-full bg-sky-glow shadow-[0_0_10px_2px_rgba(90,180,240,0.6)]" />
              </span>

              <Reveal delay={0.08} className="md:pl-12">
                <h3 className="text-2xl font-medium tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-1 font-mono text-sm text-sky-glow">{item.place}</p>
                <div className="mt-4 max-w-2xl space-y-3 leading-relaxed text-neutral-400">
                  {item.description.map((desc, j) => (
                    <p key={j}>{desc}</p>
                  ))}
                </div>
                {item.skills.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <li
                        key={skill}
                        className="border border-white/10 px-2 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-neutral-300"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
