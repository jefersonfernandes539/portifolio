"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

type SupportedLocale = "pt" | "en";

export function Language() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("locales");

  const handleChangeLocale = (newLocale: SupportedLocale) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChangeLocale("en")}>
          {t("en")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeLocale("pt")}>
          {t("pt")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
