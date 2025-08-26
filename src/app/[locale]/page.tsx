"use client";
import { Footer } from "@/components/Footer/footer";
import Navbar from "@/components/NavBar/navbar";
import { AboutSection } from "@/components/Sections/about-section";
import { ContactSection } from "@/components/Sections/contact-section";
import { ExperienceSection } from "@/components/Sections/experience-section";
import { HeroSection } from "@/components/Sections/hero-section";
import { ProjectsSection } from "@/components/Sections/projects-section";
import { Toaster } from "@/ui/sonner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
}
