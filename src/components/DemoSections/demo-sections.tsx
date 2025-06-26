"use client";

export function DemoSections() {
  const sections = [
    { id: "home", title: "Início", content: "Seção de apresentação principal" },
    {
      id: "about",
      title: "Sobre",
      content: "Informações sobre o desenvolvedor",
    },
    {
      id: "projects",
      title: "Projetos",
      content: "Portfólio de projetos realizados",
    },
    {
      id: "experience",
      title: "Experiência",
      content: "Histórico profissional",
    },
    { id: "contact", title: "Contato", content: "Formulário de contato" },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`min-h-screen flex items-center justify-center ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          }`}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {section.title}
            </h2>
            <p className="text-xl text-gray-600">{section.content}</p>
          </div>
        </section>
      ))}
    </>
  );
}
