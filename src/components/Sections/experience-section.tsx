"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import { useTranslations } from "next-intl";

export function ExperienceSection() {
  const t = useTranslations("experienceSection");

  const workExperience = [
    {
      id: 1,
      role: t("work.1.role"),
      company: t("work.1.company"),
      period: t("work.1.period"),
      description: t.raw("work.1.description"), // array no JSON
      skills: t.raw("work.1.skills"),
    },
    {
      id: 2,
      role: t("work.2.role"),
      company: t("work.2.company"),
      period: t("work.2.period"),
      description: t.raw("work.2.description"),
      skills: t.raw("work.2.skills"),
    },
    {
      id: 3,
      role: t("work.3.role"),
      company: t("work.3.company"),
      period: t("work.3.period"),
      description: t.raw("work.3.description"),
      skills: t.raw("work.3.skills"),
    },
    {
      id: 4,
      role: t("work.4.role"),
      company: t("work.4.company"),
      period: t("work.4.period"),
      description: t.raw("work.4.description"),
      skills: t.raw("work.4.skills"),
    },
  ];

  const education = [
    {
      id: 1,
      degree: t("education.1.degree"),
      institution: t("education.1.institution"),
      period: t("education.1.period"),
      description: t("education.1.description"),
    },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section id="experience" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600 dark:text-gray-200">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experiência Profissional */}
          <div>
            <div className="flex items-center mb-8">
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-200">
                {t("work.title")}
              </h3>
            </div>
            <div className="space-y-6">
              {workExperience.map((job, index) => (
                <motion.div
                  key={job.id}
                  custom={index}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="relative border-l-4 border-blue-800 dark:border-blue-500 bg-white dark:bg-gray-800">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl dark:text-gray-100">
                            {job.role}
                          </CardTitle>
                          <CardDescription className="text-blue-800 dark:text-blue-400 font-medium">
                            {job.company}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{job.period}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {job.description.map((desc: string, i: number) => (
                        <p key={i} className="text-gray-600 dark:text-gray-300">
                          {desc}
                        </p>
                      ))}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.skills.map((skill: string, i: number) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Educação */}
          <div>
            <div className="flex items-center mb-8">
              <GraduationCap className="h-6 w-6 text-blue-800 dark:text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-200">
                {t("education.title")}
              </h3>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  custom={index}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="relative border-l-4 border-blue-800 dark:border-blue-500 bg-white dark:bg-gray-800">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl dark:text-gray-100">
                            {edu.degree}
                          </CardTitle>
                          <CardDescription className="text-blue-800 dark:text-blue-400 font-medium">
                            {edu.institution}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{edu.period}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        {edu.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
