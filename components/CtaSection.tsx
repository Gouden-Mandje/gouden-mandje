import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";

export default function CtaSection() {
  return (
    <section id="stichtingen" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-beige px-8 py-20 text-center sm:px-16 sm:py-28">
          {/* Zachte gouden gloed */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl" />

          <h2 className="relative text-3xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl [font-family:var(--font-display)]">
            Iedere hond verdient een kans.
            <br />
            <span className="text-taupe">Help mee een gouden mandje te vinden.</span>
          </h2>
          <a
            href="#honden"
            className="group relative mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-10 py-5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016] hover:shadow-2xl"
          >
            Bekijk alle honden
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
