/**
 * Hondendata van Gouden Mandje.
 *
 * De scraper publiceert elke run naar R2. Dit bestand haalt die data op
 * tijdens `next build`, zodat elke hond een echte statische pagina krijgt.
 * Goed voor de snelheid en, belangrijker, goed vindbaar in Google. Daar komt
 * het grootste deel van je bezoekers vandaan.
 *
 * De bron is bewust één bestand: honden_totaal.json. Dat bevat alles wat de
 * site nodig heeft, inclusief de omschrijvingen. Een tweede verzoek naar
 * honden_index.json zou dezelfde honden nog een keer ophalen, maar dan met
 * minder velden.
 */

const DATA_BASIS =
  process.env.NEXT_PUBLIC_DATA_URL?.replace(/\/$/, "") ??
  "https://data.gouden-mandje.nl";

/** Zoals de scraper het wegschrijft. Niet alle velden zijn hier nodig. */
type HondBron = {
  id: string;
  naam: string;
  organisatie: string;
  organisatie_slug: string;
  adoptie_url: string;
  bron_url: string;
  fotos: string[];
  geslacht: "reu" | "teef" | "onbekend";
  leeftijd: string;
  leeftijd_maanden: number | null;
  geboortedatum: string | null;
  grootte: "klein" | "middel" | "groot" | "onbekend";
  ras: string;
  locatie: string;
  omschrijving: string;
  status: "beschikbaar" | "gereserveerd" | "geadopteerd" | "onbekend";
  aanwezig: "aanwezig" | "verdwenen";
  eerst_gezien: string;
  laatst_gewijzigd: string;
};

type TotaalBestand = {
  gegenereerd_op: string;
  aantal_organisaties: number;
  organisaties: {
    naam: string;
    slug: string;
    website: string;
    aantal_honden: number;
    laatste_run: string;
  }[];
  honden: HondBron[];
};

/** De vorm waarin de componenten de hond gebruiken. */
export type Hond = {
  id: string;
  name: string;
  age: string;
  ageMonths: number | null;
  country: string;
  flag: string;
  character: string;
  image: string;
  images: string[];
  status: "beschikbaar" | "gereserveerd";
  statusLabel: string;
  gender: "reu" | "teef" | "onbekend";
  genderLabel: string;
  size: "klein" | "middel" | "groot" | "onbekend";
  breed: string;
  description: string;
  organisation: string;
  organisationSlug: string;
  /** Waar de bezoeker heen gaat om te adopteren. */
  adoptionUrl: string;
};

export type Organisatie = {
  naam: string;
  slug: string;
  website: string;
  aantalHonden: number;
};

// --------------------------------------------------------------------------
// Ophalen
// --------------------------------------------------------------------------
let cache: TotaalBestand | null = null;

async function haalTotaal(): Promise<TotaalBestand> {
  if (cache) return cache;

  const url = `${DATA_BASIS}/honden_totaal.json`;
  // force-cache: bij een statische export wordt dit één keer opgehaald tijdens
  // de build. Met no-store zou Next de pagina als dynamisch beschouwen en dan
  // faalt de export, want er is geen server die tijdens een bezoek kan fetchen.
  const antwoord = await fetch(url, { cache: "force-cache" });

  if (!antwoord.ok) {
    // Bewust hard falen. Een mislukte build laat de vorige versie van de site
    // gewoon staan; doorbouwen met een lege lijst zou alle honden van de site
    // halen omdat R2 even niet bereikbaar was.
    throw new Error(
      `Hondendata kon niet opgehaald worden van ${url} (HTTP ${antwoord.status})`
    );
  }

  const gegevens = (await antwoord.json()) as TotaalBestand;
  if (!Array.isArray(gegevens.honden)) {
    throw new Error(`Onverwacht formaat in ${url}: veld 'honden' ontbreekt`);
  }

  cache = gegevens;
  return gegevens;
}

// --------------------------------------------------------------------------
// Vertalen
// --------------------------------------------------------------------------
const VLAGGEN: Record<string, string> = {
  griekenland: "🇬🇷",
  nederland: "🇳🇱",
  spanje: "🇪🇸",
  roemenië: "🇷🇴",
  roemenie: "🇷🇴",
  portugal: "🇵🇹",
  curaçao: "🇨🇼",
  curacao: "🇨🇼",
  bulgarije: "🇧🇬",
  cyprus: "🇨🇾",
  italië: "🇮🇹",
  italie: "🇮🇹",
};

function vlagVoor(locatie: string): string {
  const laag = locatie.toLowerCase();
  for (const [land, vlag] of Object.entries(VLAGGEN)) {
    if (laag.includes(land)) return vlag;
  }
  return "🐾";
}

