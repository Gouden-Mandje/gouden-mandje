import type { Hond } from "@/lib/honden";

/**
 * De volgordes waarin je het overzicht kunt bekijken.
 *
 * "Wacht het langst" staat er bewust in. Dat zijn de honden die het minst
 * opvallen en het meest voorbijgelopen worden, en juist die kun je hiermee
 * vooraan zetten.
 */
export const SORTERINGEN = [
  { waarde: "nieuwste", label: "Nieuwste eerst" },
  { waarde: "wachttijd", label: "Wacht het langst" },
  { waarde: "jongste", label: "Jongste eerst" },
  { waarde: "oudste", label: "Oudste eerst" },
  { waarde: "naam", label: "Op naam" },
] as const;

export const STANDAARD_SORTERING = "nieuwste";

/**
 * Sorteer een lijst honden. Geeft altijd een nieuwe lijst terug.
 *
 * Honden zonder de betreffende waarde komen achteraan in plaats van dat ze
 * bovenaan belanden met een nul. Een hond zonder bekende leeftijd hoort niet
 * bij "jongste eerst" boven een pup van acht weken te staan.
 */
export function sorteer(honden: Hond[], volgorde: string): Hond[] {
  const lijst = [...honden];

  switch (volgorde) {
    case "wachttijd":
      return lijst.sort(
        (a, b) => (b.waitingMonths ?? -1) - (a.waitingMonths ?? -1)
      );

    case "jongste":
      return lijst.sort(
        (a, b) => (a.ageMonths ?? Number.MAX_SAFE_INTEGER) - (b.ageMonths ?? Number.MAX_SAFE_INTEGER)
      );

    case "oudste":
      return lijst.sort((a, b) => (b.ageMonths ?? -1) - (a.ageMonths ?? -1));

    case "naam":
      return lijst.sort((a, b) => a.name.localeCompare(b.name, "nl"));

    case "nieuwste":
    default:
      return lijst.sort((a, b) => (b.addedAt || "").localeCompare(a.addedAt || ""));
  }
}
