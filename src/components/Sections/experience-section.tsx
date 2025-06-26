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

export function ExperienceSection() {
  const workExperience = [
    {
      id: 1,
      role: "Full Stack Developer",
      company: "Empresa Analógica",
      period: "2024 - Atual",
      description:
        "Atuo no desenvolvimento e manutenção de sistemas web, utilizando tecnologias modernas para entregar soluções eficientes e escaláveis. No Front-End, trabalho com JavaScript, React, Next.js, e bibliotecas de estilo como Chakra UI e ShadCN para criar interfaces dinâmicas e responsivas. No Back-End, utilizo .NET e Entity Framework para desenvolver APIs e implementar lógica de negócios robusta. Minhas responsabilidades incluem o desenvolvimento denovas funcionalidades, correção de bugs e melhorias contínuas em sistemas, sempre alinhado às necessidades do cliente e das equipes de projeto.",
      skills: ["React", "Next.js", "C#", "DotNet", "Postgresql"],
    },
    {
      id: 2,
      role: "Trainee Full Stack Developer",
      company: " Meireles e Freitas Digital Law",
      period: "2023 - 2024",
      description:
        "Atuei como Estagiario de Desenvolvedor FullStack em diversos projetos, contribuindo tanto no Back-End,utilizando C# com o framework .NET, quanto no Front-End,empregando JavaScript, especialmente com a bibliotecaReact e o framework Next.js. Durante o período de 6 meses na empresa, participei ativamente no desenvolvimento e implementação de sistemas, aprimorando funcionalidades e entregando soluções alinhadas às necessidades do negócio.",
      skills: ["React", "Next.js", "TypeScript", "DotNet", "C#"],
    },
  ];

  const education = [
    {
      id: 1,
      degree: "Graduação em Análise e Desenvolvimento de Sistemas",
      institution: "Universidade Uniasselvi",
      period: "2019 - 2023",
      description:
        "Com foco prático, abrange programação, bancos de dados, engenharia de software, redes e segurança da informação, preparando o aluno para atuar no desenvolvimento de soluções tecnológicas para empresas e organizações.",
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
    <section id="experience" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600">
            Experiência & Educação
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Minha trajetória profissional e acadêmica que me trouxe até aqui.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center mb-8">
              <Briefcase className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-600">
                Experiência Profissional
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
                  <Card className="relative border-l-4 border-blue-800">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{job.role}</CardTitle>
                          <CardDescription className="text-blue-800 font-medium">
                            {job.company}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{job.period}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="">
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

          <div>
            <div className="flex items-center mb-8">
              <GraduationCap className="h-6 w-6 text-blue-800 mr-3" />
              <h3 className="text-2xl font-bold text-gray-600">Educação</h3>
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
                  <Card className="relative border-l-4 border-blue-800">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">
                            {edu.degree}
                          </CardTitle>
                          <CardDescription className="text-blue-800 font-medium">
                            {edu.institution}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{edu.period}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{edu.description}</p>
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
