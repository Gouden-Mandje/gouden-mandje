import type { MetadataRoute } from "next";

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
