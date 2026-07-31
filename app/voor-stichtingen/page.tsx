import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { getAantallen } from "@/lib/honden";

export const metadata: Metadata = {
  title: "Voor stichtingen | Gouden Mandje",
  description:
    "Wat Gouden Mandje voor rescue-stichtingen doet: meer bezoekers naar jullie eigen website, zonder kosten en zonder dat jullie iets hoeven bij te houden.",
};

function Blok({
  titel,
  children,
}: {
  titel: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-medium tracking-tight [font-family:var(--font-display)] sm:text-3xl">
        {titel}
      </h2>
      <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[#6B5847]">
        {children}
      </div>
    </section>
  );
}

export default async function VoorStichtingen() {
  const aantallen = await getAantallen();

  return (
    <main>
      <Nav />

      <article className="px-4 pb-24 pt-32 sm:px-6 sm:pb-32 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Voor stichtingen
          </p>
          <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-6xl [font-family:var(--font-display)]">
            Meer mensen bij jullie honden krijgen
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-taupe">
            Gouden Mandje verzamelt adoptiehonden van Nederlandse rescue-stichtingen
            op één plek. Wie hier een hond vindt, klikt door naar jullie eigen
            website. Daar loopt de adoptie verder, precies zoals nu.
          </p>

          <Blok titel="Wat het jullie oplevert">
            <p>
              Mensen die een hond zoeken, weten vaak niet welke stichtingen er
              bestaan. Ze zoeken op &quot;hond adopteren&quot; en komen uit bij de drie
              organisaties die toevallig bovenaan Google staan. De rest wordt
              simpelweg niet gevonden.
            </p>
            <p>
              Bij ons staat elke hond met naam, foto&apos;s en verhaal, en bij elke
              hond staat wie hem opvangt. Elke bezoeker die verder wil, gaat naar
              jullie site.
            </p>
          </Blok>

          <Blok titel="Wat wij niet doen">
            <ul className="ml-5 list-disc space-y-2">
              <li>Wij bemiddelen niet en doen geen adoptiegesprekken.</li>
              <li>Wij vragen geen geld, niet aan jullie en niet aan adoptanten.</li>
              <li>Wij vragen geen exclusiviteit. Jullie blijven doen wat jullie doen.</li>
              <li>Wij nemen geen contactgegevens van geïnteresseerden aan.</li>
              <li>Wij plaatsen geen advertenties bij jullie honden.</li>
            </ul>
          </Blok>

          <Blok titel="Wat het jullie kost aan werk">
            <p>
              Niets. Jullie hoeven geen account aan te maken, geen honden in te
              voeren en niets bij te houden. Wij halen de honden van jullie eigen
              website en houden ze automatisch bij.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Een nieuwe hond op jullie site staat er bij ons meestal binnen een dag ook op.</li>
              <li>Is een hond geadopteerd of van jullie site gehaald, dan verdwijnt hij bij ons vanzelf.</li>
              <li>Passen jullie een omschrijving of foto aan, dan gaat dat automatisch mee.</li>
              <li>Bij elke hond staat jullie naam, met een knop naar jullie eigen pagina.</li>
            </ul>
            <p>
              Wij tonen alleen wat al openbaar op jullie website staat. Wil je
              precies weten hoe wij dat ophalen, vraag het gerust, dan leggen we
              het uit.
            </p>
          </Blok>

          <Blok titel="En als jullie het niet willen">
            <p>
              Dan halen wij jullie honden weg. Eén mail is genoeg, geen uitleg
              nodig, geen opzegtermijn. Wij zetten geen enkele stichting op de site
              die daar bezwaar tegen heeft.
            </p>
            <p>
              Willen jullie liever dat wij bepaalde honden niet tonen, of alleen
              honden met een bepaalde status, dan is dat ook te regelen.
            </p>
          </Blok>

          <Blok titel="Waar we nu staan">
            <p>
              Eerlijk is eerlijk: Gouden Mandje is net begonnen. Op dit moment
              staan er {aantallen.honden} honden op de site van{" "}
              {aantallen.organisaties === 1
                ? "één stichting"
                : `${aantallen.organisaties} stichtingen`}
              . Wij vertellen niet dat er tientallen meedoen, want dat is niet zo.
            </p>
            <p>
              Wat er wel is: een werkend platform dat elke hond automatisch
              bijhoudt, en iemand die er tijd in steekt omdat er te veel honden te
              lang wachten.
            </p>
          </Blok>

          <div className="mt-14 rounded-[2rem] bg-beige p-8 sm:p-10">
            <h2 className="text-2xl font-medium tracking-tight [font-family:var(--font-display)]">
              Meedoen of eerst iets vragen?
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-[#6B5847]">
              Stuur een mail, dan reageren we binnen een paar dagen. Vragen stellen
              verplicht tot niets.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:info@gouden-mandje.nl?subject=Vraag%20over%20Gouden%20Mandje"
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016]"
              >
                info@gouden-mandje.nl
              </a>
              <Link
                href="/honden/"
                className="inline-flex items-center justify-center rounded-full border border-ink px-8 py-4 text-base font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-white"
              >
                Bekijk de honden
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
