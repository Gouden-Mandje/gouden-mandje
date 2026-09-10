"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { leesSelectie } from "@/lib/selectie";

/**
 * De knop terug naar het overzicht op de hondpagina.
 *
 * Neemt de filters mee die de bezoeker had staan. Zonder dat gooide deze knop
 * je hele zoektocht weg: je had gefilterd op klein en Nederland, klikte op een
 * hond, ging terug en stond weer bij alle duizend.
 *
 * De filters staan in sessionStorage omdat deze pagina statisch gebouwd is en
 * dus niet weet waar je vandaan komt. Zie lib/selectie.ts.
 *
 * Zonder selectie, bijvoorbeeld bij binnenkomst via een gedeelde link, wijst
 * hij gewoon naar het volledige overzicht.
 *
 * Hij bestaat in twee vormen, met hetzelfde adres:
 *
 *   1. **Bovenaan de pagina**, als tekstlink. Die is er voor wie halverwege
 *      stopt met lezen en omhoog scrolt.
 *
 *   2. **Zwevend midden onderaan, alleen op mobiel.** Wie het hele verhaal en
 *      de gegevens leest, staat onderaan een lange pagina en moet anders eerst
 *      helemaal terug omhoog. Dezelfde pil als de filterknop op het overzicht.
 *      Midden en niet in een hoek, zodat hij met beide duimen te bereiken is.
 */
export default function TerugKnop() {
  const [adres, setAdres] = useState("/honden/");
  const [gefilterd, setGefilterd] = useState(false);

  // Pas in de browser lezen: sessionStorage bestaat niet tijdens het bouwen.
  useEffect(() => {
    const selectie = leesSelectie();
    if (selectie?.filters) {
      setAdres(`/honden/?${selectie.filters}`);
      setGefilterd(true);
    }
  }, []);

  return (
    <>
      <Link
        href={adres}
        className="inline-flex items-center gap-2 text-[15px] font-medium text-taupe transition-colors hover:text-ink"
      >
        <span aria-hidden="true">←</span>
        {gefilterd ? "Terug naar je zoekresultaat" : "Terug naar alle honden"}
      </Link>

      {/* Zwevende knop: dezelfde vorm als de filterknop op het overzicht,
          maar midden onderaan. Links was met één hand niet te doen voor wie
          zijn telefoon rechts vasthoudt. */}
      <Link
        href={adres}
        aria-label={gefilterd ? "Terug naar je zoekresultaat" : "Terug naar alle honden"}
        className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_26px_-8px_rgba(61,46,34,0.65)] sm:hidden"
      >
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
          <path
            d="M12 4.5L6.5 10l5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Terug
      </Link>
    </>
  );
}
