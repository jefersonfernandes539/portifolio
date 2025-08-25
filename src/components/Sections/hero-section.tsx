"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Download,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/ui/button";
import { TypewriterEffect } from "@/ui/typewriter-effect";
import Image from "next/image";

export function HeroSection() {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = () => {
    const moreProjects = document.getElementById("projects");
    if (moreProjects) {
      moreProjects.scrollIntoView({ behavior: "smooth" });
    }
  };

  const words = [
    { text: "Desenvolvedor", className: "text-gray-500 dark:text-gray-300" },
    { text: "Full", className: "text-blue-500 dark:text-blue-400" },
    { text: "Stack", className: "text-blue-500 dark:text-blue-400" },
    { text: "Web.", className: "text-gray-500 dark:text-gray-300" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-white dark:bg-gray-900"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="w-24 h-24 rounded-full border-4 border-blue-500 dark:border-blue-400 overflow-hidden mx-auto">
              <Image
                src="/image.jpeg"
                alt=""
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-500 dark:text-gray-200">
              Olá, eu sou{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Jeferson Fernandes
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <TypewriterEffect
              words={words}
              className="text-2xl md:text-3xl font-semibold"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-10"
          >
            Transformando ideias em experiências digitais excepcionais.
            Especializado em desenvolvimento web moderno com React, Next.js e
            Node.js.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              onClick={scrollToSection}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Ver Projetos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="/CVJefersonFernandes.pdf" download>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
              >
                <Download className="mr-2 h-4 w-4" />
                Baixar CV
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex justify-center space-x-4 mt-8"
          >
            <motion.a
              href="https://github.com/jefersonfernandes539"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 dark:bg-gray-700 p-3 rounded-full text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/jeferson-f-04343a111/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 dark:bg-blue-500 p-3 rounded-full text-white hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNextSection}
      >
        <ChevronDown className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-bounce" />
      </motion.div>
    </section>
  );
}
