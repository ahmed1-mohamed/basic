"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { useDirection } from "@/hooks/use-direction";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const { direction } = useDirection();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <TooltipProvider delayDuration={200}>
          {children}
          <Toaster
            dir={direction}
            position={direction === "rtl" ? "top-left" : "top-right"}
            richColors
            closeButton
          />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
