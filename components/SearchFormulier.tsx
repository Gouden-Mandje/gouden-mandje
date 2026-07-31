"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Het zoekformulier op de homepage.
 *
 * Het filtert hier niets zelf: het stuurt je naar /honden/ met je keuzes in de
 * URL. Dat overzicht heeft alle honden al in huis en pikt die keuzes op. Zo is
 * er één plek waar de filterlogica staat, en kun je een gefilterd overzicht ook
 * delen of bewaren als bladwijzer.
 */

export const ALLE = "Alle";

export const LEEFTIJDGROEPEN = [
  { label: "Puppy (tot 1 jaar)", min: 0, max: 11 },
  { label: "1 tot 3 jaar", min: 12, max: 35 },
  { label: "3 tot 7 jaar", min: 36, max: 83 },
  { label: "Senior (7 jaar en ouder)", min: 84, max: 400 },
];

export const GROOTTES = [
  { waarde: "klein", label: "Klein" },
  { waarde: "middel", label: "Middel" },
  { waarde: "groot", label: "Groot" },
];

export const GESLACHTEN = [
  { waarde: "reu", label: "Reu" },
  { waarde: "teef", label: "Teef" },
];

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

export default function SearchFormulier({ landen }: { landen: string[] }) {
  const router = useRouter();

  const [land, setLand] = useState(ALLE);
  const [leeftijd, setLeeftijd] = useState(ALLE);
  const [grootte, setGrootte] = useState(ALLE);
  const [geslacht, setGeslacht] = useState(ALLE);

  function wisFilters() {
    setLand(ALLE);
    setLeeftijd(ALLE);
    setGrootte(ALLE);
    setGeslacht(ALLE);
  }

  function zoek() {
    const parameters = new URLSearchParams();
    if (land !== ALLE) parameters.set("land", land);
    if (leeftijd !== ALLE) parameters.set("leeftijd", leeftijd);
    if (grootte !== ALLE) parameters.set("grootte", grootte);
    if (geslacht !== ALLE) parameters.set("geslacht", geslacht);

    const query = parameters.toString();
    router.push(query ? `/honden/?${query}` : "/honden/");
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Keuze
          label="Land"
          waarde={land}
          opties={landen.map((naam) => ({ waarde: naam, label: naam }))}
          onWijzig={setLand}
        />
        <Keuze
          label="Leeftijd"
          waarde={leeftijd}
          opties={LEEFTIJDGROEPEN.map((groep) => ({ waarde: groep.label, label: groep.label }))}
          onWijzig={setLeeftijd}
        />
        <Keuze label="Grootte" waarde={grootte} opties={GROOTTES} onWijzig={setGrootte} />
        <Keuze label="Geslacht" waarde={geslacht} opties={GESLACHTEN} onWijzig={setGeslacht} />
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={wisFilters}
          className="text-left text-sm font-medium text-taupe underline decoration-sand underline-offset-4 transition-colors hover:text-ink"
        >
          Filters wissen
        </button>
        <button
          type="button"
          onClick={zoek}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-clay/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C97E3F] hover:shadow-xl hover:shadow-clay/30"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="m13.5 13.5 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Zoek honden
        </button>
      </div>
    </>
  );
}
