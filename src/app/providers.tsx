"use client";

import { Spinner } from "@/components";
import { ThemeProvider } from "@/components/theme-provider";
import { useLoading } from "@/stores/loading";
import { Toaster as Sonner } from "@/ui/sonner";
import { TooltipProvider } from "@/ui/tooltip";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SWRConfig } from "swr";

setDefaultOptions({
  locale: ptBR,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const loading = useLoading((state) => state.loading);

  return (
    <>
      {loading ? <Spinner.Base classname="hidden" /> : null}
      <SWRConfig value={{ revalidateOnFocus: false, suspense: false }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
          <Sonner />
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}
