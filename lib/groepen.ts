import type { Hond } from "@/lib/honden";

/**
 * Groepspagina's: honden gebundeld op één kenmerk, met een eigen webadres.
 *
 * Waarom dit bestaat. Iemand die zoekt typt zelden de naam van een hond die
 * hij nog niet kent. Hij typt "kleine hond adopteren" of "oudere hond uit
 * Roemenie". Dat is een groep, en die groep kon onze site wel tonen maar
 * alleen via een filter in de adresbalk: /honden/?grootte=klein. Voor een
 * zoekmachine is dat geen aparte pagina, dus daar viel niets op te vinden.
 *
 * Met deze groepen krijgt elk kenmerk een echt adres, een eigen titel en een
 * eigen tekst. Het zijn dezelfde honden uit dezelfde gegevens; alleen de
 * verpakking is anders.
 *
 * Bewust geen combinaties zoals "kleine honden in Griekenland". Dat worden er
 * al snel honderden, waarvan de meeste twee of drie honden bevatten. Een
 * pagina met twee honden is geen pagina, en een site vol zulke pagina's wekt
 * de indruk dat er niets te halen valt.
 *
 * Landen en stichtingen staan hier niet vast opgeschreven maar worden uit de
 * gegevens afgeleid. Komt er een organisatie bij, dan verschijnt haar pagina
 * vanzelf; gaat er een af, dan verdwijnt hij. Zie `alleGroepen`.
 */

export type Groep = {
  /** Het laatste stuk van het webadres: /honden/<slug>/ */
  slug: string;
  /** De kop op de pagina en in de zoekresultaten. */
  titel: string;
  /** Wat er onder de kop staat. Eigen tekst, geen overgenomen tekst. */
  inleiding: string;
  /** Voor de metabeschrijving in de zoekresultaten. */
  omschrijving: string;
  /** Welke honden bij deze groep horen. */
  hoortErbij: (hond: Hond) => boolean;
};

