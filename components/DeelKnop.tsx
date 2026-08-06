"use client";

import { useEffect, useState } from "react";

/**
 * Deel deze hond.
 *
 * Bewust klein en zonder kader. Op deze pagina staat één knop die telt: die
 * naar de stichting. Een even grote deelknop eronder trok de aandacht weg van
 * precies de handeling waar het om begonnen is.
 *
 * Op een telefoon opent dit het gewone deelvenster van het toestel, dus
 * WhatsApp, Instagram, mail en de rest. Op een computer bestaat dat venster
 * meestal niet; daar kopiëren we de link naar het klembord en zeggen we dat.
 *
 * Geen knoppen per netwerk. Die vragen om logo's en scripts van derden, en ze
 * verouderen: wie deelt er nog via Twitter-knoppen uit 2015. Het deelvenster
 * van het toestel zelf kent de apps die iemand écht gebruikt.
 */
export default function DeelKnop({
  naam,
  organisatie,
}: {
  naam: string;
  organisatie: string;
}) {
  const [gekopieerd, setGekopieerd] = useState(false);

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
        await navigator.share({
          title: `${naam} zoekt een gouden mandje`,
          text: tekst,
          url: adres,
        });
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
      // Ook kopiëren kan geweigerd worden. Dan tonen we het adres zodat de
      // bezoeker het zelf kan kopiëren.
      window.prompt(`Kopieer de link naar ${naam}:`, adres);
    }
  }

  return (
    <button
      type="button"
      onClick={deel}
      className="mt-4 inline-flex w-full items-center justify-center gap-1.5 text-[13px] font-medium text-taupe underline decoration-sand underline-offset-4 transition-colors hover:text-ink"
    >
      {gekopieerd ? "Link gekopieerd" : `Deel ${naam} met iemand`}
    </button>
  );
}
