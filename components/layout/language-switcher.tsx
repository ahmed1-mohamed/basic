"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");
  const [isPending, startTransition] = React.useTransition();

  const nextLocale: Locale = currentLocale === "en" ? "ar" : "en";
  const targetLabel = currentLocale === "en" ? "العربية" : "English";
  const targetFlag = currentLocale === "en" ? "🇸🇦" : "🇺🇸";

  const handleToggleLanguage = () => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleLanguage}
          disabled={isPending}
          className="h-9 gap-1.5 px-2.5 text-muted-foreground hover:text-foreground transition-transform active:scale-95"
          aria-label={`Switch to ${targetLabel}`}
        >
          <Globe className="h-4 w-4 text-primary" />
          <span className="font-semibold text-xs">{targetLabel}</span>
          <span className="text-sm">{targetFlag}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{t("language")}: {targetLabel}</p>
      </TooltipContent>
    </Tooltip>
  );
}
