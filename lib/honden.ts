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
 *
 * Over het bewaren tijdens de build: Next bouwt de pagina's in meerdere
 * processen tegelijk, en die delen geen geheugen. Een variabele in dit bestand
 * werkt daardoor per proces, niet per build. Bij duizend hondpagina's werd
 * hetzelfde bestand van 4 MB tientallen keren opnieuw opgehaald.
 *
 * Daarom schrijven we het na de eerste keer weg naar een tijdelijk bestand.
 * Alle bouwprocessen kunnen daarbij, dus er is nog één netwerkverzoek nodig in
 * plaats van tientallen. Dat scheelt gigabytes verkeer en minuten bouwtijd.
 */

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

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
  herkomst: string;
  omschrijving: string;
  status: "beschikbaar" | "gereserveerd" | "geadopteerd" | "onbekend";
  aanwezig: "aanwezig" | "verdwenen";
  eerst_gezien: string;
  laatst_gewijzigd: string;
  /** Losse gegevens die niet elke organisatie levert. */
  extra?: Record<string, unknown>;
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
  flag: string;
  character: string;
  image: string;
  images: string[];
  status: "beschikbaar" | "gereserveerd";
  statusLabel: string;
  gender: "reu" | "teef" | "onbekend";
  genderLabel: string;
  size: "klein" | "middel" | "groot" | "onbekend";
  /** Waar de hond verblijft. */
  country: string;
  /** Waar de hond vandaan komt. Leeg wanneer de organisatie het niet vermeldt. */
  origin: string;
  breed: string;
  description: string;
  organisation: string;
  organisationSlug: string;
  /** Waar de bezoeker heen gaat om te adopteren. */
  adoptionUrl: string;
  /** Wanneer wij deze hond voor het eerst zagen. */
  addedAt: string;
  /**
   * Wanneer er voor het laatst iets aan deze hond veranderde.
   *
   * Gaat mee in de sitemap als `lastModified`. Zoekmachines gebruiken dat om
   * te bepalen welke pagina's opnieuw bekeken moeten worden; zonder die datum
   * moeten ze alle negenhonderd pagina's blindelings aflopen.
   */
  updatedAt: string;
  /**
   * Hoeveel maanden de hond al bij de organisatie op de site staat.
   *
   * Alleen ACE vermeldt dat ("Ter adoptie sinds"). Bij de rest vallen we terug
   * op hoe lang wij hem al zien. Dat is een ondergrens en geen waarheid, maar
   * voor sorteren op "wacht het langst" is het bruikbaar: een hond die wij al
   * maanden zien, wacht ook echt al maanden.
   */
  waitingMonths: number | null;
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

/** Waar het gedeelde tijdelijke bestand staat tijdens de build. */
const TIJDELIJK = path.join(tmpdir(), "gouden-mandje-build", "honden_totaal.json");

/**
 * Hoe lang het tijdelijke bestand meegaat, in minuten.
 *
 * Lang genoeg om één build te overbruggen, kort genoeg dat een volgende build
 * verse gegevens ophaalt. Zou dit te lang staan, dan bouwt je site zichzelf op
 * met honden van gisteren.
 */
const HOUDBAAR_MINUTEN = 15;

/** Lopende ophaalactie, zodat gelijktijdige aanroepen er niet twee starten. */
let bezig: Promise<TotaalBestand> | null = null;

async function uitTijdelijkBestand(): Promise<TotaalBestand | null> {
  try {
    const gegevens = await stat(TIJDELIJK);
    const ouderdomMinuten = (Date.now() - gegevens.mtimeMs) / 60000;
    if (ouderdomMinuten > HOUDBAAR_MINUTEN) return null;

    const inhoud = await readFile(TIJDELIJK, "utf-8");
    const gelezen = JSON.parse(inhoud) as TotaalBestand;
    return Array.isArray(gelezen.honden) ? gelezen : null;
  } catch {
    // Bestaat niet, is stuk of onleesbaar: dan halen we hem gewoon op.
    return null;
  }
}

async function naarTijdelijkBestand(gegevens: TotaalBestand): Promise<void> {
  try {
    await mkdir(path.dirname(TIJDELIJK), { recursive: true });
    // Eerst naar een eigen bestand schrijven en dan hernoemen zou netter zijn,
    // maar dit draait alleen tijdens een build. Mocht het schrijven mislukken,
    // dan valt alles terug op ophalen via het netwerk en werkt de build nog.
    await writeFile(TIJDELIJK, JSON.stringify(gegevens), "utf-8");
  } catch {
    // Geen schrijfrechten of geen ruimte: niet erg, het is een optimalisatie.
  }
}

async function haalOp(): Promise<TotaalBestand> {
  const gedeeld = await uitTijdelijkBestand();
  if (gedeeld) return gedeeld;

  const url = `${DATA_BASIS}/honden_totaal.json`;
  // force-cache moet blijven staan: met no-store beschouwt Next de pagina als
  // dynamisch en faalt de statische export. Next kan dit bestand niet in zijn
  // eigen cache kwijt omdat het groter is dan 2 MB, en daar waarschuwt hij
  // over. Dat is onschuldig; het bewaren regelen we hierboven zelf, en daardoor
  // verschijnt die waarschuwing nog maar een enkele keer per build in plaats
  // van bij elke hondpagina.
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

  await naarTijdelijkBestand(gegevens);
  return gegevens;
}

async function haalTotaal(): Promise<TotaalBestand> {
  if (cache) return cache;
  if (bezig) return bezig;

  bezig = haalOp()
    .then((gegevens) => {
      cache = gegevens;
      return gegevens;
    })
    .finally(() => {
      bezig = null;
    });

  return bezig;
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
    origin: bron.herkomst || "",
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
    addedAt: bron.eerst_gezien || "",
    updatedAt: bron.laatst_gewijzigd || bron.eerst_gezien || "",
    waitingMonths: wachttijdInMaanden(bron),
  };
}

