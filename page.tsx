"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ============================================================
   Gouden Mandje | Homepage
   Foto's zijn Unsplash placeholders, vervang door eigen beeld.
   ============================================================ */

/* ---------- Data ---------- */

type Dog = {
  name: string;
  age: string;
  country: string;
  flag: string;
  character: string;
  waiting: string;
  image: string;
};

const DOGS: Dog[] = [
  {
    name: "Luna",
    age: "2 jaar",
    country: "Griekenland",
    flag: "🇬🇷",
    character: "Zachtaardig, aanhankelijk en dol op wandelen",
    waiting: "Wacht al 8 maanden",
    image:
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Rocco",
    age: "4 jaar",
    country: "Spanje",
    flag: "🇪🇸",
    character: "Rustige kracht, geduldig en kindvriendelijk",
    waiting: "Wacht al 1,5 jaar",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mira",
    age: "1 jaar",
    country: "Roemenië",
    flag: "🇷🇴",
    character: "Speels, slim en leert razendsnel",
    waiting: "Wacht al 5 maanden",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Toby",
    age: "6 jaar",
    country: "Curaçao",
    flag: "🇨🇼",
    character: "Loyale knuffelaar die rust zoekt",
    waiting: "Wacht al 2 jaar",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
  },
];

const FILTERS = [
  { label: "Land", options: ["Alle landen", "Griekenland", "Spanje", "Roemenië", "Portugal", "Curaçao"] },
  { label: "Leeftijd", options: ["Alle leeftijden", "Puppy", "1 tot 3 jaar", "3 tot 7 jaar", "Senior"] },
  { label: "Grootte", options: ["Alle groottes", "Klein", "Middel", "Groot"] },
  { label: "Geslacht", options: ["Alle", "Reu", "Teef"] },
  { label: "Kan met kinderen", options: ["Maakt niet uit", "Ja", "Nee"] },
  { label: "Kan met katten", options: ["Maakt niet uit", "Ja", "Nee"] },
];

/* ---------- Scroll reveal ---------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Signature: gouden boog ---------- */

