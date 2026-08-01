import Link from "next/link";
import { eersteAlineas, getVerhaalHond } from "@/lib/honden";
import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";

/**
 * Eén hond uitgelicht met zijn eigen verhaal.
 *
 * Bewust een ECHTE hond uit de data, geen verzonnen voorbeeld. Een site die
 * belooft geen mooipraterij te verkopen, kan geen stockfoto met een bedacht
 * verhaal op de homepage zetten.
 */
export default async function StorySection() {
  const hond = await getVerhaalHond();
  if (!hond) return null;

  const alineas = eersteAlineas(hond.description);

  return (
    <section className="bg-beige px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative">
            <img
              src={hond.image}
              alt={`${hond.name}, rescuehond uit ${hond.origin || hond.country}`}
              className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-[0_32px_80px_-24px_rgba(61,46,34,0.3)]"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-4 rounded-3xl border border-sand bg-white px-6 py-5 shadow-xl sm:-right-8">
              <p className="text-sm font-medium text-taupe">Leeftijd</p>
              <p className="mt-0.5 text-2xl font-medium tracking-tight text-ink [font-family:var(--font-display)]">
                {hond.age}
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Het verhaal van {hond.name}
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl [font-family:var(--font-display)]">
              {hond.name} zoekt een eigen mandje.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-[#6B5847]">
              {alineas.map((alinea, i) => (
                <p key={i}>{alinea}</p>
              ))}
            </div>
            <p className="mt-6 text-[15px] text-taupe">
              Opgevangen door {hond.organisation}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <Link
              href={`/honden/${hond.id}/`}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016] hover:shadow-xl"
            >
              Lees het hele verhaal
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
