import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Jeferson Fernandes",
  description: "Portfólio profissional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
