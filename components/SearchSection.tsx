import { FILTERS } from "@/lib/data";
import Reveal from "./Reveal";

export default function SearchSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8">
      <Reveal className="mx-auto -mt-14 max-w-6xl sm:-mt-16">
        <div className="rounded-[2rem] border border-sand bg-white p-6 shadow-[0_24px_60px_-20px_rgba(61,46,34,0.18)] sm:p-8">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-medium tracking-tight [font-family:var(--font-display)] sm:text-2xl">
                Vind jouw match
              </h2>
              <p className="mt-1 text-[15px] text-taupe">
                Honderden honden van tientallen stichtingen, op een plek.
              </p>
            </div>
            <p className="hidden text-sm text-taupe sm:block">
              328 honden beschikbaar
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {FILTERS.map((filter) => (
              <label key={filter.label} className="group relative block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-taupe">
                  {filter.label}
                </span>
                <div className="relative">
                  <select
                    className="w-full cursor-pointer appearance-none rounded-2xl border border-sand bg-cream px-4 py-3.5 pr-9 text-[15px] font-medium text-ink outline-none transition-all duration-300 hover:border-gold focus:border-gold focus:ring-4 focus:ring-gold/15"
                    aria-label={filter.label}
                  >
                    {filter.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m6 8 4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button className="text-left text-sm font-medium text-taupe underline decoration-sand underline-offset-4 transition-colors hover:text-ink">
              Filters wissen
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-clay/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C97E3F] hover:shadow-xl hover:shadow-clay/30">
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
