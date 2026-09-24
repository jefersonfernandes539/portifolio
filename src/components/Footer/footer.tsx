"use client";

import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Effects/reveal";

export function Footer() {
  const t = useTranslations("footer");
  const tSec = useTranslations("sections");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="label-mono text-neutral-500">
              Jeferson Fernandes / 00—04
            </p>
            <p className="mt-4 text-3xl font-medium tracking-tight text-white md:text-4xl">
              {tSec("footerHeadline")}
            </p>
            <p className="mt-3 max-w-md text-neutral-400">{t("description")}</p>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="https://github.com/jefersonfernandes539"
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono text-neutral-400 transition-colors hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jeferson-f-04343a111/"
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono text-neutral-400 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="#home"
              className="group inline-flex items-center gap-2 text-white"
            >
              {tSec("backToTop")}
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            </a>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-white/10 py-5 text-center font-mono text-xs tracking-wider text-neutral-500">
        © {currentYear} Jeferson Fernandes · {t("rightsReserved")}
      </div>
    </footer>
  );
}
