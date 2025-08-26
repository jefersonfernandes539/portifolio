"use client";

import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Lightbulb,
  Palette,
  Server,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Progress } from "@/ui/progress";
import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("aboutSection");

  const skills = [
    { name: t("skills.javascript"), progress: 100 },
    { name: t("skills.react"), progress: 100 },
    { name: t("skills.node"), progress: 100 },
    { name: t("skills.htmlcss"), progress: 100 },
    { name: t("skills.uiux"), progress: 80 },
    { name: t("skills.database"), progress: 90 },
  ];

  const services = [
    {
      icon: Globe,
      title: t("services.web.title"),
      description: t("services.web.description"),
    },
    {
      icon: Palette,
      title: t("services.uiux.title"),
      description: t("services.uiux.description"),
    },
    {
      icon: Server,
      title: t("services.backend.title"),
      description: t("services.backend.description"),
    },
    {
      icon: Database,
      title: t("services.database.title"),
      description: t("services.database.description"),
    },
    {
      icon: Code,
      title: t("services.frontend.title"),
      description: t("services.frontend.description"),
    },
    {
      icon: Lightbulb,
      title: t("services.consulting.title"),
      description: t("services.consulting.description"),
    },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto px-4">
        {/* SOBRE MIM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
              {t("title")}
            </h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-justify">
              <p>
                {t.rich("paragraphs.p1", {
                  bold: (chunks) => (
                    <span className="font-semibold">{chunks}</span>
                  ),
                  italic: (chunks) => <span className="italic">{chunks}</span>,
                })}
              </p>
              <p>{t("paragraphs.p2")}</p>
              <p>
                {t.rich("paragraphs.p3", {
                  bold: (chunks) => (
                    <span className="font-semibold">{chunks}</span>
                  ),
                  italic: (chunks) => <span className="italic">{chunks}</span>,
                })}
              </p>
              <p>
                {t.rich("paragraphs.p4", {
                  bold: (chunks) => (
                    <span className="font-semibold">{chunks}</span>
                  ),
                })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* QUEM SOU EU + HABILIDADES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* QUEM SOU EU */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              {t("whoAmI.title")}
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>{t("whoAmI.paragraphs.p1")}</p>
              <p>{t("whoAmI.paragraphs.p2")}</p>
              <p>{t("whoAmI.paragraphs.p3")}</p>
              <p>{t("whoAmI.paragraphs.p4")}</p>
            </div>

            {/* INFO */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
                  {t("whoAmI.info.name")}:
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Jeferson Fernandes
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
                  {t("whoAmI.info.email")}:
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  fernandesjeferson539@gmail.com
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
                  {t("whoAmI.info.location")}:
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Fortaleza, Ceará
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
                  {t("whoAmI.info.availability")}:
                </h4>
                <p className="text-green-600 font-medium">
                  {t("whoAmI.info.availabilityText")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* HABILIDADES */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              {t("skills.title")}
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {skill.progress}%
                    </span>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SERVIÇOS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100">
            {t("services.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="dark:text-gray-100">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="dark:text-gray-300">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
