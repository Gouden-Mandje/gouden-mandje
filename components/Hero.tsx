import { ArrowRight, GoldenArc } from "./Icons";

export default function Hero() {
  return (
    <section className="px-4 pt-[100px] sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem]">
        {/* Vervang door eigen beeld in /public */}
        <img
          src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=2000&q=80"
          alt="Rescuehond kijkt rustig in de camera"
          className="h-[82vh] min-h-[560px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2016]/85 via-[#2C2016]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C2016]/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <p
              className="hero-rise mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-clay" />
              Honden van betrouwbare Nederlandse stichtingen
            </p>

            <h1
              className="hero-rise text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl [font-family:var(--font-display)]"
              style={{ animationDelay: "0.25s" }}
            >
              Iedere hond verdient
              <br />
              een{" "}
              <span className="relative inline-block whitespace-nowrap">
                gouden mandje
                <GoldenArc className="absolute -bottom-2 left-0 h-[0.35em] w-full sm:-bottom-3" />
              </span>
              .
            </h1>

            <p
              className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl"
              style={{ animationDelay: "0.4s" }}
            >
              Ontdek rescuehonden van betrouwbare Nederlandse stichtingen die
              honden uit het buitenland een tweede kans geven.
            </p>

            <div
              className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "0.55s" }}
            >
              <a
                href="#honden"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-ink shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Bekijk honden
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#stichtingen"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Voor stichtingen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