function GoldenArc({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 24"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        className="arc-path"
        d="M6 6 C 60 26, 240 26, 294 6"
        stroke="#C69A5B"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- Navigatie ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FBF8F3]/90 backdrop-blur-xl shadow-[0_1px_0_0_#E7DDCD]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#3D2E22] transition-transform duration-300 group-hover:scale-105">
            {/* Mandje-icoon */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M4 11 C 6 18, 18 18, 20 11"
                stroke="#C69A5B"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M8 11 C 8 6, 16 6, 16 11"
                stroke="#C69A5B"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight [font-family:var(--font-display)]">
            Gouden Mandje
          </span>
        </a>

        <div className="hidden items-center gap-9 text-[15px] font-medium text-[#6B5847] md:flex">
          <a href="#honden" className="transition-colors hover:text-[#3D2E22]">Honden</a>
          <a href="#hoe" className="transition-colors hover:text-[#3D2E22]">Hoe het werkt</a>
          <a href="#waarom" className="transition-colors hover:text-[#3D2E22]">Waarom wij</a>
          <a href="#stichtingen" className="transition-colors hover:text-[#3D2E22]">Voor stichtingen</a>
          <a
            href="#honden"
            className="rounded-full bg-[#3D2E22] px-6 py-2.5 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016] hover:shadow-lg"
          >
            Bekijk honden
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-[#F2EBDF] md:hidden"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 rounded bg-[#3D2E22] transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 rounded bg-[#3D2E22] transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 rounded bg-[#3D2E22] transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobiel menu */}
      <div
        className={`overflow-hidden bg-[#FBF8F3]/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? "max-h-96 border-b border-[#E7DDCD]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4 text-[15px] font-medium text-[#6B5847]">
          {[
            ["Honden", "#honden"],
            ["Hoe het werkt", "#hoe"],
            ["Waarom wij", "#waarom"],
            ["Voor stichtingen", "#stichtingen"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 transition-colors hover:bg-[#F2EBDF] hover:text-[#3D2E22]"
            >
              {label}
            </a>
          ))}
          <a
            href="#honden"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-[#3D2E22] px-6 py-3 text-center text-white"
          >
            Bekijk honden
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="px-4 pt-[100px] sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem]">
        <img
          src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=2000&q=80"
          alt="Rescuehond kijkt rustig in de camera"
          className="h-[82vh] min-h-[560px] w-full object-cover"
        />
        {/* Warme overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2016]/85 via-[#2C2016]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C2016]/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <p className="hero-rise mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md" style={{ animationDelay: "0.1s" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#D98E4F]" />
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
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#3D2E22] shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Bekijk honden
                <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden="true">
                  <path d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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

/* ---------- Zoeken ---------- */

function SearchSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8">
      <Reveal className="mx-auto -mt-14 max-w-6xl sm:-mt-16">
        <div className="rounded-[2rem] border border-[#E7DDCD] bg-white p-6 shadow-[0_24px_60px_-20px_rgba(61,46,34,0.18)] sm:p-8">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-medium tracking-tight [font-family:var(--font-display)] sm:text-2xl">
                Vind jouw match
              </h2>
              <p className="mt-1 text-[15px] text-[#8A745F]">
                Honderden honden van tientallen stichtingen, op een plek.
              </p>
            </div>
            <p className="hidden text-sm text-[#8A745F] sm:block">328 honden beschikbaar</p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {FILTERS.map((filter) => (
              <label key={filter.label} className="group relative block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#8A745F]">
                  {filter.label}
                </span>
                <div className="relative">
                  <select
                    className="w-full cursor-pointer appearance-none rounded-2xl border border-[#E7DDCD] bg-[#FBF8F3] px-4 py-3.5 pr-9 text-[15px] font-medium text-[#3D2E22] outline-none transition-all duration-300 hover:border-[#C69A5B] focus:border-[#C69A5B] focus:ring-4 focus:ring-[#C69A5B]/15"
                    aria-label={filter.label}
                  >
                    {filter.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <svg viewBox="0 0 20 20" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A745F]" fill="none" aria-hidden="true">
                    <path d="m6 8 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button className="text-left text-sm font-medium text-[#8A745F] underline decoration-[#E7DDCD] underline-offset-4 transition-colors hover:text-[#3D2E22]">
              Filters wissen
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D98E4F] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#D98E4F]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C97E3F] hover:shadow-xl hover:shadow-[#D98E4F]/30">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="m13.5 13.5 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Zoek honden
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Uitgelichte honden ---------- */

function DogCard({ dog, delay }: { dog: Dog; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group overflow-hidden rounded-[1.75rem] border border-[#E7DDCD] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-20px_rgba(61,46,34,0.22)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={dog.image}
            alt={`${dog.name}, rescuehond uit ${dog.country}`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[13px] font-semibold text-[#3D2E22] backdrop-blur-md">
            {dog.flag} {dog.country}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-[#3D2E22]/80 px-3.5 py-1.5 text-[13px] font-medium text-[#EFDFC8] backdrop-blur-md">
            {dog.waiting}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-medium tracking-tight [font-family:var(--font-display)]">
              {dog.name}
            </h3>
            <span className="text-sm font-medium text-[#8A745F]">{dog.age}</span>
          </div>
          <p className="mt-2 min-h-[3rem] text-[15px] leading-relaxed text-[#6B5847]">
            {dog.character}
          </p>
          <a
            href="#"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#3D2E22] px-6 py-3 text-[15px] font-semibold text-[#3D2E22] transition-all duration-300 hover:bg-[#3D2E22] hover:text-white"
          >
            Bekijk verhaal
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function FeaturedDogs() {
  return (
    <section id="honden" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C69A5B]">
              Uitgelicht
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl [font-family:var(--font-display)]">
              Zij wachten op hun mandje
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[#3D2E22]"
          >
            Alle 328 honden
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7DDCD] transition-all duration-300 group-hover:border-[#3D2E22] group-hover:bg-[#3D2E22] group-hover:text-white">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {DOGS.map((dog, i) => (
            <DogCard key={dog.name} dog={dog} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Emotioneel verhaal ---------- */

function StorySection() {
  return (
    <section className="bg-[#F2EBDF] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=1200&q=80"
              alt="Bruno, een oudere rescuehond, kijkt rustig weg"
              className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-[0_32px_80px_-24px_rgba(61,46,34,0.3)]"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-4 rounded-3xl border border-[#E7DDCD] bg-white px-6 py-5 shadow-xl sm:-right-8">
              <p className="text-sm font-medium text-[#8A745F]">Wachttijd</p>
              <p className="mt-0.5 text-3xl font-medium tracking-tight text-[#3D2E22] [font-family:var(--font-display)]">
                4 jaar
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C69A5B]">
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
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#3D2E22] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016] hover:shadow-xl"
            >
              Lees Bruno&apos;s verhaal
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Hoe het werkt ---------- */

const STEPS = [
  {
    title: "Vind jouw hond",
    text: "Zoek en filter door honden van tientallen Nederlandse stichtingen. Alles overzichtelijk op een plek.",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden="true">
        <circle cx="12.5" cy="12.5" r="7.5" stroke="currentColor" strokeWidth="2" />
        <path d="m18.5 18.5 4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Lees het verhaal",
    text: "Iedere hond heeft een eerlijk profiel: karakter, achtergrond en wat hij of zij nodig heeft in een thuis.",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden="true">
        <path d="M14 6.5C11.5 4.5 7 4 4.5 5.5v16C7 20 11.5 20.5 14 22.5c2.5-2 7-2.5 9.5-1v-16C21 4 16.5 4.5 14 6.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 6.5v16" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Adopteer via de stichting",
    text: "Klik door naar de stichting en doorloop daar de adoptie. Wij verbinden, zij begeleiden van kennismaking tot mandje.",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden="true">
        <path d="M14 23s-9-5.5-9-12A5.5 5.5 0 0 1 14 8a5.5 5.5 0 0 1 9 3c0 6.5-9 12-9 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function HowItWorks() {
  return (
    <section id="hoe" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C69A5B]">
            Hoe het werkt
          </p>
          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl [font-family:var(--font-display)]">
            In drie stappen naar een gouden mandje
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 120}>
              <div className="group h-full rounded-[2rem] border border-[#E7DDCD] bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-20px_rgba(61,46,34,0.18)] sm:p-10">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2EBDF] text-[#C69A5B] transition-colors duration-500 group-hover:bg-[#3D2E22]">
                  {step.icon}
                </div>
                <p className="mb-2 text-sm font-semibold text-[#C69A5B]">Stap {i + 1}</p>
                <h3 className="text-2xl font-medium tracking-tight [font-family:var(--font-display)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#6B5847]">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-12 max-w-2xl rounded-3xl bg-[#F2EBDF] px-8 py-6 text-center text-[15px] leading-relaxed text-[#6B5847]">
            <strong className="font-semibold text-[#3D2E22]">Goed om te weten:</strong>{" "}
            Gouden Mandje is geen asiel. Adopteren gebeurt altijd rechtstreeks
            via de stichting die de hond heeft gered.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Waarom Gouden Mandje ---------- */

function WhySection() {
  const points = [
    {
      title: "Alles op een plek",
      text: "Geen tientallen websites meer afstruinen. Alle honden van aangesloten stichtingen vind je hier, in een overzicht.",
    },
    {
      title: "Alleen betrouwbare stichtingen",
      text: "Wij werken uitsluitend met geregistreerde Nederlandse stichtingen met een zorgvuldige adoptieprocedure.",
    },
    {
      title: "Eerlijke profielen",
      text: "Geen mooipraterij. Ieder profiel vertelt wat een hond echt nodig heeft, zodat de match klopt.",
    },
    {
      title: "Gratis voor iedereen",
      text: "Voor adoptanten en stichtingen. Ons doel is simpel: meer honden in een gouden mandje.",
    },
  ];

  return (
    <section id="waarom" className="bg-[#3D2E22] px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C69A5B]">
              Waarom Gouden Mandje
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl [font-family:var(--font-display)]">
              Van dertig tabbladen naar een overzicht
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Wie een rescuehond zoekt, belandt nu in een doolhof van losse
              websites, verouderde pagina&apos;s en Facebook-albums. Wij brengen
              alle honden van Nederlandse stichtingen samen. Zodat jij je kunt
              richten op wat telt: de juiste hond vinden.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex gap-10">
              <div>
                <p className="text-4xl font-medium tracking-tight text-[#C69A5B] [font-family:var(--font-display)]">40+</p>
                <p className="mt-1 text-sm text-white/70">stichtingen</p>
              </div>
              <div>
                <p className="text-4xl font-medium tracking-tight text-[#C69A5B] [font-family:var(--font-display)]">5</p>
                <p className="mt-1 text-sm text-white/70">landen van herkomst</p>
              </div>
              <div>
                <p className="text-4xl font-medium tracking-tight text-[#C69A5B] [font-family:var(--font-display)]">328</p>
                <p className="mt-1 text-sm text-white/70">honden zoeken een thuis</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 100}>
              <div className="h-full rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.1]">
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C69A5B]/15">
                  <svg viewBox="0 0 20 20" className="h-5 w-5 text-[#C69A5B]" fill="none" aria-hidden="true">
                    <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{point.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{point.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */

function CtaSection() {
  return (
    <section id="stichtingen" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#F2EBDF] px-8 py-20 text-center sm:px-16 sm:py-28">
          {/* Zachte gouden gloed */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C69A5B]/20 blur-3xl" />

          <h2 className="relative text-3xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl [font-family:var(--font-display)]">
            Iedere hond verdient een kans.
            <br />
            <span className="text-[#8A745F]">Help mee een gouden mandje te vinden.</span>
          </h2>
          <a
            href="#honden"
            className="group relative mt-10 inline-flex items-center gap-2 rounded-full bg-[#3D2E22] px-10 py-5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016] hover:shadow-2xl"
          >
            Bekijk alle honden
            <svg viewBox="0 0 20 20" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden="true">
              <path d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-[#E7DDCD] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#3D2E22]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M4 11 C 6 18, 18 18, 20 11" stroke="#C69A5B" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M8 11 C 8 6, 16 6, 16 11" stroke="#C69A5B" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-tight [font-family:var(--font-display)]">
                Gouden Mandje
              </span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-[#8A745F]">
              Het platform waar je rescuehonden van Nederlandse stichtingen
              ontdekt. Adoptie gebeurt altijd via de stichting zelf.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-16 gap-y-3 text-[15px] font-medium text-[#6B5847] sm:grid-cols-2" aria-label="Footer">
            {[
              ["Over ons", "#"],
              ["Voor stichtingen", "#stichtingen"],
              ["Contact", "#"],
              ["Privacy", "#"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="transition-colors hover:text-[#3D2E22]">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {[
              {
                label: "Instagram",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                  </svg>
                ),
              },
              {
                label: "TikTok",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path d="M14.5 3.5v10.8a3.8 3.8 0 1 1-3.3-3.77" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M14.5 5.2c.6 2.2 2.3 3.7 4.7 3.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                label: "Facebook",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path d="M14.5 8.5H17V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H8.5v3.5H11V21h3.5v-6.5H17l.5-3.5h-3v-2a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E7DDCD] text-[#8A745F] transition-all duration-300 hover:border-[#3D2E22] hover:bg-[#3D2E22] hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[#E7DDCD] pt-8 text-sm text-[#8A745F] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gouden Mandje. Alle rechten voorbehouden.</p>
          <p>Iedere hond verdient een gouden mandje.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Pagina ---------- */

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SearchSection />
      <FeaturedDogs />
      <StorySection />
      <HowItWorks />
      <WhySection />
      <CtaSection />
      <Footer />
    </main>
  );
}
