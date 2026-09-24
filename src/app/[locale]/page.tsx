"use client";
import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer/footer";
import Navbar from "@/components/NavBar/navbar";
import { CustomCursor } from "@/components/Effects/custom-cursor";
import { Divider } from "@/components/Effects/reveal";
import { AboutSection } from "@/components/Sections/about-section";
import { ContactSection } from "@/components/Sections/contact-section";
import { ExperienceSection } from "@/components/Sections/experience-section";
import { HeroSection } from "@/components/Sections/hero-section";
import { ProjectsSection } from "@/components/Sections/projects-section";
import { useIsDesktop } from "@/lib/use-is-desktop";

const CosmosBackground = dynamic(
  () => import("@/components/Effects/cosmos-background"),
  { ssr: false }
);

export default function Home() {
  const isDesktop = useIsDesktop();

  return (
    <div className="relative min-h-screen">
      {/* Fundo cósmico: WebGL no desktop, estrelas em CSS no celular */}
      {isDesktop ? (
        <>
          <CosmosBackground />
          <CustomCursor />
        </>
      ) : (
        <div className="fixed inset-0 -z-10 bg-stars opacity-60" aria-hidden />
      )}

      <Navbar />
      <main>
        <HeroSection />
        <Divider />
        <AboutSection />
        <Divider />
        <ProjectsSection />
        <Divider />
        <ExperienceSection />
        <Divider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
