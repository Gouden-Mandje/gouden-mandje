import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import HondCard from "@/components/HondCard";
import Nav from "@/components/Nav";
import { alleGroepen, groepMetSlug } from "@/lib/groepen";
import { getHonden } from "@/lib/honden";

/**
 * Groepspagina: alle honden met één gedeeld kenmerk.
 *
 * Bijvoorbeeld /overzicht/oudere-honden/ of /overzicht/honden-in-griekenland/.
 * Deze pagina's bestaan omdat mensen op groepen zoeken en niet op de naam van
 * een hond die ze nog niet kennen. Zie lib/groepen.ts voor de toelichting.
 *
 * Waarom onder /overzicht/ en niet onder /honden/: daar zitten de pagina's van
 * de honden zelf al, op /honden/<id>/, en twee soorten dynamische pagina's op
 * dezelfde plek kan niet.
 *
 * En bewust niet /adopteren/. Dat zou suggereren dat je hier kunt adopteren,
 * en dat kan juist niet: adoptie loopt altijd via de stichting. Het adres van
 * een pagina hoort geen belofte te doen die de site niet waarmaakt.
 *
 * Bewust een gewone serverpagina zonder filters. Wie wil filteren gaat naar
 * /honden/; hier is de vraag al beantwoord door het adres zelf.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  const honden = await getHonden();
  return alleGroepen(honden).map((groep) => ({ groep: groep.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ groep: string }>;
}): Promise<Metadata> {
  const { groep: slug } = await params;
  const honden = await getHonden();
  const groep = groepMetSlug(honden, slug);

  if (!groep) return { title: "Niet gevonden | Gouden Mandje" };

  const aantal = honden.filter(groep.hoortErbij).length;

  return {
    title: `${groep.titel} | Gouden Mandje`,
    description: groep.omschrijving,
    alternates: { canonical: `https://www.gouden-mandje.nl/overzicht/${groep.slug}/` },
    openGraph: {
      title: `${aantal} ${groep.titel.toLowerCase()}`,
      description: groep.omschrijving,
      type: "website",
    },
  };
}

export default async function GroepPagina({
  params,
}: {
  params: Promise<{ groep: string }>;
}) {
  const { groep: slug } = await params;
  const honden = await getHonden();
  const groep = groepMetSlug(honden, slug);

  if (!groep) notFound();

  const passend = honden.filter(groep.hoortErbij);

  return (
    <main>
      <Nav />

      <section className="px-4 pb-20 pt-24 sm:px-6 sm:pb-32 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/honden/"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-taupe transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> Alle honden
          </Link>

          <div className="mb-7 mt-6 max-w-2xl sm:mb-10">
            <h1 className="text-[2rem] font-medium leading-tight tracking-tight sm:text-6xl [font-family:var(--font-display)]">
              {groep.titel}
            </h1>
            <p className="mt-3 text-[17px] leading-relaxed text-taupe sm:mt-4 sm:text-lg">
              {groep.inleiding}
            </p>
            <p className="mt-4 text-[15px] text-taupe">
              <span className="font-semibold text-ink">{passend.length}</span>{" "}
              {passend.length === 1 ? "hond" : "honden"} gevonden. Adoptie loopt altijd
              via de stichting zelf.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4">
            {passend.map((hond) => (
              <HondCard key={hond.id} dog={hond} />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
