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
 *
 * Twee uitvoeringen in één component:
 *
 *   Telefoon   foto, naam, leeftijd, land en twee regels van het verhaal. In
 *              een kolom van zo'n 160 pixels past niet meer: twee labels op de
 *              foto gingen over elkaar heen en de knop brak in tweeën. Het hele
 *              kaartje is klikbaar, dus een knop is hier overbodig.
 *
 *   Vanaf sm   het volledige kaartje met omschrijving, stichting en knop.
 *
 * Het hele kaartje is een link. Daarom staat er binnenin geen tweede link:
 * een link in een link is niet toegestaan en geeft onvoorspelbaar gedrag.
 */

/**
 * Leeftijd inkorten voor het kaartje.
 *
 * "5 jaar en 11 maanden" liep op de telefoon over twee regels en maakte de
 * kaartjes ongelijk hoog. Bij het bladeren gaat het om de orde van grootte;
 * de precieze leeftijd staat op de hondpagina zelf.
 */
function korteLeeftijd(leeftijd: string): string {
  if (!leeftijd) return "";
  return leeftijd.split(" en ")[0].trim();
}

export default function HondCard({
  dog,
  bekeken = false,
  onOpen,
}: {
  dog: Hond;
  /** Al eens geopend. Bij duizend honden weet je anders niet meer waar je was. */
  bekeken?: boolean;
  onOpen?: () => void;
}) {
  const gereserveerd = dog.status === "gereserveerd";

  return (
    <Link
      href={`/honden/${dog.id}/`}
      onClick={onOpen}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-20px_rgba(61,46,34,0.22)] sm:rounded-[1.75rem] ${
        bekeken ? "border-gold/60" : "border-sand"
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-beige sm:aspect-[4/5]">
        {dog.image ? (
          <img
            src={dog.image}
            alt={`${dog.name}, rescuehond uit ${dog.origin || dog.country}`}
            className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] ${
              bekeken ? "opacity-80" : ""
            }`}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-sand sm:text-5xl">
            🐾
          </div>
        )}

        {/* Het land staat op de telefoon onder de foto, als tekst. Twee labels
            naast elkaar op een smalle foto dekken elkaar af. */}
        <span className="absolute left-4 top-4 hidden rounded-full bg-white/90 px-3.5 py-1.5 text-[13px] font-semibold text-ink backdrop-blur-md sm:inline">
          {dog.country}
        </span>

        {/* "Beschikbaar" is de normale toestand en zegt dus weinig. Op de
            telefoon tonen we alleen de uitzondering, want daar telt elke
            vierkante centimeter. */}
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md sm:right-4 sm:top-4 sm:px-3.5 sm:py-1.5 sm:text-[13px] ${
            gereserveerd
              ? "bg-clay/90 text-white"
              : "hidden bg-ink/80 text-[#EFDFC8] sm:inline"
          }`}
        >
          {dog.statusLabel}
        </span>

        {/* Een klein vinkje bij honden die je al open hebt gehad. */}
        {bekeken && (
          <span
            title="Je hebt deze hond al bekeken"
            className="absolute bottom-2.5 left-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[12px] text-ink backdrop-blur-md sm:bottom-4 sm:left-4 sm:h-7 sm:w-7 sm:text-[13px]"
          >
            <span aria-hidden="true">✓</span>
            <span className="sr-only">Al bekeken</span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-6">
        <h3 className="text-[17px] font-medium leading-tight tracking-tight [font-family:var(--font-display)] sm:text-2xl">
          {dog.name}
        </h3>

        {/* Op de telefoon leeftijd en land op één regel onder de naam. Vanaf
            tablet staat het land op de foto en de leeftijd hieronder. */}
        <p className="mt-1 text-[12.5px] leading-snug text-taupe sm:hidden">
          {[korteLeeftijd(dog.age), dog.country].filter(Boolean).join(" · ")}
        </p>
        <span className="hidden text-sm font-medium text-taupe sm:mt-1 sm:block">
          {dog.age}
        </span>

        {/* Twee regels van het verhaal. Genoeg om een indruk te krijgen,
            kort genoeg dat de kaartjes even hoog blijven. */}
        <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-[#6B5847] sm:hidden">
          {dog.character}
        </p>

        <p className="mt-2 hidden min-h-[3rem] flex-1 text-[15px] leading-relaxed text-[#6B5847] sm:block">
          {dog.character}
        </p>
        <p className="mt-4 hidden truncate text-[13px] text-taupe sm:block">
          via {dog.organisation}
        </p>
        <span className="mt-3 hidden w-full items-center justify-center gap-2 rounded-full border border-ink px-6 py-3 text-[15px] font-semibold text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-white sm:inline-flex">
          Bekijk verhaal
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
