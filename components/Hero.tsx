import Link from "next/link";
import { ArrowRight, GoldenArc } from "./Icons";

export default function Hero() {
  return (
    <section className="px-3 pt-[92px] sm:px-6 sm:pt-[100px] lg:px-8">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem]">
        {/* Sfeerbeeld. Vervang door eigen foto in /public zodra je die hebt. */}
        <img
          src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-[76vh] min-h-[520px] w-full object-cover sm:h-[82vh] sm:min-h-[560px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2016]/85 via-[#2C2016]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C2016]/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <p
              className="hero-rise mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
              <span className="sm:hidden">Nederlandse rescue-stichtingen</span>
              <span className="hidden sm:inline">
                Honden van Nederlandse rescue-stichtingen
              </span>
            </p>

            <h1
              className="hero-rise text-[1.95rem] font-medium leading-[1.12] tracking-tight text-white sm:text-6xl sm:leading-[1.08] lg:text-7xl [font-family:var(--font-display)]"
              style={{ animationDelay: "0.25s" }}
            >
              Elke hond verdient <span className="hidden sm:inline"><br /></span>
              een{" "}
              <span className="relative inline-block whitespace-nowrap">
                gouden mandje
                <GoldenArc className="absolute -bottom-2 left-0 h-[0.35em] w-full sm:-bottom-3" />
              </span>
              .
            </h1>

            <p
              className="hero-rise mt-5 max-w-xl text-[17px] leading-relaxed text-white/85 sm:mt-6 sm:text-xl"
              style={{ animationDelay: "0.4s" }}
            >
              Ontdek rescuehonden van Nederlandse stichtingen die honden uit het
              buitenland een tweede kans geven. Adopteren doe je bij de stichting
              zelf.
            </p>

            <div
              className="hero-rise mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center"
              style={{ animationDelay: "0.55s" }}
            >
              <Link
                href="/honden/"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base sm:py-4 font-semibold text-ink shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Bekijk honden
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/voor-stichtingen/"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 py-3.5 text-base sm:py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Voor stichtingen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
