import Link from "next/link";
import type { Hond } from "@/lib/honden";
import { ArrowRight } from "./Icons";

/**
 * Eén hondenkaartje. Bewust los van de pagina's, zodat het uitgelichte blok op
 * de homepage en het volledige overzicht er altijd hetzelfde uitzien.
 *
 * De naam van de stichting staat er bewust op. Voor de bezoeker is meteen
 * duidelijk dat de hond niet van ons is, en voor de stichting is het de
 * zichtbaarheid die ze ervoor terugkrijgen.
 */
export default function HondCard({ dog }: { dog: Hond }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-sand bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-20px_rgba(61,46,34,0.22)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        {dog.image ? (
          <img
            src={dog.image}
            alt={`${dog.name}, rescuehond uit ${dog.origin || dog.country}`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl text-sand">
            🐾
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[13px] font-semibold text-ink backdrop-blur-md">
          {dog.country}
        </span>
        <span
          className={`absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-[13px] font-medium backdrop-blur-md ${
            dog.status === "gereserveerd"
              ? "bg-clay/90 text-white"
              : "bg-ink/80 text-[#EFDFC8]"
          }`}
        >
          {dog.statusLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-2xl font-medium tracking-tight [font-family:var(--font-display)]">
            {dog.name}
          </h3>
          <span className="shrink-0 text-sm font-medium text-taupe">{dog.age}</span>
        </div>
        <p className="mt-2 min-h-[3rem] flex-1 text-[15px] leading-relaxed text-[#6B5847]">
          {dog.character}
        </p>
        <p className="mt-4 truncate text-[13px] text-taupe">via {dog.organisation}</p>
        <Link
          href={`/honden/${dog.id}/`}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink px-6 py-3 text-[15px] font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-white"
        >
          Bekijk verhaal
          <ArrowRight />
        </Link>
      </div>
    </article>
  );
}
