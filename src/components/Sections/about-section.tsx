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
    { name: "JavaScript/TypeScript", progress: 90 },
    { name: "React & Next.js", progress: 85 },
    { name: "Node.js", progress: 80 },
    { name: "HTML & CSS", progress: 95 },
    { name: "UI/UX Design", progress: 75 },
    { name: "Database Management", progress: 70 },
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
    <section id="about" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600">
            Sobre Mim
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sou um desenvolvedor full stack apaixonado por criar soluções
            digitais elegantes e funcionais. Com mais de 5 anos de experiência,
            tenho trabalhado com diversas tecnologias e frameworks para entregar
            produtos de alta qualidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Quem sou eu</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Olá! Sou Jeferson Fernandes, um desenvolvedor full stack. Minha
                jornada na programação começou há mais de 5 anos, e desde então
                venho construindo aplicações web modernas e intuitivas.
              </p>
              <p>
                Formado em Análise e desenvolvimento de Sistemas, tenho me
                especializado em tecnologias como React, Next.js, Node.js,
                DotNet e bancos de dados SQL e NoSQL.
              </p>
              <p>
                Minha abordagem combina habilidades técnicas sólidas com um
                olhar atento para design e experiência do usuário. Acredito que
                o melhor software não é apenas funcional, mas também agradável
                de usar.
              </p>
              <p>
                Quando não estou codando, gosto de contribuir para projetos open
                source, escrever artigos técnicos e participar de eventos da
                comunidade de desenvolvimento.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2">Nome:</h4>
                <p className="text-gray-600">Jeferson Fernandes</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Email:</h4>
                <p className="text-gray-600">fernandesjeferson539@gmail.com</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Localização:</h4>
                <p className="text-gray-600">Fortaleza, Ceará</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Disponibilidade:</h4>
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
            <h3 className="text-2xl font-bold mb-6">Minhas Habilidades</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-blue-600">{skill.progress}%</span>
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
          <h3 className="text-2xl font-bold mb-10 text-center">
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
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
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
