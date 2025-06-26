import { Loader2 } from "lucide-react";
import type React from "react";

interface SplashLoadingProps {
  message?: string;
  children: React.ReactNode;
}

export function Base({
  message = "Carregando...",
  children,
}: SplashLoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-7xl p-8">
        <div className="mb-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-lg font-medium text-muted-foreground">
            {message}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
