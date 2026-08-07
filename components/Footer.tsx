import Link from "next/link";
import { SLOGAN } from "@/lib/data";
import { alleGroepen } from "@/lib/groepen";
import { getHonden } from "@/lib/honden";
import { BasketMark } from "./Icons";

const LINKS: [string, string][] = [
  ["Over ons", "/over-ons/"],
  ["Voor stichtingen", "/voor-stichtingen/"],
  ["Contact", "/contact/"],
  ["Privacy", "/privacy/"],
];

/**
 * De voettekst, met onderaan verwijzingen naar de groepspagina's.
 *
 * Die groepen staan hier en niet op het hondenoverzicht. Twee redenen: ze
 * zitten hier niemand in de weg, en ze staan nu op elke pagina van de site in
 * plaats van op één. Dat laatste telt voor een zoekmachine: een verwijzing
 * vanuit de voettekst geldt op alle duizend pagina's.
 *
 * Bewust wel zichtbaar. Links verbergen voor bezoekers en tonen aan
 * zoekmachines is precies waar Google op let, en het levert niets op dat de
 * sitemap niet ook doet.
 */
export default async function Footer() {
  const honden = await getHonden();
  const groepen = alleGroepen(honden);

  return (
    <footer className="border-t border-sand px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink">
                <BasketMark />
              </span>
              <span className="text-lg font-semibold tracking-tight [font-family:var(--font-display)]">
                Gouden Mandje
              </span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-taupe">
              Het platform waar je rescuehonden van Nederlandse stichtingen
              ontdekt. Adoptie gebeurt altijd via de stichting zelf.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-16 gap-y-3 text-[15px] font-medium text-[#6B5847]"
            aria-label="Footer"
          >
            {LINKS.map(([label, href]) => (
              <Link key={label} href={href} className="transition-colors hover:text-ink">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {groepen.length > 0 && (
          <div className="mt-12 border-t border-sand pt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-taupe">
              Direct naar
            </p>
            <nav
              className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-taupe"
              aria-label="Overzichten"
            >
              {groepen.map((groep) => (
                <Link
                  key={groep.slug}
                  href={`/overzicht/${groep.slug}/`}
                  className="transition-colors hover:text-ink"
                >
                  {groep.titel.replace(" die een thuis zoeken", "")}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <div className="mt-12 flex flex-col gap-2 border-t border-sand pt-8 text-sm text-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gouden Mandje. Alle rechten voorbehouden.</p>
          <p>{SLOGAN}.</p>
        </div>
      </div>
    </footer>
  );
}
