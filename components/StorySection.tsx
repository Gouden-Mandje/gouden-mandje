import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";

export default function StorySection() {
  return (
    <section className="bg-beige px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=1200&q=80"
              alt="Bruno, een oudere rescuehond, kijkt rustig weg"
              className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-[0_32px_80px_-24px_rgba(61,46,34,0.3)]"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-4 rounded-3xl border border-sand bg-white px-6 py-5 shadow-xl sm:-right-8">
              <p className="text-sm font-medium text-taupe">Wachttijd</p>
              <p className="mt-0.5 text-3xl font-medium tracking-tight text-ink [font-family:var(--font-display)]">
                4 jaar
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Het verhaal van Bruno
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl [font-family:var(--font-display)]">
              Bruno wacht al 4 jaar op zijn eigen mandje.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-[#6B5847]">
              <p>
                Bruno werd als jonge hond gevonden langs een weg in Roemenië.
                Sindsdien woont hij in de opvang van een Nederlandse stichting.
                Hij kent de vrijwilligers, de vaste rondjes, het geluid van de
                voerbakken om vijf uur.
              </p>
              <p>
                Wat hij niet kent, is een eigen plek. Een bank waar hij mag
                liggen. Iemand die er ook morgen nog is.
              </p>
              <p>
                Bruno is rustig, huiskamerklaar en geduldiger dan de meeste
                mensen. Hij vraagt weinig. Alleen iemand die hem ziet.
              </p>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <a
              href="#"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016] hover:shadow-xl"
            >
              Lees Bruno&apos;s verhaal
              <ArrowRight />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
