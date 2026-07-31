import type { Metadata } from "next";
import Footer from "@/components/Footer";
import HondenFilter from "@/components/HondenFilter";
import Nav from "@/components/Nav";
import { getAantallen, getHonden } from "@/lib/honden";

export const metadata: Metadata = {
  title: "Alle honden | Gouden Mandje",
  description:
    "Bekijk alle rescuehonden die via aangesloten stichtingen een thuis zoeken. Filter op land, leeftijd, grootte en geslacht.",
};

export default async function HondenPagina() {
  const [honden, aantallen] = await Promise.all([getHonden(), getAantallen()]);

  return (
    <main>
      <Nav />

      <section className="px-4 pb-24 pt-32 sm:px-6 sm:pb-32 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Alle honden
            </p>
            <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-6xl [font-family:var(--font-display)]">
              Zij zoeken een thuis
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-taupe">
              {aantallen.honden} honden van{" "}
              {aantallen.organisaties === 1
                ? "één stichting"
                : `${aantallen.organisaties} stichtingen`}
              , op één plek. Adoptie loopt altijd via de stichting zelf.
            </p>
          </div>

          <HondenFilter honden={honden} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
