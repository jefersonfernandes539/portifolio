"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { useTranslations } from "next-intl";
import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServicesSection = (services: ServiceItem[]) => {
  const t = useTranslations();

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const cardVariants = {
    rest: {
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const iconVariants = {
    rest: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.2 },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

  return (
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
              <motion.div
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                className="cursor-pointer"
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-0 shadow-md">
                  <CardHeader>
                    <motion.div
                      variants={iconVariants}
                      className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4"
                    >
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </motion.div>
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
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ServicesSection;
