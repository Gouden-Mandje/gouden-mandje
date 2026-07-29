import { DOGS, type Dog } from "@/lib/data";
import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";

function DogCard({ dog, delay }: { dog: Dog; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group overflow-hidden rounded-[1.75rem] border border-sand bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-20px_rgba(61,46,34,0.22)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={dog.image}
            alt={`${dog.name}, rescuehond uit ${dog.country}`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[13px] font-semibold text-ink backdrop-blur-md">
            {dog.flag} {dog.country}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-[13px] font-medium text-[#EFDFC8] backdrop-blur-md">
            {dog.waiting}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-medium tracking-tight [font-family:var(--font-display)]">
              {dog.name}
            </h3>
            <span className="text-sm font-medium text-taupe">{dog.age}</span>
          </div>
          <p className="mt-2 min-h-[3rem] text-[15px] leading-relaxed text-[#6B5847]">
            {dog.character}
          </p>
          <a
            href="#"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink px-6 py-3 text-[15px] font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-white"
          >
            Bekijk verhaal
            <ArrowRight />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function FeaturedDogs() {
  return (
    <section id="honden" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Uitgelicht
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl [font-family:var(--font-display)]">
              Zij wachten op hun mandje
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ink"
          >
            Alle 328 honden
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sand transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
              <ArrowRight />
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
