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
      description: t.raw("work.1.description"),
      skills: t.raw("work.1.skills"),
      type: "work" as const,
    },
    {
      id: 2,
      role: t("work.2.role"),
      company: t("work.2.company"),
      period: t("work.2.period"),
      description: t.raw("work.2.description"),
      skills: t.raw("work.2.skills"),
      type: "work" as const,
    },
    {
      id: 3,
      role: t("work.3.role"),
      company: t("work.3.company"),
      period: t("work.3.period"),
      description: t.raw("work.3.description"),
      skills: t.raw("work.3.skills"),
      type: "work" as const,
    },
    {
      id: 4,
      role: t("work.4.role"),
      company: t("work.4.company"),
      period: t("work.4.period"),
      description: t.raw("work.4.description"),
      skills: t.raw("work.4.skills"),
      type: "work" as const,
    },
  ];

  const education = [
    {
      id: 5,
      degree: t("education.1.degree"),
      institution: t("education.1.institution"),
      period: t("education.1.period"),
      description: t("education.1.description"),
      type: "education" as const,
    },
  ];

  const timelineItems = [...workExperience, ...education].sort((a, b) => {
    return b.id - a.id;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600 dark:text-gray-200">
            {t("title")}
          </h2>
          <motion.div
            className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          ></motion.div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          ></motion.div>

          <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-600 dark:border-blue-400 z-10 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                >
                  {item.type === "work" ? (
                    <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400 transform rotate-0" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400 transform rotate-0" />
                  )}
                </motion.div>

                <div
                  className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}
                >
                  <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-0 overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl dark:text-gray-100 font-semibold">
                            {item.type === "work" ? item.role : item.degree}
                          </CardTitle>
                          <CardDescription className="text-blue-600 dark:text-blue-400 font-medium text-base">
                            {item.type === "work"
                              ? item.company
                              : item.institution}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                        >
                          {item.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {item.type === "work" ? (
                        <>
                          {item.description.map((desc: string, i: number) => (
                            <p
                              key={i}
                              className="text-gray-600 dark:text-gray-300 leading-relaxed"
                            >
                              {desc}
                            </p>
                          ))}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {item.skills.map((skill: string, i: number) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Timeline */}
        <motion.div
          className="block md:hidden relative max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute left-8 w-1 bg-gradient-to-b from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          ></motion.div>

          <div className="space-y-8">
            {timelineItems.map((item) => (
              <motion.div
                key={`mobile-${item.id}`}
                variants={itemVariants}
                className="relative flex items-start"
              >
                <motion.div
                  className="absolute left-6 w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-3 border-blue-600 dark:border-blue-400 z-10 flex items-center justify-center shadow-lg mt-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                >
                  {item.type === "work" ? (
                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400 transform rotate-0" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400 transform rotate-0" />
                  )}
                </motion.div>

                <div className="ml-16 w-full">
                  <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg dark:text-gray-100">
                            {item.type === "work" ? item.role : item.degree}
                          </CardTitle>
                          <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                            {item.type === "work"
                              ? item.company
                              : item.institution}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 dark:bg-blue-900/30"
                        >
                          {item.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {item.type === "work" ? (
                        <>
                          {item.description.map((desc: string, i: number) => (
                            <p
                              key={i}
                              className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                            >
                              {desc}
                            </p>
                          ))}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.skills.map((skill: string, i: number) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
