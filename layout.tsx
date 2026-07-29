import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Gouden Mandje | Iedere hond verdient een gouden mandje",
  description:
    "Ontdek rescuehonden van betrouwbare Nederlandse stichtingen die honden uit het buitenland een tweede kans geven. Alles op een plek, adoptie altijd via de stichting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-[#FBF8F3] text-[#3D2E22] antialiased [font-family:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
