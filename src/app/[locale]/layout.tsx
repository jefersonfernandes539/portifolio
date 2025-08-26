import { ReactNode } from "react";
import IntlProviderWrapper from "./IntlProviderWrapper";

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = params.locale;

  let messages;
  switch (locale) {
    case "pt":
      messages = (await import("@/translations/pt.json")).default;
      break;
    case "en":
      messages = (await import("@/translations/en.json")).default;
      break;
    default:
      messages = (await import("@/translations/en.json")).default;
  }

  return (
    <IntlProviderWrapper locale={locale} messages={messages}>
      {children}
    </IntlProviderWrapper>
  );
}
