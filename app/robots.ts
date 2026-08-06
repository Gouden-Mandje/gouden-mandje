import type { MetadataRoute } from "next";

/**
 * Verplicht bij een statische export: zonder deze regel wil Next robots.txt
 * bij elk bezoek opnieuw opbouwen, en dat kan niet als er geen server is.
 * De build faalt dan met "export const dynamic not configured".
 */
export const dynamic = "force-static";

/**
 * robots.txt: wat zoekmachines wel en niet mogen.
 *
 * Alles staat open, want dat is het hele punt van deze site: de honden moeten
 * gevonden worden. Het enige wat hier echt toe doet is de verwijzing naar de
 * sitemap, want daarmee weet een zoekmachine dat er negenhonderd pagina's zijn
 * in plaats van de paar honderd die vanaf het overzicht bereikbaar zijn.
 */

const SITE = "https://www.gouden-mandje.nl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