/**
 * Hoe lang deze hond al wacht, in maanden.
 *
 * Eerst kijken of de organisatie het zelf zegt; ACE vermeldt "Ter adoptie
 * sinds" en de scraper rekent dat om. Zo niet, dan tellen we vanaf het moment
 * dat wij hem voor het eerst zagen. Dat onderschat de werkelijkheid, maar het
 * onderscheid tussen een hond van vorige week en een van vorig jaar blijft
 * gewoon zichtbaar.
 */
function wachttijdInMaanden(bron: HondBron): number | null {
  const gemeld = bron.extra?.["wacht_maanden"];
  if (typeof gemeld === "number" && gemeld >= 0) return gemeld;

  if (!bron.eerst_gezien) return null;
  const gezien = new Date(bron.eerst_gezien);
  if (Number.isNaN(gezien.getTime())) return null;

  const nu = new Date();
  const maanden =
    (nu.getFullYear() - gezien.getFullYear()) * 12 + (nu.getMonth() - gezien.getMonth());
  return Math.max(maanden, 0);
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

/** Voor teksten met echte aantallen erin. Nooit met de hand invullen. */
export async function getAantallen() {
  const honden = await getHonden();
  const organisaties = await getOrganisaties();
  const landen = new Set(honden.map((hond) => hond.country).filter(Boolean));

  return {
    honden: honden.length,
    beschikbaar: honden.filter((hond) => hond.status === "beschikbaar").length,
    organisaties: organisaties.length,
    landen: landen.size,
  };
}

/**
 * De hond voor het verhalenblok op de homepage.
 *
 * Bewust geen willekeurige keuze: bij een statische export zou dat bij elke
 * build een andere hond opleveren, en dan verandert de homepage zonder dat er
 * iets gebeurd is. We nemen de beschikbare hond met het langste verhaal, want
 * dat is de hond waar de organisatie de meeste moeite in heeft gestoken.
 */
/** Vanaf hier tellen we een hond niet meer als pup, in maanden. */
const PUPGRENS_MAANDEN = 12;

/**
 * De hond die op de homepage wordt uitgelicht.
 *
 * De keuze valt op de hond die het langst wacht. Dat is bewust: pups en jonge
 * honden vinden meestal vanzelf een thuis, terwijl de honden die er al maanden
 * staan juist niemand meer opvalt. Die plek op de homepage is het enige podium
 * dat we te vergeven hebben, en dat hoort naar hen te gaan.
 *
 * Twee voorwaarden waar een hond aan moet voldoen:
 *
 *   Ouder dan een jaar   pups worden hier niet uitgelicht
 *   Een echt verhaal     een blok van drie regels werkt niet in dit ontwerp
 *
 * Over de wachttijd: alleen ACE vermeldt zelf hoelang een hond al ter adoptie
 * staat. Bij de andere organisaties tellen we vanaf het moment dat wij de hond
 * voor het eerst zagen. Dat is een ondergrens, en zolang deze site nog jong is
 * betekent het dat de ACE-honden bovenaan staan. Dat trekt zichzelf recht
 * naarmate we langer draaien: elke dag wordt onze eigen geschiedenis beter.
 */
export async function getVerhaalHond(): Promise<Hond | null> {
  const honden = await getHonden();

  const kandidaten = honden.filter(
    (hond) =>
      hond.status === "beschikbaar" &&
      hond.image &&
      hond.description.length > 300 &&
      hond.ageMonths !== null &&
      hond.ageMonths > PUPGRENS_MAANDEN
  );

  if (kandidaten.length === 0) return null;

  // Langst wachtend eerst. Bij gelijke wachttijd het sterkste verhaal, want
  // dan is er tenminste iets te lezen.
  const gesorteerd = kandidaten.sort((a, b) => {
    const verschil = (b.waitingMonths ?? 0) - (a.waitingMonths ?? 0);
    return verschil !== 0 ? verschil : b.description.length - a.description.length;
  });

  // Uit de dertig langst wachtende kiezen, niet alleen de allerlangste. Anders
  // staat er maandenlang dezelfde hond op de homepage en ziet een terugkerende
  // bezoeker nooit iets nieuws.
  const uitgelicht = gesorteerd.slice(0, 30);

  // Elke dag een andere. Bewust gekoppeld aan de datum en niet aan toeval: de
  // site wordt bij elke publicatie opnieuw gebouwd, soms een paar keer per uur.
  // Met een willekeurige keuze zou de hond op de homepage om de tien minuten
  // wisselen, en dat is onrustig voor wie zit te lezen.
  const vandaag = new Date();
  const dagnummer = Math.floor(
    (Date.UTC(vandaag.getFullYear(), vandaag.getMonth(), vandaag.getDate()) -
      Date.UTC(vandaag.getFullYear(), 0, 1)) /
      86400000
  );

  return uitgelicht[dagnummer % uitgelicht.length];
}

/**
 * De eerste alinea's van een verhaal, voor een blok waar geen ruimte is voor
 * het geheel. Kapt af op een hele alinea in plaats van middenin een zin.
 */
export function eersteAlineas(omschrijving: string, maxTekens = 520): string[] {
  const alineas = omschrijving
    .split(/\n+/)
    .map((regel) => regel.trim())
    .filter((regel) => regel.length > 40);

  const gekozen: string[] = [];
  let totaal = 0;

  for (const alinea of alineas) {
    if (totaal + alinea.length > maxTekens && gekozen.length > 0) break;
    gekozen.push(alinea);
    totaal += alinea.length;
  }

  return gekozen;
}
