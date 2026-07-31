import Link from "next/link";
import { getAantallen, getUitgelichteHonden } from "@/lib/honden";
import HondCard from "./HondCard";
import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";

export default async function FeaturedDogs() {
  const [honden, aantallen] = await Promise.all([
    getUitgelichteHonden(4),
    getAantallen(),
  ]);

  if (honden.length === 0) return null;

  return (
    <section id="honden" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Uitgelicht
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl [font-family:var(--font-display)]">
              Zij wachten op hun mandje
            </h2>
          </div>
          <Link
            href="/honden/"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ink"
          >
            Alle {aantallen.honden} honden
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sand transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
              <ArrowRight />
            </span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {honden.map((hond, i) => (
            <Reveal key={hond.id} delay={i * 100}>
              <HondCard dog={hond} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
