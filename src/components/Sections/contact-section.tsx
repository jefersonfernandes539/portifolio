"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import emailjs from "emailjs-com";
import { useTranslations } from "next-intl";

export function ContactSection() {
  const t = useTranslations("contact");

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
      alert(t("success"));
    } catch (err) {
      console.error("Erro ao enviar email:", err);
      alert(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("email"),
      value: "fernandesjeferson539@gmail.com",
      link: "mailto:fernandesjeferson539@gmail.com",
    },
    {
      icon: Phone,
      title: t("phone"),
      value: "+55 (85) 99820-2691",
      link: "tel:+5585998202691",
    },
    {
      icon: MapPin,
      title: t("location"),
      value: "Fortaleza, CE - Brasil",
      link: "https://www.google.com/maps/place/Fortaleza+-+CE/@-3.793299,-38.6844283,11z",
    },
  ];

  const floatingCircles = [
    {
      top: "0%",
      left: "10%",
      bg: "bg-purple-300 dark:bg-purple-700",
      size: "w-72 h-72",
      delay: 0,
    },
    {
      top: "20%",
      right: "5%",
      bg: "bg-yellow-300 dark:bg-yellow-600",
      size: "w-64 h-64",
      delay: 1,
    },
    {
      bottom: "0%",
      left: "25%",
      bg: "bg-blue-300 dark:bg-blue-800",
      size: "w-80 h-80",
      delay: 2,
    },
  ];

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Fundo animado */}
      <div className="absolute inset-0 z-0">
        {floatingCircles.map((circle, index) => (
          <motion.div
            key={index}
            className={`absolute ${circle.size} ${circle.bg} rounded-full mix-blend-multiply filter blur-xl opacity-30`}
            style={{
              top: circle.top,
              left: circle.left,
              right: circle.right,
              bottom: circle.bottom,
            }}
            animate={{
              y: ["0%", "60%", "0%"],
              x: ["0%", "35%", "0%"],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              delay: circle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl w-full mx-auto px-4 z-10">
        {/* Header */}
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
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8 rounded"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gap-y-10 relative z-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className="overflow-hidden bg-gray-50 dark:bg-gray-800"
                >
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 dark:text-gray-100">
                        {info.title}
                      </h3>
                      <a
                        href={info.link}
                        className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors break-words"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="dark:text-gray-200">
                        {t("form.name")}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        className="w-full"
                        placeholder={t("form.namePlaceholder")}
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="dark:text-gray-200">
                        {t("form.email")}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full"
                        placeholder={t("form.emailPlaceholder")}
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="dark:text-gray-200">
                      {t("form.subject")}
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      className="w-full"
                      placeholder={t("form.subjectPlaceholder")}
                      required
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="dark:text-gray-200">
                      {t("form.message")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      className="w-full"
                      placeholder={t("form.messagePlaceholder")}
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("form.sending") : t("form.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