/** Maak van een naam een bruikbaar stuk webadres. */
export function naarSlug(tekst: string): string {
  return tekst
    .toLowerCase()
    .replace(/ë/g, "e")
    .replace(/é|è|ê/g, "e")
    .replace(/ï|í|ì/g, "i")
    .replace(/ö|ó|ò/g, "o")
    .replace(/ü|ú|ù/g, "u")
    .replace(/á|à|â/g, "a")
    .replace(/&/g, " en ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Vaste groepen op grootte. */
const GROOTTE: { slug: string; waarde: string; naam: string; toelichting: string }[] = [
  {
    slug: "kleine-honden",
    waarde: "klein",
    naam: "Kleine honden",
    toelichting:
      "Honden tot ongeveer veertig centimeter schofthoogte. Vaak geschikt voor een " +
      "appartement of een klein huis, al zegt formaat weinig over hoeveel beweging " +
      "een hond nodig heeft.",
  },
  {
    slug: "middelgrote-honden",
    waarde: "middel",
    naam: "Middelgrote honden",
    toelichting:
      "Honden tussen ongeveer veertig en vijfenvijftig centimeter. De grootste groep " +
      "op deze site, en meestal de makkelijkste om een passend thuis voor te vinden.",
  },
  {
    slug: "grote-honden",
    waarde: "groot",
    naam: "Grote honden",
    toelichting:
      "Honden vanaf ongeveer vijfenvijftig centimeter. Zij wachten gemiddeld langer " +
      "op een thuis dan kleine honden, terwijl veel van hen juist rustig zijn.",
  },
];

/** Vaste groepen op leeftijd. */
const LEEFTIJD: {
  slug: string;
  naam: string;
  min: number;
  max: number;
  toelichting: string;
}[] = [
  {
    slug: "puppys",
    naam: "Puppy's",
    min: 0,
    max: 11,
    toelichting:
      "Honden tot een jaar oud. Zij vinden meestal snel een thuis, maar vragen in het " +
      "eerste jaar veel tijd en geduld.",
  },
  {
    slug: "jonge-honden",
    naam: "Jonge honden",
    min: 12,
    max: 35,
    toelichting:
      "Honden tussen een en drie jaar. Uit de puppytijd, maar nog vol energie en goed " +
      "te vormen.",
  },
  {
    slug: "volwassen-honden",
    naam: "Volwassen honden",
    min: 36,
    max: 83,
    toelichting:
      "Honden tussen drie en zeven jaar. Hun karakter is uitgekristalliseerd, dus je " +
      "weet beter wat je in huis haalt dan bij een pup.",
  },
  {
    slug: "oudere-honden",
    naam: "Oudere honden",
    min: 84,
    max: 400,
    toelichting:
      "Honden van zeven jaar en ouder. Zij wachten het langst en worden het vaakst " +
      "voorbijgelopen, terwijl ze meestal rustig zijn en weinig hoeven te leren. " +
      "Wie hen een thuis geeft, geeft dat aan een hond die er anders niet meer op " +
      "hoefde te rekenen.",
  },
];

function groepUitGrootte(item: (typeof GROOTTE)[number]): Groep {
  return {
    slug: item.slug,
    titel: `${item.naam} die een thuis zoeken`,
    inleiding: item.toelichting,
    omschrijving:
      `Bekijk ${item.naam.toLowerCase()} van Nederlandse rescue-stichtingen die een ` +
      "thuis zoeken. Adoptie loopt altijd via de stichting zelf.",
    hoortErbij: (hond) => hond.size === item.waarde,
  };
}

function groepUitLeeftijd(item: (typeof LEEFTIJD)[number]): Groep {
  return {
    slug: item.slug,
    titel: `${item.naam} die een thuis zoeken`,
    inleiding: item.toelichting,
    omschrijving:
      `Bekijk ${item.naam.toLowerCase()} van Nederlandse rescue-stichtingen die een ` +
      "thuis zoeken. Adoptie loopt altijd via de stichting zelf.",
    hoortErbij: (hond) =>
      hond.ageMonths !== null && hond.ageMonths >= item.min && hond.ageMonths <= item.max,
  };
}

function groepUitLand(land: string): Groep {
  const inNederland = land.toLowerCase() === "nederland";

  return {
    slug: `honden-in-${naarSlug(land)}`,
    titel: inNederland
      ? "Honden die al in Nederland zijn"
      : `Honden in ${land} die een thuis zoeken`,
    inleiding: inNederland
      ? "Deze honden verblijven al in Nederland, meestal in een gastgezin of bij een " +
        "opvang. Je kunt ze dus komen ontmoeten voordat je beslist, en er komt geen " +
        "transport vanuit het buitenland meer aan te pas."
      : `Deze honden verblijven op dit moment in ${land} en wachten daar op een thuis ` +
        "in Nederland. De stichting regelt het vervoer en begeleidt je van kennismaking " +
        "tot thuiskomst.",
    omschrijving: inNederland
      ? "Rescuehonden die al in Nederland verblijven en een thuis zoeken. Je kunt ze " +
        "komen ontmoeten voordat je beslist."
      : `Rescuehonden in ${land} die via Nederlandse stichtingen een thuis zoeken. ` +
        "Adoptie loopt altijd via de stichting zelf.",
    hoortErbij: (hond) => hond.country === land,
  };
}

function groepUitStichting(naam: string): Groep {
  // Sommige organisaties heten al "Stichting Woozy". Zonder deze controle werd
  // dat stichting-stichting-woozy, en dat leest als een fout.
  const kaal = naarSlug(naam);
  const slug = kaal.startsWith("stichting-") ? kaal : `stichting-${kaal}`;

  return {
    slug,
    titel: `Honden van ${naam}`,
    inleiding:
      `Alle honden die ${naam} op dit moment ter adoptie aanbiedt. De adoptie loopt ` +
      "volledig via hen; wij tonen hun honden alleen zodat meer mensen ze kunnen vinden.",
    omschrijving:
      `Bekijk alle honden die ${naam} ter adoptie aanbiedt. Adoptie loopt via de ` +
      "stichting zelf.",
    hoortErbij: (hond) => hond.organisation === naam,
  };
}

/**
 * Hoeveel honden een groep minstens moet bevatten om een eigen pagina te krijgen.
 *
 * Een pagina met twee honden voegt niets toe voor een bezoeker en oogt voor een
 * zoekmachine als een lege pagina. Bij een land met drie honden is de kans op
 * teleurstelling groter dan de kans dat iemand er zijn hond vindt.
 */
const MINIMUM_HONDEN = 5;

/**
 * Alle groepen waarvoor een pagina wordt gemaakt.
 *
 * Landen en stichtingen komen uit de gegevens zelf. Sluit een organisatie zich
 * aan of haakt er een af, dan verschijnt of verdwijnt haar pagina bij de
 * volgende publicatie zonder dat hier iets aan hoeft te veranderen.
 */
export function alleGroepen(honden: Hond[]): Groep[] {
  const landen = Array.from(new Set(honden.map((hond) => hond.country).filter(Boolean)));
  const stichtingen = Array.from(
    new Set(honden.map((hond) => hond.organisation).filter(Boolean))
  );

  const groepen = [
    ...GROOTTE.map(groepUitGrootte),
    ...LEEFTIJD.map(groepUitLeeftijd),
    ...landen.sort((a, b) => a.localeCompare(b, "nl")).map(groepUitLand),
    ...stichtingen.sort((a, b) => a.localeCompare(b, "nl")).map(groepUitStichting),
  ];

  return groepen.filter(
    (groep) => honden.filter(groep.hoortErbij).length >= MINIMUM_HONDEN
  );
}

/** Zoek één groep op zijn webadres. */
export function groepMetSlug(honden: Hond[], slug: string): Groep | undefined {
  return alleGroepen(honden).find((groep) => groep.slug === slug);
}
