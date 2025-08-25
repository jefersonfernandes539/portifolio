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
      role: "Estagiário de Projetos",
      company: "Meireles e Freitas Digital Law | Fortaleza, CE",
      period: "Outubro/2023 – Janeiro/2024",
      description: [
        "Desenvolvimento de sistema de gestão e geração automatizada de contratos, integrando Next.js, React e .NET.",
        "Implementação de funcionalidades personalizadas, testes e otimização de processos.",
      ],
      skills: ["React", "Next.js", "C#", "DotNet"],
    },
    {
      id: 2,
      role: "Desenvolvedor Full Stack",
      company: "Almost Hackers | São Paulo, SP",
      period: "Fevereiro/2024 – Julho/2025",
      description: [
        "Desenvolvimento completo de aplicações frontend e backend, alinhadas às necessidades dos clientes.",
        "Frontend: React, Next.js, TypeScript, Zustand, Chakra UI, ShadCN, Bootstrap (interfaces modernas e responsivas).",
        "Backend: C# .NET, Entity Framework, PostgreSQL, Clean Architecture, autenticação via JWT, integração com APIs externas (WhatsApp, chatbot).",
        "Projeto destaque: Plataforma de investimentos financeiros multi-moeda (BRL/USD) com conversão em tempo real, gráficos interativos, histórico de aportes e retiradas, automação de saques e painel administrativo (Staff).",
        "Responsável por modelagem, definição de regras de negócio e desenvolvimento end-to-end.",
      ],
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Zustand",
        "Chakra UI",
        "ShadCN",
        "Bootstrap",
        "C# .NET",
        "Entity Framework",
        "PostgreSQL",
        "JWT",
      ],
    },
    {
      id: 3,
      role: "Desenvolvedor Full Stack (Freelance PJ)",
      company: "Eyna | Projeto Interno / Visão Computacional",
      period: "2025",
      description: [
        "Desenvolvimento de Sistema de Gestão de Turnos e Presença multi-tenant.",
        "Confirmação de turnos com automação via WhatsApp e chamadas telefônicas, registro e rastreamento de respostas.",
        "Implementação de lógica de substituição de funcionários, auditoria completa de dados e histórico detalhado de turnos.",
        "Projeto complementar: desenvolvimento de porteiro eletrônico inteligente com automação via N8N.",
      ],
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Zustand",
        "Chakra UI",
        "ShadCN",
        "Bootstrap",
        "Python",
        "NestJS",
        "PostgreSQL",
        "Drizzle ORM",
        "JWT",
        "APIs REST",
        "Webhooks",
        "N8N",
      ],
    },
    {
      id: 4,
      role: "Desenvolvedor Full Stack (Freelance PJ)",
      company:
        "Cartografia da Cultura & Rede Mobiliza | Governo do Ceará / Prefeitura de Fortaleza",
      period: "2025",
      description: [
        "Desenvolvimento do site institucional com React e Next.js no frontend e backend em C# .NET.",
        "Integração com Google Forms para captação de dados.",
        "Criação de plataforma digital inclusiva para mapeamento de mais de 100 organizações culturais.",
        "Desenvolvimento de API REST para cadastramento de localidades e integração com PostgreSQL.",
        "Implementação de mapa interativo usando Leaflet API.",
        "Uso de Motion ReactJS e ShadCN para interface fluida e moderna.",
      ],
      skills: [
        "TypeScript",
        "JavaScript",
        "React",
        "Next.js",
        "ShadCN",
        "C# .NET",
        "PostgreSQL",
        "API REST",
        "Leaflet",
        "ShadCN",
        "Motion ReactJS",
        "Integração Google Forms",
      ],
    },
  ];

  const education = [
    {
      id: 1,
      degree: "Graduação em Análise e Desenvolvimento de Sistemas",
      institution: "Universidade Uniasselvi",
      period: "Em andamento, 5º semestre – Previsão de término: 2026",
      description:
        "Com foco prático, abrange programação, bancos de dados, engenharia de software, redes e segurança da informação, preparando o aluno para atuar no desenvolvimento de soluções tecnológicas para empresas e organizações.",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600 dark:text-gray-200">
            Experiência & Educação
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Minha trajetória profissional e acadêmica que me trouxe até aqui.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experiência Profissional */}
          <div>
            <div className="flex items-center mb-8">
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-200">
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
                      {job.description.map((desc, i) => (
                        <p key={i} className="text-gray-600 dark:text-gray-300">
                          {desc}
                        </p>
                      ))}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.skills.map((skill, i) => (
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
                Educação
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
