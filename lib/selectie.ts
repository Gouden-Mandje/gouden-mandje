/**
 * De selectie honden waar de bezoeker doorheen bladert.
 *
 * Waarom dit bestaat: de hondpagina's zijn statisch gebouwd en weten dus niets
 * van de filters die iemand op het overzicht heeft gezet. Zonder hulp zou je
 * na het lezen van één verhaal terugmoeten naar het overzicht, opnieuw
 * filteren en opnieuw scrollen.
 *
 * Daarom onthoudt het overzicht welke honden er na het filteren overbleven, en
 * leest de hondpagina dat weer uit. Zo kun je met pijltjes door je eigen
 * selectie bladeren.
 *
 * Bewust sessionStorage en geen localStorage: dit is iets van deze ene
 * zoektocht. Sluit je het tabblad, dan hoort het weg te zijn. En bewust niet
 * in de URL, want dan zou je bij duizend honden een adres van tien kilobyte
 * krijgen.
 */

const SLEUTEL = "gm-selectie";

export type Selectie = {
  /** De ID's van de honden, in de volgorde waarin ze getoond werden. */
  ids: string[];
  /** De namen, zodat de knoppen "Vorige: Bruno" kunnen tonen. */
  namen: Record<string, string>;
  /** De filters als querystring, om terug te keren naar hetzelfde overzicht. */
  filters: string;
};

export function bewaarSelectie(selectie: Selectie): void {
  try {
    sessionStorage.setItem(SLEUTEL, JSON.stringify(selectie));
  } catch {
    // Privémodus of vol geheugen. Dan werkt het bladeren niet, en dat is
    // vervelend maar niet erg: de knop terug naar het overzicht blijft.
  }
}

export function leesSelectie(): Selectie | null {
  try {
    const opgeslagen = sessionStorage.getItem(SLEUTEL);
    if (!opgeslagen) return null;

    const gelezen = JSON.parse(opgeslagen) as Selectie;
    return Array.isArray(gelezen.ids) ? gelezen : null;
  } catch {
    return null;
  }
}

/**
 * Welke honden er in de selectie voor en na deze hond komen.
 *
 * Geeft null terug wanneer de hond niet in de selectie zit. Dat gebeurt
 * bijvoorbeeld wanneer iemand rechtstreeks op een gedeelde link binnenkomt;
 * dan is bladeren door "een selectie" ook niet aan de orde.
 */
export function burenVan(id: string): {
  vorige: { id: string; naam: string } | null;
  volgende: { id: string; naam: string } | null;
  positie: number;
  totaal: number;
  filters: string;
} | null {
  const selectie = leesSelectie();
  if (!selectie) return null;

  const index = selectie.ids.indexOf(id);
  if (index === -1) return null;

  const maak = (positie: number) => {
    const buurId = selectie.ids[positie];
    if (!buurId) return null;
    return { id: buurId, naam: selectie.namen[buurId] || "Volgende hond" };
  };

  return {
    vorige: maak(index - 1),
    volgende: maak(index + 1),
    positie: index + 1,
    totaal: selectie.ids.length,
    filters: selectie.filters || "",
  };
}
