import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Privacy | Gouden Mandje",
  description:
    "Hoe Gouden Mandje omgaat met gegevens: geen cookies, geen tracking, en welke gegevens er wel verwerkt worden.",
};

/**
 * Bedrijfsgegevens. Vul adres en kvk in zodra de inschrijving rond is; de
 * pagina neemt ze dan automatisch mee in de eerste alinea. Zolang ze leeg
 * zijn worden ze gewoon weggelaten, zonder dat de tekst erover struikelt.
 */
const VERANTWOORDELIJKE = {
  naam: "Gouden Mandje",
  adres: "",
  kvk: "",
  email: "info@gouden-mandje.nl",
};

function Blok({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-medium tracking-tight [font-family:var(--font-display)] sm:text-3xl">
        {titel}
      </h2>
      <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[#6B5847]">
        {children}
      </div>
    </section>
  );
}

export default function Privacy() {
  return (
    <main>
      <Nav />

      <article className="px-4 pb-24 pt-32 sm:px-6 sm:pb-32 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Privacy
          </p>
          <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-6xl [font-family:var(--font-display)]">
            Hoe wij met gegevens omgaan
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-taupe">
            Kort samengevat: wij verzamelen niets van je. Geen account, geen
            cookies, geen advertentietrackers.
          </p>

          <Blok titel="Wie verantwoordelijk is">
            <p>
              {VERANTWOORDELIJKE.naam}
              {VERANTWOORDELIJKE.adres ? `, ${VERANTWOORDELIJKE.adres}` : ""}
              {VERANTWOORDELIJKE.kvk
                ? `. Ingeschreven bij de Kamer van Koophandel onder nummer ${VERANTWOORDELIJKE.kvk}`
                : ""}
              . Voor vragen over deze verklaring of over gegevens op deze site zijn
              wij bereikbaar via{" "}
              <a
                href={`mailto:${VERANTWOORDELIJKE.email}`}
                className="underline decoration-sand underline-offset-4 hover:text-ink"
              >
                {VERANTWOORDELIJKE.email}
              </a>
              .
            </p>
          </Blok>

          <Blok titel="Wat wij van bezoekers verwerken">
            <p>
              Niets wat naar jou te herleiden is. Deze site heeft geen
              inlogfunctie, geen contactformulier en geen nieuwsbrief. Wij
              plaatsen geen cookies en gebruiken geen analysesoftware.
            </p>
            <p>
              Onze site draait bij Cloudflare. Zij verwerken technische gegevens
              die nodig zijn om een website te kunnen tonen, zoals je IP-adres,
              en gebruiken die voor beveiliging en om storingen te herkennen. Dat
              gebeurt op elke website; wij hebben er geen toegang toe en koppelen
              er niets aan.
            </p>
            <p>
              Klik je door naar de website van een stichting, dan gelden vanaf dat
              moment hun voorwaarden en hun privacybeleid.
            </p>
          </Blok>

          <Blok titel="Gegevens over honden en stichtingen">
            <p>
              Wij tonen gegevens over adoptiehonden die de stichtingen zelf
              openbaar op hun website hebben gezet: naam, foto&apos;s, leeftijd,
              geslacht en de omschrijving. Bij elke hond staat welke stichting
              hem aanbiedt, met een link naar de oorspronkelijke pagina.
            </p>
            <p>
              Dit gaat niet over persoonsgegevens van adoptanten of vrijwilligers.
              Komen wij zulke gegevens tegen in een tekst, dan tonen wij ze niet.
            </p>
            <p>
              Is een stichting het er niet mee eens dat haar honden hier staan, dan
              halen wij ze weg. Eén mail is genoeg, zonder opgaaf van reden.
            </p>
          </Blok>

          <Blok titel="Bewaartermijn">
            <p>
              Een hond die van de website van de stichting verdwijnt, verdwijnt
              ook hier. Wij bewaren zo&apos;n record nog kort in ons archief om te
              kunnen herkennen dat een hond terugkomt, bijvoorbeeld wanneer een
              adoptie afketst. Daarna wordt het opgeruimd.
            </p>
          </Blok>

          <Blok titel="Je rechten">
            <p>
              Omdat wij geen persoonsgegevens van bezoekers verzamelen, valt er
              voor bezoekers weinig in te zien of te verwijderen. Denk je toch dat
              er gegevens over jou op deze site staan, stuur dan een mail. Wij
              reageren binnen vier weken.
            </p>
            <p>
              Kom je er met ons niet uit, dan kun je een klacht indienen bij de
              Autoriteit Persoonsgegevens.
            </p>
          </Blok>

          <p className="mt-12 text-[15px] text-taupe">
            Deze verklaring kan wijzigen wanneer de site verandert. De actuele
            versie staat altijd op deze pagina.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