const STATUS_LABELS: Record<string, string> = {
  beschikbaar: "Beschikbaar",
  gereserveerd: "Onder optie",
};

const GESLACHT_LABELS: Record<string, string> = {
  reu: "Reu",
  teef: "Teef",
  onbekend: "Onbekend",
};

/**
 * Een korte karakterschets voor op het kaartje.
 *
 * Organisaties schrijven vaak een kopje "Karakter:" in hun tekst. Dat is
 * precies wat een bezoeker op een kaartje wil lezen, dus dat pakken we eerst.
 * Zonder dat kopje nemen we de eerste zinnen van de omschrijving.
 */
function korteOmschrijving(omschrijving: string, maxLengte = 110): string {
  if (!omschrijving) return "";

  const karakter = omschrijving.match(/Karakter\s*:\s*([\s\S]{20,400})/i);
  const bron = (karakter ? karakter[1] : omschrijving).replace(/\s+/g, " ").trim();

  if (bron.length <= maxLengte) return bron;

  const afgekapt = bron.slice(0, maxLengte);
  const laatsteSpatie = afgekapt.lastIndexOf(" ");
  return `${afgekapt.slice(0, laatsteSpatie > 40 ? laatsteSpatie : maxLengte)}…`;
}

function naarHond(bron: HondBron): Hond {
  const status = bron.status === "gereserveerd" ? "gereserveerd" : "beschikbaar";

  return {
    id: bron.id,
    name: bron.naam,
    age: bron.leeftijd || "Leeftijd onbekend",
    ageMonths: bron.leeftijd_maanden ?? null,
    country: bron.locatie || bron.organisatie,
    flag: vlagVoor(bron.locatie),
    character: korteOmschrijving(bron.omschrijving),
    image: bron.fotos?.[0] ?? "",
    images: bron.fotos ?? [],
    status,
    statusLabel: STATUS_LABELS[status] ?? "Beschikbaar",
    gender: bron.geslacht ?? "onbekend",
    genderLabel: GESLACHT_LABELS[bron.geslacht] ?? "Onbekend",
    size: bron.grootte ?? "onbekend",
    breed: bron.ras || "",
    description: bron.omschrijving || "",
    organisation: bron.organisatie,
    organisationSlug: bron.organisatie_slug,
    adoptionUrl: bron.adoptie_url || bron.bron_url,
  };
}

// --------------------------------------------------------------------------
// Wat de pagina's gebruiken
// --------------------------------------------------------------------------

/**
 * Alle honden die een bezoeker mag zien.
 *
 * Geadopteerde en verdwenen honden vallen af: die kun je niet meer adopteren
 * en ze zouden het overzicht vervuilen. Honden onder optie blijven wel staan,
 * met een eigen label, want een reservering ketst geregeld af.
 */
export async function getHonden(): Promise<Hond[]> {
  const totaal = await haalTotaal();

  return totaal.honden
    .filter(
      (hond) =>
        hond.aanwezig === "aanwezig" &&
        (hond.status === "beschikbaar" || hond.status === "gereserveerd") &&
        Boolean(hond.naam)
    )
    .map(naarHond)
    .sort((a, b) => {
      // Beschikbaar eerst, en honden met een foto boven honden zonder.
      if (a.status !== b.status) return a.status === "beschikbaar" ? -1 : 1;
      if (Boolean(a.image) !== Boolean(b.image)) return a.image ? -1 : 1;
      return a.name.localeCompare(b.name, "nl");
    });
}

/** De honden voor het uitgelichte blok op de homepage. */
export async function getUitgelichteHonden(aantal = 4): Promise<Hond[]> {
  const honden = await getHonden();
  return honden.filter((hond) => hond.status === "beschikbaar" && hond.image).slice(0, aantal);
}

/** Eén hond, voor de detailpagina. Geeft null wanneer de hond niet bestaat. */
export async function getHond(id: string): Promise<Hond | null> {
  const honden = await getHonden();
  return honden.find((hond) => hond.id === id) ?? null;
}

/** Alle organisaties waarvan er honden getoond worden. */
export async function getOrganisaties(): Promise<Organisatie[]> {
  const totaal = await haalTotaal();
  return totaal.organisaties.map((org) => ({
    naam: org.naam,
    slug: org.slug,
    website: org.website,
    aantalHonden: org.aantal_honden,
  }));
}

/** Voor teksten als "328 honden beschikbaar". */
export async function getAantallen() {
  const honden = await getHonden();
  const organisaties = await getOrganisaties();
  return {
    honden: honden.length,
    beschikbaar: honden.filter((hond) => hond.status === "beschikbaar").length,
    organisaties: organisaties.length,
  };
}
