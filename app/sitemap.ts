import type { MetadataRoute } from "next";
import { alleGroepen } from "@/lib/groepen";
import { getHonden } from "@/lib/honden";

/**
 * Verplicht bij een statische export: zonder deze regel wil Next sitemap.xml
 * bij elk bezoek opnieuw opbouwen, en dat kan niet als er geen server is.
 * De build faalt dan met "export const dynamic not configured".
 */
export const dynamic = "force-static";

/**
 * De sitemap: één bestand waarin de site zelf vertelt welke pagina's er zijn.
 *
 * Waarom dit nodig is: zonder sitemap moet een zoekmachine alle pagina's zelf
 * ontdekken door zich door het overzicht heen te klikken. Op /honden/ staan de
 * eerste paar honderd honden in de HTML, de rest komt pas tevoorschijn na het
 * bijladen. Die honden bestaan wel als pagina, maar er loopt geen pad naartoe.
 *
 * Met deze sitemap staan ze er allemaal in, met de datum waarop ze voor het
 * laatst wijzigden. Dat laatste is niet alleen netjes: het scheelt de
 * zoekmachine werk, want hij hoeft alleen terug te komen bij wat veranderd is.
 *
 * Het bestand wordt bij elke build opnieuw opgebouwd uit dezelfde gegevens als
 * de site. Er is dus niets bij te houden; komt er een hond bij of gaat er een
 * af, dan klopt de sitemap vanzelf.
 *
 * Let op het adres hieronder. Dat moet het adres zijn waar de site echt op
 * staat, met www. De kale variant stuurt daarheen door; zou hier het kale
 * adres staan, dan wijst de sitemap naar adressen die meteen doorsturen en dat
 * is precies de verwarring die we wilden voorkomen.
 */

const SITE = "https://www.gouden-mandje.nl";

/** De vaste pagina's, met hoe belangrijk ze onderling zijn. */
const PAGINAS: { pad: string; prioriteit: number; frequentie: "daily" | "weekly" | "monthly" }[] = [
  { pad: "/", prioriteit: 1.0, frequentie: "daily" },
  { pad: "/honden/", prioriteit: 0.9, frequentie: "daily" },
  { pad: "/voor-stichtingen/", prioriteit: 0.6, frequentie: "monthly" },
  { pad: "/over-ons/", prioriteit: 0.5, frequentie: "monthly" },
  { pad: "/contact/", prioriteit: 0.4, frequentie: "monthly" },
  { pad: "/privacy/", prioriteit: 0.2, frequentie: "monthly" },
];

/**
 * Zet een tijdstempel uit de scraper om in een datum.
 *
 * Bij een onleesbare of ontbrekende waarde geven we vandaag terug in plaats van
 * 1 januari 1970. Dat laatste zou een zoekmachine vertellen dat de pagina
 * stokoud is en niet de moeite van het bekijken waard.
 */
function alsDatum(tijdstempel: string): Date {
  const datum = new Date(tijdstempel);
  return Number.isNaN(datum.getTime()) ? new Date() : datum;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const honden = await getHonden();

  const vast: MetadataRoute.Sitemap = PAGINAS.map(({ pad, prioriteit, frequentie }) => ({
    url: `${SITE}${pad}`,
    lastModified: new Date(),
    changeFrequency: frequentie,
    priority: prioriteit,
  }));

  // De groepspagina's: /overzicht/oudere-honden/ en dergelijke. Die krijgen een
  // hogere prioriteit dan een losse hond, want dit zijn de pagina's waarop
  // gezocht wordt en waarlangs een bezoeker bij de honden uitkomt.
  const groepen: MetadataRoute.Sitemap = alleGroepen(honden).map((groep) => ({
    url: `${SITE}/overzicht/${groep.slug}/`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.85,
  }));

  const hondpaginas: MetadataRoute.Sitemap = honden.map((hond) => ({
    url: `${SITE}/honden/${hond.id}/`,
    lastModified: alsDatum(hond.updatedAt),
    // Wekelijks, niet dagelijks. Een hondpagina verandert zelden na het
    // plaatsen, en dagelijks opgeven bij negenhonderd pagina's is vragen om
    // genegeerd te worden.
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...vast, ...groepen, ...hondpaginas];
}
