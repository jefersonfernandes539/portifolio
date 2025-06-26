"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all");

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "Uma plataforma de e-commerce completa com painel administrativo e gateway de pagamento.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "fullstack",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description:
        "Dashboard interativo para visualização de dados e métricas de negócios.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Next.js", "TypeScript", "Chart.js", "Tailwind"],
      category: "frontend",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 3,
      title: "API de Gestão de Tarefas",
      description:
        "API RESTful para gerenciamento de tarefas e projetos com autenticação JWT.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
      category: "backend",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 4,
      title: "App de Finanças Pessoais",
      description:
        "Aplicativo para controle de finanças pessoais com gráficos e relatórios.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["React Native", "Firebase", "Redux", "Expo"],
      category: "mobile",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 5,
      title: "Landing Page Corporativa",
      description:
        "Landing page moderna e responsiva para empresa de tecnologia.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["HTML", "CSS", "JavaScript", "GSAP"],
      category: "frontend",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 6,
      title: "Sistema de Gerenciamento de Conteúdo",
      description:
        "CMS personalizado com editor WYSIWYG e sistema de permissões.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["React", "Node.js", "MySQL", "AWS"],
      category: "fullstack",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  const categories = [
    { value: "all", label: "Todos" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "fullstack", label: "Full Stack" },
    { value: "mobile", label: "Mobile" },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600">
            Meus Projetos
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Confira alguns dos meus trabalhos recentes. Cada projeto é uma
            oportunidade de aprendizado e crescimento profissional.
          </p>
        </motion.div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-12"
        >
          <TabsList className="mx-auto flex flex-wrap justify-center">
            {categories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="px-6"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {project.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between mt-auto">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" /> Código
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver mais projetos <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
