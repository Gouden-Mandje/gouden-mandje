"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { leesSelectie } from "@/lib/selectie";

/**
 * De knop terug naar het overzicht, bovenaan de hondpagina.
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
    <Link
      href={adres}
      className="inline-flex items-center gap-2 text-[15px] font-medium text-taupe transition-colors hover:text-ink"
    >
      <span aria-hidden="true">←</span>
      {gefilterd ? "Terug naar je zoekresultaat" : "Terug naar alle honden"}
    </Link>
  );
}
