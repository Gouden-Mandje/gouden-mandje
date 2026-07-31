import { WHY_POINTS } from "@/lib/data";
import { getAantallen } from "@/lib/honden";
import Reveal from "./Reveal";

export default async function WhySection() {
  const aantallen = await getAantallen();

  // Cijfers uit de data, nooit met de hand ingevuld. Een bezoeker die doorklikt
  // moet precies vinden wat hier staat.
  const CIJFERS: [string, string][] = [
    [
      String(aantallen.organisaties),
      aantallen.organisaties === 1 ? "stichting" : "stichtingen",
    ],
    [
      String(aantallen.landen),
      aantallen.landen === 1 ? "land van herkomst" : "landen van herkomst",
    ],
    [String(aantallen.honden), "honden zoeken een thuis"],
  ];

  return (
    <section id="waarom" className="bg-ink px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Waarom Gouden Mandje
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl [font-family:var(--font-display)]">
              Van dertig tabbladen naar een overzicht
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Wie een rescuehond zoekt, belandt nu in een doolhof van losse
              websites, verouderde pagina&apos;s en Facebook-albums. Wij brengen
              de honden van aangesloten stichtingen samen op een plek. Zodat jij
              je kunt richten op wat telt: de juiste hond vinden.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex gap-10">
              {CIJFERS.map(([num, label]) => (
                <div key={label}>
                  <p className="text-4xl font-medium tracking-tight text-gold [font-family:var(--font-display)]">
                    {num}
                  </p>
                  <p className="mt-1 text-sm text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {WHY_POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i * 100}>
              <div className="h-full rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.1]">
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-5 w-5 text-gold"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m4.5 10.5 3.5 3.5 7.5-8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{point.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">
                  {point.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
