"use client";

import { useEffect, useState } from "react";

/**
 * Deel deze hond.
 *
 * Op een telefoon opent dit het gewone deelvenster van het toestel, dus
 * WhatsApp, Instagram, mail en de rest. Op een computer bestaat dat venster
 * meestal niet; daar kopiëren we de link naar het klembord en zeggen we dat.
 *
 * Bewust geen knoppen per netwerk. Die vragen om logo's en scripts van derden,
 * en ze verouderen: wie deelt er nog via Twitter-knoppen uit 2015. Het
 * deelvenster van het toestel zelf kent de apps die iemand écht gebruikt.
 */
export default function DeelKnop({
  naam,
  organisatie,
}: {
  naam: string;
  organisatie: string;
}) {
  const [gekopieerd, setGekopieerd] = useState(false);
  const [kanDelen, setKanDelen] = useState(false);

  useEffect(() => {
    setKanDelen(typeof navigator !== "undefined" && Boolean(navigator.share));
  }, []);

  useEffect(() => {
    if (!gekopieerd) return;
    const teller = setTimeout(() => setGekopieerd(false), 2500);
    return () => clearTimeout(teller);
  }, [gekopieerd]);

  async function deel() {
    const adres = window.location.href;
    const tekst = `${naam} zoekt een thuis via ${organisatie}.`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `${naam} zoekt een gouden mandje`, text: tekst, url: adres });
        return;
      } catch {
        // De bezoeker heeft het venster gesloten, of delen mislukte. Dan
        // vallen we terug op kopiëren; dat werkt altijd.
      }
    }

    try {
      await navigator.clipboard.writeText(adres);
      setGekopieerd(true);
    } catch {
      // Ook kopiëren kan geweigerd worden. Dan selecteren we het adres zodat
      // de bezoeker het zelf kan kopiëren.
      window.prompt(`Kopieer de link naar ${naam}:`, adres);
    }
  }

  return (
    <button
      type="button"
      onClick={deel}
      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-sand bg-white px-8 py-3.5 text-[15px] font-semibold text-ink transition-all duration-300 hover:border-ink"
    >
      {gekopieerd ? (
        <>
          <span aria-hidden="true">✓</span>
          Link gekopieerd
        </>
      ) : (
        <>
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M13 7V5.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V13M8 10h9m0 0-3-3m3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {kanDelen ? `Deel ${naam}` : "Kopieer de link"}
        </>
      )}
    </button>
  );
}
