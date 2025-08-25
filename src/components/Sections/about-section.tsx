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

export function AboutSection() {
  const skills = [
    { name: "JavaScript/TypeScript", progress: 100 },
    { name: "React & Next.js", progress: 100 },
    { name: "Node.js", progress: 100 },
    { name: "HTML & CSS", progress: 100 },
    { name: "UI/UX Design", progress: 80 },
    { name: "Database Management", progress: 90 },
  ];

  const services = [
    {
      icon: Globe,
      title: "Desenvolvimento Web",
      description:
        "Criação de sites e aplicações web responsivas e de alta performance.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Design de interfaces intuitivas e experiências de usuário agradáveis.",
    },
    {
      icon: Server,
      title: "Backend Development",
      description: "Desenvolvimento de APIs robustas e sistemas escaláveis.",
    },
    {
      icon: Database,
      title: "Database Design",
      description:
        "Modelagem e otimização de bancos de dados para suas aplicações.",
    },
    {
      icon: Code,
      title: "Desenvolvimento Frontend",
      description:
        "Interfaces modernas com React, Next.js e outras tecnologias atuais.",
    },
    {
      icon: Lightbulb,
      title: "Consultoria Técnica",
      description:
        "Orientação estratégica para projetos digitais e soluções tecnológicas.",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {" "}
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
              Sobre Mim
            </h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-justify">
              <p>
                Sou{" "}
                <span className="font-semibold">Desenvolvedor FullStack</span>{" "}
                com
                <span className="font-semibold"> 2 anos de experiência</span>,
                especializado em{" "}
                <span>
                  Javascript, Typescript, React, Next.js, C#, .NET e Entity
                  Framework
                </span>
                .
              </p>

              <p>
                Atuo no desenvolvimento de aplicações completas, desde a camada
                de interface até a lógica de negócio e integração com bancos de
                dados.
              </p>

              <p>
                Já participei de projetos em{" "}
                <span className="font-semibold">empresas privadas</span> e{" "}
                <span className="font-semibold">iniciativas públicas</span>,
                como o{" "}
                <span className="italic">
                  Cartografia da Cultura & Rede Mobilize
                </span>
                , sempre focando em entregar soluções digitais eficientes,
                escaláveis e com excelente experiência para o usuário.
              </p>

              <p>
                Atualmente, curso o{" "}
                <span className="font-semibold">
                  5º semestre de Análise e Desenvolvimento de Sistemas
                </span>{" "}
                e sigo em constante evolução profissional.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Quem sou eu
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Olá! Sou Jeferson Fernandes, um desenvolvedor full stack
                apaixonado por tecnologia. Minha jornada começou há alguns anos
                com curiosidade em programação, e desde então venho evoluindo
                para construir aplicações web modernas e funcionais.
              </p>
              <p>
                Atualmente curso o 5º semestre de Análise e Desenvolvimento de
                Sistemas e já atuei em projetos que utilizam tecnologias como
                React, Next.js, TypeScript, .NET, Entity Framework e bancos de
                dados relacionais.
              </p>
              <p>
                Tenho como foco unir performance, usabilidade e boas práticas de
                desenvolvimento para entregar soluções que realmente façam
                diferença para empresas e usuários.
              </p>
              <p>
                Fora do mundo do código, gosto de aprender coisas novas,
                compartilhar conhecimento e participar de iniciativas que
                fortalecem a comunidade de tecnologia.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
                  Nome:
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Jeferson Fernandes
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
                  Email:
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  fernandesjeferson539@gmail.com
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
                  Localização:
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Fortaleza, Ceará
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
                  Disponibilidade:
                </h4>
                <p className="text-green-600 font-medium">
                  Disponível para projetos
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Minhas Habilidades
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100">
            Serviços Oferecidos
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
