import "./globals.css";

// O <html> fica em [locale]/layout.tsx para que o atributo lang acompanhe o idioma.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
