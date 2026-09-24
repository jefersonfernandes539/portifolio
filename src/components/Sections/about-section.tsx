"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Globe,
  Palette,
  Server,
  Database,
  Code,
  Lightbulb,
} from "lucide-react";
import { TiltCard } from "@/components/Effects/tilt-card";
import { Reveal, SectionHeader } from "@/components/Effects/reveal";

const richTags = {
  bold: (chunks: React.ReactNode) => (
    <span className="font-medium text-white">{chunks}</span>
  ),
  italic: (chunks: React.ReactNode) => (
    <span className="italic text-sky-glow">{chunks}</span>
  ),
};

// Mesmas categorias do currículo
const stack = [
  {
    key: "frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Chakra UI", "ShadCN", "HTML5", "CSS3"],
  },
  {
    key: "backend",
    items: ["Node.js", "NestJS", "C# .NET", "Entity Framework", "APIs REST", "JWT", "Multi-tenant"],
  },
  {
    key: "database",
    items: ["PostgreSQL", "SQL Server", "Drizzle ORM", "Entity Framework"],
  },
  {
    key: "mobile",
    items: ["React Native", "Kotlin", "Jetpack Compose", "Room", "StateFlow"],
  },
  {
    key: "automation",
    items: ["RPA", "N8N", "WhatsApp", "Webhooks", "Twilio", "Web Crawling"],
  },
  {
    key: "devops",
    items: ["Git", "GitHub", "Docker", "Jenkins", "Azure", "CI/CD", "Postman", "Firebase"],
  },
] as const;

const services = [
  { key: "web", icon: Globe },
  { key: "frontend", icon: Code },
  { key: "backend", icon: Server },
  { key: "database", icon: Database },
  { key: "uiux", icon: Palette },
  { key: "consulting", icon: Lightbulb },
] as const;

export function AboutSection() {
  const t = useTranslations("aboutSection");
  const tNav = useTranslations("navbar");
  const tSec = useTranslations("sections");
  const tA11y = useTranslations("a11y");

  const info = [
    { label: t("whoAmI.info.name"), value: "Jeferson Fernandes" },
    { label: t("whoAmI.info.email"), value: "fernandesjeferson539@gmail.com" },
    { label: t("whoAmI.info.location"), value: "Fortaleza, CE" },
    {
      label: t("whoAmI.info.availability"),
      value: t("whoAmI.info.availabilityText"),
      highlight: true,
    },
  ];

  return (
    <section id="about" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="01"
          label={tNav("about")}
          title={tSec("aboutHeadline")}
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* Foto + ficha técnica */}
          <Reveal>
            <div className="frame p-3">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/foto-jeferson.jpeg"
                  alt={tA11y("photoAlt")}
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover object-[50%_30%] grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
                />
                <span className="label-mono absolute left-3 top-3 border border-white/20 bg-black/60 px-2 py-1 text-amber-glow backdrop-blur">
                  ID · 01
                </span>
              </div>
              <dl className="mt-3 divide-y divide-white/10 border-t border-white/10">
                {info.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="label-mono text-neutral-500">{item.label}</dt>
                    <dd
                      className={
                        item.highlight
                          ? "text-right text-sm text-emerald-400"
                          : "break-all text-right text-sm text-neutral-200"
                      }
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Texto */}
          <div className="space-y-6 text-lg leading-relaxed text-neutral-400">
            <Reveal>
              <p>{t.rich("paragraphs.p1", richTags)}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>{t("paragraphs.p2")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>{t.rich("paragraphs.p3", richTags)}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>{t.rich("paragraphs.p4", richTags)}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>{t("whoAmI.paragraphs.p3")}</p>
            </Reveal>
          </div>
        </div>

        {/* Índice da stack */}
        <div className="mt-32 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <SectionHeader
            index="01.1"
            label={tSec("stackLabel")}
            title={tSec("stackHeadline")}
            className="mb-0"
          />
          <Reveal>
            <ul className="grid grid-cols-2 border-l border-t border-white/10">
              {stack.map(({ key, items }, i) => (
                <li
                  key={key}
                  className="group relative border-b border-r border-white/10 bg-black/40 p-6 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="font-mono text-xs text-neutral-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-medium text-amber-glow">
                    {t(`skills.${key}`)}
                  </p>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-neutral-400 transition-colors group-hover:text-neutral-200">
                    {items.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Serviços */}
        <div className="mt-32">
          <SectionHeader
            index="01.2"
            label={tSec("servicesLabel")}
            title={t("services.title")}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ key, icon: Icon }, i) => (
              <Reveal key={key} delay={i * 0.06} className="h-full">
                <TiltCard className="h-full" maxTilt={5}>
                  <div className="frame h-full p-6">
                    <div className="flex items-center justify-between">
                      <span className="label-mono text-amber-glow">
                        {tSec("servicesLabel")} {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon className="h-5 w-5 text-sky-glow" />
                    </div>
                    <h3 className="mt-10 text-xl font-medium text-white">
                      {t(`services.${key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                      {t(`services.${key}.description`)}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
