import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Contact | Gouden Mandje",
  description:
    "Vragen over een hond, over aansluiten als stichting, of iets anders? Stuur een mail naar info@gouden-mandje.nl.",
};

const ONDERWERPEN = [
  {
    titel: "Ik wil een hond adopteren",
    tekst:
      "Neem contact op met de stichting zelf. Op de pagina van de hond staat een knop die je daarheen brengt. Wij regelen geen adopties en kunnen geen honden reserveren.",
  },
  {
    titel: "Ik ben een stichting en wil meedoen",
    tekst:
      "Stuur een mail met de naam van je stichting en de link naar je hondenpagina. Je hoeft verder niets voor te bereiden.",
  },
  {
    titel: "Er klopt iets niet bij een hond",
    tekst:
      "Laat het weten met de link naar de pagina. Onze gegevens komen rechtstreeks van de stichting en worden meerdere keren per dag ververst, dus meestal is het binnen een dag rechtgezet.",
  },
  {
    titel: "Ik wil dat mijn honden hier niet staan",
    tekst:
      "Eén mail is genoeg. Wij halen ze weg zonder dat je hoeft uit te leggen waarom.",
  },
];

export default function Contact() {
  return (
    <main>
      <Nav />

      <article className="px-4 pb-24 pt-32 sm:px-6 sm:pb-32 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Contact
          </p>
          <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-6xl [font-family:var(--font-display)]">
            Even contact opnemen
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-taupe">
            Alles loopt via de mail. We reageren meestal binnen een paar dagen.
          </p>

          <a
            href="mailto:info@gouden-mandje.nl"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016]"
          >
            info@gouden-mandje.nl
          </a>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {ONDERWERPEN.map((onderwerp) => (
              <div
                key={onderwerp.titel}
                className="rounded-[1.75rem] border border-sand bg-white p-7"
              >
                <h2 className="text-lg font-semibold tracking-tight text-ink">
                  {onderwerp.titel}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-[#6B5847]">
                  {onderwerp.tekst}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-[15px] leading-relaxed text-taupe">
            Meer weten over hoe wij met gegevens omgaan? Dat staat op de{" "}
            <Link href="/privacy/" className="underline decoration-sand underline-offset-4 hover:text-ink">
              privacypagina
            </Link>
            .
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
