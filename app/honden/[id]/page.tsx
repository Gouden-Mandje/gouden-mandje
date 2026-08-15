import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DeelKnop from "@/components/DeelKnop";
import Footer from "@/components/Footer";
import HondGalerij from "@/components/HondGalerij";
import Nav from "@/components/Nav";
import TerugKnop from "@/components/TerugKnop";
import { getHond, getHonden } from "@/lib/honden";

/**
 * Detailpagina van één hond.
 *
 * Bij een statische export bouwt Next voor elke hond een echte HTML-pagina.
 * Dat is precies wat je wil voor vindbaarheid: iemand die zoekt op "Phreya
 * adopteren" komt direct op de juiste pagina uit.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  const honden = await getHonden();
  return honden.map((hond) => ({ id: hond.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const hond = await getHond(id);

  if (!hond) {
    return { title: "Hond niet gevonden | Gouden Mandje" };
  }

  const omschrijving =
    hond.character ||
    `${hond.name} zoekt een thuis via ${hond.organisation}.`;

  return {
    title: `${hond.name} | Gouden Mandje`,
    description: omschrijving,
    openGraph: {
      title: `${hond.name} zoekt een gouden mandje`,
      description: omschrijving,
      images: hond.image ? [hond.image] : undefined,
      type: "article",
    },
  };
}

function Kenmerk({ label, waarde }: { label: string; waarde: string }) {
  return (
    <div className="rounded-2xl border border-sand bg-white px-5 py-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-taupe">{label}</dt>
      <dd className="mt-1 text-[15px] font-medium text-ink">{waarde}</dd>
    </div>
  );
}

const GROOTTE_LABELS: Record<string, string> = {
  klein: "Klein",
  middel: "Middelgroot",
  groot: "Groot",
  onbekend: "Onbekend",
};

/**
 * Herkent een YouTube-adres in de tekst van een stichting.
 *
 * Bewust alleen YouTube. In de verhalen staan op dit moment 253 YouTube-links
 * en verder niets, dus alles klikbaar maken zou een oplossing zijn voor een
 * probleem dat er niet is. En er zit een principieel punt aan: een link
 * klikbaar maken is meer dan hem tonen, je nodigt uit om erop te klikken. Bij
 * YouTube weet je waar iemand terechtkomt, bij een willekeurig adres niet.
 *
 * Komt er ooit een andere videodienst bij, dan hoor je dat vanzelf en kan dit
 * patroon uitgebreid worden.
 */
