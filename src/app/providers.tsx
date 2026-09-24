"use client";

import { Toaster as Sonner } from "@/ui/sonner";
import { TooltipProvider } from "@/ui/tooltip";
import { MotionConfig } from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Respeita a preferência "reduzir movimento" do sistema
    <MotionConfig reducedMotion="user">
      <TooltipProvider>{children}</TooltipProvider>
      <Sonner />
    </MotionConfig>
  );
}
