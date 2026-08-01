import { getAantallen, getHonden } from "@/lib/honden";
import Reveal from "./Reveal";
import SearchFormulier from "./SearchFormulier";

/**
 * Het zoekblok op de homepage.
 *
 * Dit deel draait op de server: het telt de echte honden en leidt de landenlijst
 * af uit de data. Het formulier zelf is een client component, want daar moet op
 * geklikt kunnen worden.
 */
export default async function SearchSection() {
  const [honden, aantallen] = await Promise.all([getHonden(), getAantallen()]);

  const landen = Array.from(
    new Set(honden.map((hond) => hond.country).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, "nl"));

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8">
      <Reveal className="mx-auto -mt-14 max-w-6xl sm:-mt-16">
        <div className="rounded-[2rem] border border-sand bg-white p-6 shadow-[0_24px_60px_-20px_rgba(61,46,34,0.18)] sm:p-8">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-medium tracking-tight [font-family:var(--font-display)] sm:text-2xl">
                Vind jouw match
              </h2>
              <p className="mt-1 text-[15px] text-taupe">
                Alle honden van aangesloten stichtingen, op een plek.
              </p>
            </div>
            <p className="hidden text-sm text-taupe sm:block">
              {aantallen.honden} {aantallen.honden === 1 ? "hond" : "honden"} beschikbaar
            </p>
          </div>

          <SearchFormulier landen={landen} />
        </div>
      </Reveal>
    </section>
  );
}
