import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gouden Mandje | Elke hond verdient een gouden mandje",
  description:
    "Ontdek rescuehonden van Nederlandse stichtingen die honden uit het buitenland een tweede kans geven. Alles op een plek, adoptie altijd via de stichting.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Inter:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-ink antialiased [font-family:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
