"use client";

import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

interface Props {
  children: ReactNode;
  locale: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: Record<string, any>;
}

export default function IntlProviderWrapper({
  children,
  locale,
  messages,
}: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="America/Fortaleza"
    >
      {children}
    </NextIntlClientProvider>
  );
}