const YOUTUBE = /(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s<>")\]]+)/gi;

/**
 * Zet YouTube-adressen in een alinea om in een leesbare link.
 *
 * Het adres zelf tonen zou letterlijker zijn, maar "https://youtube.com/shorts/
 * lXdpHulptzA" nodigt niemand uit om erop te klikken. De link wijst naar
 * precies hetzelfde adres als er stond; alleen de weergave verandert.
 *
 * Bewust rustig vormgegeven: in de kleur van de tekst eromheen, alleen
 * onderstreept en met een klein pictogram. De eerste versie was vetgedrukt en
 * in de donkere inktkleur, en dat trok de aandacht weg van het verhaal zelf.
 *
 * Opent in een nieuw tabblad, zodat de bezoeker deze pagina niet kwijtraakt.
 * Bewust geen ingesloten speler: die laadt zwaar script van Google op elke
 * hondpagina, plaatst cookies, en houdt mensen weg van het kanaal van de
 * stichting waar ze meer van hun honden zien.
 */
function metVideoLinks(alinea: string, naam: string) {
  const delen = alinea.split(YOUTUBE);
  if (delen.length === 1) return alinea;

  return delen.map((deel, i) => {
    if (!YOUTUBE.test(deel)) {
      YOUTUBE.lastIndex = 0;
      return deel;
    }
    YOUTUBE.lastIndex = 0;

    return (
      <a
        key={i}
        href={deel}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 underline decoration-sand underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
      >
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
          <rect
            x="2.5"
            y="5"
            width="15"
            height="10"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M8.5 8v4l3.5-2z" fill="currentColor" />
        </svg>
        Bekijk het filmpje van {naam}
      </a>
    );
  });
}

export default async function HondPagina({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hond = await getHond(id);

  if (!hond) notFound();

  const alinea_s = hond.description
    .split(/\n{1,}/)
    .map((regel) => regel.trim())
    .filter(Boolean);

  return (
    <main>
      <Nav />

      <article className="px-4 pb-24 pt-32 sm:px-6 sm:pb-32 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Neemt je filters mee terug. Deze knop verwees hiervoor hard naar
              /honden/ en gooide daarmee je hele zoektocht weg. */}
          <TerugKnop />

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
            {/* Foto's en verhaal */}
            <div>
              <HondGalerij fotos={hond.images} naam={hond.name} />

              {alinea_s.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-medium tracking-tight [font-family:var(--font-display)] sm:text-3xl">
                    Het verhaal van {hond.name}
                  </h2>
                  <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-[#6B5847]">
                    {alinea_s.map((alinea, i) => (
                      <p key={i}>{metVideoLinks(alinea, hond.name)}</p>
                    ))}
                  </div>

                  {/*
                    Wie de tekst geschreven heeft.

                    Dit staat er om twee redenen. Voor de lezer is het duidelijk
                    dat hij het verhaal van de stichting leest en niet dat van
                    ons; die twee kunnen anders door elkaar lopen omdat het op
                    ons domein staat.

                    En het legt vast dat wij niets aanpassen. Dat is een keuze
                    die het hele project doortrekt: verandert de tekst, dan komt
                    dat doordat de stichting hem heeft aangepast. Zou je hier
                    ooit toch een woord veranderen, dan klopt deze regel niet
                    meer en vervalt precies de duidelijkheid waar hij voor
                    bedoeld is.
                  */}
                  <p className="mt-6 border-t border-sand pt-4 text-[13px] italic leading-relaxed text-taupe">
                    Deze tekst is ongewijzigd overgenomen van {hond.organisation}.
                  </p>
                </div>
              )}
            </div>

            {/* Gegevens en adoptieknop */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[2rem] border border-sand bg-white p-7 shadow-[0_24px_60px_-20px_rgba(61,46,34,0.18)]">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-4xl font-medium leading-tight tracking-tight [font-family:var(--font-display)]">
                    {hond.name}
                  </h1>
                  <span
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
                      hond.status === "gereserveerd"
                        ? "bg-clay/90 text-white"
                        : "bg-ink/85 text-[#EFDFC8]"
                    }`}
                  >
                    {hond.statusLabel}
                  </span>
                </div>

                <p className="mt-2 text-[15px] text-taupe">
                  {hond.origin && hond.origin !== hond.country
                    ? `Uit ${hond.origin}, verblijft in ${hond.country}`
                    : hond.country || hond.origin}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-3">
                  <Kenmerk label="Leeftijd" waarde={hond.age} />
                  <Kenmerk label="Geslacht" waarde={hond.genderLabel} />
                  <Kenmerk label="Grootte" waarde={GROOTTE_LABELS[hond.size] ?? "Onbekend"} />
                  {hond.breed && <Kenmerk label="Ras" waarde={hond.breed} />}
                  {hond.origin && <Kenmerk label="Herkomst" waarde={hond.origin} />}
                </dl>

                <div className="mt-7 rounded-2xl bg-cream p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-taupe">
                    Aangeboden door
                  </p>
                  <p className="mt-1 text-[17px] font-medium text-ink">{hond.organisation}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-taupe">
                    De adoptie loopt volledig via deze stichting. Zij kennen {hond.name} en
                    begeleiden je van kennismaking tot thuiskomst.
                  </p>
                </div>

                <a
                  href={hond.adoptionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-8 py-4 text-base font-semibold text-white shadow-lg shadow-clay/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C97E3F] hover:shadow-xl hover:shadow-clay/30"
                >
                  Bekijk {hond.name} bij {hond.organisation}
                  <span aria-hidden="true">↗</span>
                </a>
                <p className="mt-3 text-center text-[13px] text-taupe">
                  Je gaat naar de website van de stichting
                </p>

                <DeelKnop naam={hond.name} organisatie={hond.organisation} />
              </div>
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
