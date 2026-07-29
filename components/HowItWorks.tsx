import { STEPS } from "@/lib/data";
import Reveal from "./Reveal";

const ICONS = [
  <svg key="zoek" viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden="true">
    <circle cx="12.5" cy="12.5" r="7.5" stroke="currentColor" strokeWidth="2" />
    <path d="m18.5 18.5 4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  <svg key="lees" viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden="true">
    <path
      d="M14 6.5C11.5 4.5 7 4 4.5 5.5v16C7 20 11.5 20.5 14 22.5c2.5-2 7-2.5 9.5-1v-16C21 4 16.5 4.5 14 6.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M14 6.5v16" stroke="currentColor" strokeWidth="2" />
  </svg>,
  <svg key="adopteer" viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden="true">
    <path
      d="M14 23s-9-5.5-9-12A5.5 5.5 0 0 1 14 8a5.5 5.5 0 0 1 9 3c0 6.5-9 12-9 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>,
];

export default function HowItWorks() {
  return (
    <section id="hoe" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Hoe het werkt
          </p>
          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl [font-family:var(--font-display)]">
            In drie stappen naar een gouden mandje
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 120}>
              <div className="group h-full rounded-[2rem] border border-sand bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-20px_rgba(61,46,34,0.18)] sm:p-10">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-beige text-gold transition-colors duration-500 group-hover:bg-ink">
                  {ICONS[i]}
                </div>
                <p className="mb-2 text-sm font-semibold text-gold">Stap {i + 1}</p>
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
          <p className="mx-auto mt-12 max-w-2xl rounded-3xl bg-beige px-8 py-6 text-center text-[15px] leading-relaxed text-[#6B5847]">
            <strong className="font-semibold text-ink">Goed om te weten:</strong>{" "}
            Gouden Mandje is geen asiel. Adopteren gebeurt altijd rechtstreeks
            via de stichting die de hond heeft gered.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
