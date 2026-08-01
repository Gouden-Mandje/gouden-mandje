"use client";

import { useEffect, useMemo, useState } from "react";
import type { Hond } from "@/lib/honden";
import HondCard from "./HondCard";
import {
  ALLE,
  GESLACHTEN,
  GROOTTES,
  LEEFTIJDGROEPEN,
} from "./SearchFormulier";

/**
 * Filters op het volledige hondenoverzicht.
 *
 * Het filteren gebeurt in de browser op een lijst die al bij de bezoeker is.
 * Bij enkele honderden honden is dat direct en heb je er geen server voor
 * nodig. Groeit het naar duizenden, dan is dit het punt om over te stappen op
 * filteren tijdens de build of op een echte zoekindex.
 *
 * De begininstelling komt uit de URL, zodat het zoekblok op de homepage hier
 * naartoe kan sturen en je een gefilterd overzicht kunt delen.
 */

function Keuze({
  label,
  waarde,
  opties,
  onWijzig,
}: {
  label: string;
  waarde: string;
  opties: { waarde: string; label: string }[];
  onWijzig: (waarde: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-taupe">
        {label}
      </span>
      <div className="relative">
        <select
          value={waarde}
          onChange={(event) => onWijzig(event.target.value)}
          aria-label={label}
          className="w-full cursor-pointer appearance-none rounded-2xl border border-sand bg-cream px-4 py-3.5 pr-9 text-[15px] font-medium text-ink outline-none transition-all duration-300 hover:border-gold focus:border-gold focus:ring-4 focus:ring-gold/15"
        >
          <option value={ALLE}>{ALLE}</option>
          {opties.map((optie) => (
            <option key={optie.waarde} value={optie.waarde}>
              {optie.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m6 8 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </label>
  );
}

export default function HondenFilter({ honden }: { honden: Hond[] }) {
  const [zoek, setZoek] = useState("");
  const [land, setLand] = useState(ALLE);
  const [leeftijd, setLeeftijd] = useState(ALLE);
  const [grootte, setGrootte] = useState(ALLE);
  const [geslacht, setGeslacht] = useState(ALLE);

  // Keuzes uit de URL overnemen. Bewust in een effect en niet met
  // useSearchParams: dat laatste vraagt bij een statische export om een
  // Suspense-grens en levert niets extra's op voor iets dat pas in de browser
  // hoeft te gebeuren.
  useEffect(() => {
    const parameters = new URLSearchParams(window.location.search);
    const zet = (naam: string, setter: (waarde: string) => void) => {
      const waarde = parameters.get(naam);
      if (waarde) setter(waarde);
    };
    zet("zoek", setZoek);
    zet("land", setLand);
    zet("leeftijd", setLeeftijd);
    zet("grootte", setGrootte);
    zet("geslacht", setGeslacht);
  }, []);

  // Het filter gaat over waar de hond VERBLIJFT. Dat is wat een bezoeker wil
  // weten: kan ik deze hond gaan ontmoeten of zit hij nog in het buitenland.
  // Nederland staat er dus gewoon tussen als optie.
  const landen = useMemo(() => {
    const uniek = Array.from(new Set(honden.map((hond) => hond.country).filter(Boolean)));
    uniek.sort((a, b) => a.localeCompare(b, "nl"));
    return uniek.map((naam) => ({ waarde: naam, label: naam }));
  }, [honden]);

  // Honden zonder bekende grootte tellen mee bij elke keuze. Niet elke
  // organisatie vermeldt het, en een hond verbergen die misschien wel past is
  // vervelender dan er een tonen die het net niet is.
  const zonderGrootte = useMemo(
    () => honden.filter((hond) => hond.size === "onbekend").length,
    [honden]
  );

  const gefilterd = useMemo(() => {
    const zoekterm = zoek.trim().toLowerCase();
    const groep = LEEFTIJDGROEPEN.find((g) => g.label === leeftijd);

    return honden.filter((hond) => {
      if (land !== ALLE && hond.country !== land) return false;
      // "onbekend" valt nooit weg: zie de toelichting bij zonderGrootte.
      if (grootte !== ALLE && hond.size !== grootte && hond.size !== "onbekend") return false;
      if (geslacht !== ALLE && hond.gender !== geslacht) return false;

      if (groep) {
        if (hond.ageMonths === null) return false;
        if (hond.ageMonths < groep.min || hond.ageMonths > groep.max) return false;
      }

      if (zoekterm) {
        const doorzoekbaar = `${hond.name} ${hond.breed} ${hond.character} ${hond.organisation}`;
        if (!doorzoekbaar.toLowerCase().includes(zoekterm)) return false;
      }

      return true;
    });
  }, [honden, zoek, land, leeftijd, grootte, geslacht]);

  const filtersActief =
    zoek !== "" || land !== ALLE || leeftijd !== ALLE || grootte !== ALLE || geslacht !== ALLE;

  function wisFilters() {
    setZoek("");
    setLand(ALLE);
    setLeeftijd(ALLE);
    setGrootte(ALLE);
    setGeslacht(ALLE);
    window.history.replaceState(null, "", "/honden/");
  }

  return (
    <>
      <div className="rounded-[2rem] border border-sand bg-white p-6 shadow-[0_24px_60px_-20px_rgba(61,46,34,0.18)] sm:p-8">
        <label className="mb-5 block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-taupe">
            Zoeken
          </span>
          <input
            type="search"
            value={zoek}
            onChange={(event) => setZoek(event.target.value)}
            placeholder="Naam, ras of stichting"
            className="w-full rounded-2xl border border-sand bg-cream px-4 py-3.5 text-[15px] font-medium text-ink outline-none transition-all duration-300 placeholder:font-normal placeholder:text-taupe hover:border-gold focus:border-gold focus:ring-4 focus:ring-gold/15"
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Keuze label="Verblijft in" waarde={land} opties={landen} onWijzig={setLand} />
          <Keuze
            label="Leeftijd"
            waarde={leeftijd}
            opties={LEEFTIJDGROEPEN.map((g) => ({ waarde: g.label, label: g.label }))}
            onWijzig={setLeeftijd}
          />
          <Keuze label="Grootte" waarde={grootte} opties={GROOTTES} onWijzig={setGrootte} />
          <Keuze label="Geslacht" waarde={geslacht} opties={GESLACHTEN} onWijzig={setGeslacht} />
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-taupe">
            <span className="font-semibold text-ink">{gefilterd.length}</span>{" "}
            {gefilterd.length === 1 ? "hond" : "honden"} gevonden
            {filtersActief && honden.length !== gefilterd.length
              ? ` van de ${honden.length}`
              : ""}
            {grootte !== ALLE && zonderGrootte > 0 && (
              <span className="block text-[13px]">
                Inclusief honden waarvan de grootte niet vermeld staat.
              </span>
            )}
          </p>
          {filtersActief && (
            <button
              type="button"
              onClick={wisFilters}
              className="text-sm font-medium text-taupe underline decoration-sand underline-offset-4 transition-colors hover:text-ink"
            >
              Filters wissen
            </button>
          )}
        </div>
      </div>

      {gefilterd.length === 0 ? (
        <div className="mt-12 rounded-[2rem] border border-dashed border-sand bg-white/60 p-12 text-center">
          <p className="text-4xl">🐾</p>
          <h2 className="mt-4 text-2xl font-medium tracking-tight [font-family:var(--font-display)]">
            Geen honden gevonden
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-taupe">
            Probeer je filters wat ruimer te zetten. Er komen regelmatig nieuwe honden bij,
            dus kom gerust later nog eens kijken.
          </p>
          <button
            type="button"
            onClick={wisFilters}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-clay px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C97E3F]"
          >
            Alle honden tonen
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4">
          {gefilterd.map((hond) => (
            <HondCard key={hond.id} dog={hond} />
          ))}
        </div>
      )}
    </>
  );
}
