import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = params.locale;

  const messages =
    locale === "pt"
      ? (await import("@/translations/pt.json")).default
      : (await import("@/translations/en.json")).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
