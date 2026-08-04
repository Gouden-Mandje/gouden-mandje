"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Fotogalerij op de hondpagina.
 *
 * Klikken op een miniatuur wisselt de grote foto, en met de pijltjestoetsen
 * blader je erdoorheen. Bewust geen zwaar carrousel-pakket: dit is een
 * afbeelding wisselen, daar hoeft geen bibliotheek van 40 kB voor mee.
 *
 * De grote foto wordt NIET bijgesneden. Dat was hij wel, op 4:3 met
 * object-cover, en bij een staande foto verdween daardoor de kop van de hond
 * uit beeld. Bij een windhond zag je alleen zijn poten staan. Nu past de hele
 * foto in het kader, met een rustige achtergrond eromheen. Een beetje lege
 * ruimte is beter dan een halve hond.
 */
export default function HondGalerij({
  fotos,
  naam,
}: {
  fotos: string[];
  naam: string;
}) {
  const [actief, setActief] = useState(0);

  const aantal = fotos.length;

  const volgende = useCallback(() => {
    setActief((huidig) => (huidig + 1) % aantal);
  }, [aantal]);

  const vorige = useCallback(() => {
    setActief((huidig) => (huidig - 1 + aantal) % aantal);
  }, [aantal]);

  useEffect(() => {
    if (aantal < 2) return;

    function opToets(gebeurtenis: KeyboardEvent) {
      if (gebeurtenis.key === "ArrowRight") volgende();
      if (gebeurtenis.key === "ArrowLeft") vorige();
    }

    window.addEventListener("keydown", opToets);
    return () => window.removeEventListener("keydown", opToets);
  }, [aantal, volgende, vorige]);

  if (aantal === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[2rem] border border-sand bg-beige text-6xl text-sand">
        🐾
      </div>
    );
  }

  return (
    <div>
      <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-[1.75rem] border border-sand bg-beige sm:aspect-[4/3] sm:rounded-[2rem]">
        <img
          key={fotos[actief]}
          src={fotos[actief]}
          alt={`${naam}, foto ${actief + 1} van ${aantal}`}
          className="h-full w-full animate-[fadein_300ms_ease-out] object-contain"
        />

        {aantal > 1 && (
          <>
            <button
              type="button"
              onClick={vorige}
              aria-label="Vorige foto"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-xl text-ink opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white focus:opacity-100 group-hover:opacity-100 sm:h-12 sm:w-12"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              onClick={volgende}
              aria-label="Volgende foto"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-xl text-ink opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white focus:opacity-100 group-hover:opacity-100 sm:h-12 sm:w-12"
            >
              <span aria-hidden="true">›</span>
            </button>

            <span className="absolute bottom-4 right-4 rounded-full bg-ink/75 px-3 py-1.5 text-[13px] font-medium text-[#EFDFC8] backdrop-blur-md">
              {actief + 1} / {aantal}
            </span>
          </>
        )}
      </div>

      {aantal > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:mt-4 sm:grid-cols-6 sm:gap-3">
          {fotos.map((foto, i) => (
            <button
              key={foto}
              type="button"
              onClick={() => setActief(i)}
              aria-label={`Toon foto ${i + 1} van ${naam}`}
              aria-current={i === actief}
              className={`overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl ${
                i === actief
                  ? "border-clay ring-2 ring-clay/30"
                  : "border-sand opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={foto}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
