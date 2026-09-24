"use client";

import type React from "react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Reveal, SectionHeader } from "@/components/Effects/reveal";

const fieldClass =
  "rounded-none border-white/15 bg-black/40 text-white placeholder:text-neutral-600 focus-visible:border-sky-glow focus-visible:ring-sky-glow/30";

export function ContactSection() {
  const t = useTranslations("contact");
  const tNav = useTranslations("navbar");
  const tSec = useTranslations("sections");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          title: formData.title,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setFormData({ name: "", email: "", title: "", message: "" });
      toast.success(t("success"));
    } catch (err) {
      console.error("Erro ao enviar email:", err);
      toast.error(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      label: t("email"),
      value: "fernandesjeferson539@gmail.com",
      link: "mailto:fernandesjeferson539@gmail.com",
    },
    {
      label: t("phone"),
      value: "+55 (85) 99820-2691",
      link: "tel:+5585998202691",
    },
    {
      label: t("location"),
      value: "Fortaleza, CE - Brasil",
      link: "https://www.google.com/maps/place/Fortaleza+-+CE/@-3.793299,-38.6844283,11z",
    },
  ];

  const fields = [
    { id: "name", type: "text", label: t("form.name"), placeholder: t("form.namePlaceholder") },
    { id: "email", type: "email", label: t("form.email"), placeholder: t("form.emailPlaceholder") },
  ] as const;

  return (
    <section id="contact" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="04"
          label={tNav("contact")}
          title={tSec("contactHeadline")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <ul className="border-t border-white/10">
              {contactInfo.map((info) => (
                <li key={info.label} className="border-b border-white/10">
                  <a
                    href={info.link}
                    {...(info.link.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="group flex items-center justify-between gap-4 py-6"
                  >
                    <span>
                      <span className="label-mono block text-neutral-500">
                        {info.label}
                      </span>
                      <span className="mt-2 block break-all text-lg text-white transition-colors group-hover:text-amber-glow">
                        {info.value}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-glow" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="frame space-y-6 p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="label-mono text-neutral-400">
                      {field.label}
                    </Label>
                    <Input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      className={fieldClass}
                      placeholder={field.placeholder}
                      required
                      value={formData[field.id]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="label-mono text-neutral-400">
                  {t("form.subject")}
                </Label>
                <Input
                  id="title"
                  name="title"
                  className={fieldClass}
                  placeholder={t("form.subjectPlaceholder")}
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="label-mono text-neutral-400">
                  {t("form.message")}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  className={fieldClass}
                  placeholder={t("form.messagePlaceholder")}
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-2 bg-white px-5 py-3.5 text-sm font-medium text-black transition-colors hover:bg-amber-glow disabled:opacity-50"
              >
                {isSubmitting ? t("form.sending") : t("form.send")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
