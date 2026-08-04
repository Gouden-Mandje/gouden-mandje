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
 *
 * Twee dingen die op de telefoon anders werken dan op een groot scherm:
 *
 *   1. Niet alles staat meteen op het scherm. Met bijna duizend honden werd de
 *      pagina onwerkbaar: je moest tientallen keren vegen voordat je ergens
 *      was. Er staan er 24, met een knop om bij te laden.
 *
 *   2. De keuzelijsten zitten in een venster dat van onderaf opkomt, met een
 *      zwevende knop die meescrollt. Zonder dat moest je bij hond zestig
 *      helemaal terug naar boven om te filteren, en dat is precies het moment
 *      waarop iemand afhaakt.
 */

/** Hoeveel honden er in één keer bij komen. */
const STAP = 24;

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
  const [zichtbaar, setZichtbaar] = useState(STAP);
  const [vensterOpen, setVensterOpen] = useState(false);

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

  // Zolang het venster openstaat mag de pagina eronder niet meescrollen.
  useEffect(() => {
    if (!vensterOpen) return;
    const vorige = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = vorige;
    };
  }, [vensterOpen]);

  // Sluiten met Escape: wie een venster opent verwacht dat het zo weer weg kan.
  useEffect(() => {
    if (!vensterOpen) return;
    function opToets(gebeurtenis: KeyboardEvent) {
      if (gebeurtenis.key === "Escape") setVensterOpen(false);
    }
    window.addEventListener("keydown", opToets);
    return () => window.removeEventListener("keydown", opToets);
  }, [vensterOpen]);

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

  // Bij een nieuwe filterkeuze weer bovenaan beginnen. Anders zie je na het
  // filteren opeens honderd honden staan omdat je eerder had bijgeladen.
  useEffect(() => {
    setZichtbaar(STAP);
  }, [zoek, land, leeftijd, grootte, geslacht]);

  const getoond = gefilterd.slice(0, zichtbaar);
  const rest = gefilterd.length - getoond.length;

  const actieveFilters = [land, leeftijd, grootte, geslacht].filter(
    (waarde) => waarde !== ALLE
  ).length + (zoek.trim() ? 1 : 0);
  const filtersActief = actieveFilters > 0;

  function wisFilters() {
    setZoek("");
    setLand(ALLE);
    setLeeftijd(ALLE);
    setGrootte(ALLE);
    setGeslacht(ALLE);
    window.history.replaceState(null, "", "/honden/");
  }

  /** De vier keuzelijsten. Staan zowel bovenaan als in het venster. */
  const keuzes = (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
  );

  const telregel = (
    <>
      <span className="font-semibold text-ink">{gefilterd.length}</span>{" "}
      {gefilterd.length === 1 ? "hond" : "honden"} gevonden
      {filtersActief && honden.length !== gefilterd.length
        ? ` van de ${honden.length}`
        : ""}
    </>
  );

  return (
    <>
      <div className="rounded-[1.75rem] border border-sand bg-white p-5 shadow-[0_24px_60px_-20px_rgba(61,46,34,0.18)] sm:rounded-[2rem] sm:p-8">
        <label className="block">
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

        {/* Op de telefoon zitten de keuzelijsten in het venster. Vier
            uitklapmenu's bovenaan namen daar een half scherm in beslag voordat
            je ook maar één hond zag. */}
        <div className="mt-5 hidden sm:block">{keuzes}</div>

        <div className="mt-4 flex flex-col items-start gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-taupe">
            {telregel}
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

        <button
          type="button"
          onClick={() => setVensterOpen(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-ink bg-white px-6 py-3.5 text-[15px] font-semibold text-ink sm:hidden"
        >
          Filters
          {filtersActief && (
            <span className="rounded-full bg-clay px-2 py-0.5 text-[13px] text-white">
              {actieveFilters}
            </span>
          )}
        </button>
      </div>

      {gefilterd.length === 0 ? (
        <div className="mt-10 rounded-[1.75rem] border border-dashed border-sand bg-white/60 p-8 text-center sm:mt-12 sm:rounded-[2rem] sm:p-12">
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
        <>
          {/* Twee kolommen op de telefoon. Eén kolom betekende bij elke hond
              een halve schermlengte vegen; zo zie je er vier per scherm. */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4">
            {getoond.map((hond) => (
              <HondCard key={hond.id} dog={hond} />
            ))}
          </div>

          {rest > 0 && (
            <div className="mt-10 flex flex-col items-center gap-3 pb-20 sm:pb-0">
              <button
                type="button"
                onClick={() => setZichtbaar((huidig) => huidig + STAP)}
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016]"
              >
                Meer honden laden
              </button>
              <p className="text-sm text-taupe">
                {getoond.length} van de {gefilterd.length} getoond
              </p>
            </div>
          )}
        </>
      )}

      {/* Zwevende knop: altijd binnen handbereik, ook bij hond zestig. */}
      {!vensterOpen && (
        <button
          type="button"
          onClick={() => setVensterOpen(true)}
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_30px_-8px_rgba(61,46,34,0.6)] sm:hidden"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M3 5h14M6 10h8M8.5 15h3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          Filters
          {filtersActief && (
            <span className="rounded-full bg-clay px-2 py-0.5 text-[13px]">
              {actieveFilters}
            </span>
          )}
        </button>
      )}

      {/* Het venster zelf. Komt van onderaf op, zodat je duim erbij kan. */}
      {vensterOpen && (
        <div className="fixed inset-0 z-50 sm:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Filters sluiten"
            onClick={() => setVensterOpen(false)}
            className="absolute inset-0 h-full w-full bg-ink/40 backdrop-blur-sm"
          />

          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[1.75rem] bg-white p-5 pb-8 shadow-[0_-12px_40px_-12px_rgba(61,46,34,0.35)]">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-sand" />

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-medium tracking-tight [font-family:var(--font-display)]">
                Filters
              </h2>
              {filtersActief && (
                <button
                  type="button"
                  onClick={wisFilters}
                  className="text-sm font-medium text-taupe underline decoration-sand underline-offset-4"
                >
                  Alles wissen
                </button>
              )}
            </div>

            {keuzes}

            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-taupe">
                Zoeken
              </span>
              <input
                type="search"
                value={zoek}
                onChange={(event) => setZoek(event.target.value)}
                placeholder="Naam, ras of stichting"
                className="w-full rounded-2xl border border-sand bg-cream px-4 py-3.5 text-[15px] font-medium text-ink outline-none placeholder:font-normal placeholder:text-taupe focus:border-gold focus:ring-4 focus:ring-gold/15"
              />
            </label>

            {/* De teller staat op de knop zelf: zo zie je meteen wat een keuze
                oplevert, zonder het venster te hoeven sluiten. */}
            <button
              type="button"
              onClick={() => setVensterOpen(false)}
              className="mt-5 w-full rounded-full bg-clay px-8 py-4 text-base font-semibold text-white"
            >
              {gefilterd.length === 0
                ? "Geen honden gevonden"
                : `Toon ${gefilterd.length} ${gefilterd.length === 1 ? "hond" : "honden"}`}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
