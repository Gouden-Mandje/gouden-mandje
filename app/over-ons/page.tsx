import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { getAantallen } from "@/lib/honden";

export const metadata: Metadata = {
  title: "Over ons | Gouden Mandje",
  description:
    "Waarom Gouden Mandje bestaat: alle rescuehonden van Nederlandse stichtingen op één plek, zodat mensen ze kunnen vinden.",
};

export default async function OverOns() {
  const aantallen = await getAantallen();

  return (
    <main>
      <Nav />

      <article className="px-4 pb-24 pt-32 sm:px-6 sm:pb-32 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Over ons
          </p>
          <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-6xl [font-family:var(--font-display)]">
            Waarom Gouden Mandje bestaat
          </h1>

          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-[#6B5847]">
            <p>
              Wie in Nederland een rescuehond wil adopteren, begint met zoeken en
              eindigt met dertig tabbladen. Elke stichting heeft een eigen website,
              een eigen indeling en een eigen ritme van bijwerken. Sommige honden
              staan op drie plekken, andere nergens meer terwijl ze nog wachten.
            </p>
            <p>
              Dat is geen verwijt aan de stichtingen. Zij redden honden, regelen
              vervoer, doen thuiscontroles en draaien op vrijwilligers. Een website
              onderhouden komt daar nog eens bovenop.
            </p>
            <p>
              Gouden Mandje lost dat op aan de andere kant. Wij lezen de honden van
              hun website en zetten ze bij elkaar op één plek. De stichtingen hoeven
              niets in te vullen en niets bij te houden. Wie een hond vindt, klikt
              door naar de stichting en adopteert daar.
            </p>
          </div>

          <h2 className="mt-14 text-2xl font-medium tracking-tight [font-family:var(--font-display)] sm:text-3xl">
            Wie hierachter zit
          </h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[#6B5847]">
            <p>
              Mijn naam is Pim. Samen met mijn vriendin heb ik een rescuehond uit
              Griekenland, Louis. Hij is als pup in zijn eentje rondzwervend gevonden
              op een industrieterrein.
            </p>
            <p>
              Tijdens die zoektocht liepen we zelf tegen die dertig tabbladen aan. Ik
              werk veel met computers en automatisering, dus wat voor een ander een
              vervelend probleem is, was voor mij vooral een op te lossen probleem.
            </p>
            <p>
              Daarnaast runnen we een webshop in dierenartikelen waarvan een deel van
              de winst naar rescue-organisaties in het buitenland gaat. Gouden Mandje
              komt daaruit voort, maar staat er los van.
            </p>
          </div>

          <h2 className="mt-14 text-2xl font-medium tracking-tight [font-family:var(--font-display)] sm:text-3xl">
            Wat wij wel en niet zijn
          </h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[#6B5847]">
            <p>
              Wij zijn geen asiel en geen bemiddelaar. Wij houden geen honden en doen
              geen adoptiegesprekken. Gouden Mandje is gratis voor stichtingen en voor
              bezoekers. Wij vragen stichtingen nooit om te betalen voor een plek op de
              site en er is geen enkele manier waarop een stichting hier hoger of
              prominenter komt te staan door ons iets te geven. Wij zijn een
              vindplaats, meer niet.
            </p>
            <p>
              Alles wat je hier over een hond leest, komt van de stichting zelf. Wij
              verzinnen geen verhalen en maken niets mooier dan het is. Staat er
              weinig informatie bij een hond, dan is dat wat de stichting erover
              heeft geschreven.
            </p>
          </div>

          <h2 className="mt-14 text-2xl font-medium tracking-tight [font-family:var(--font-display)] sm:text-3xl">
            Waar we nu staan
          </h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[#6B5847]">
            <p>
              Gouden Mandje is net begonnen. Op dit moment staan er{" "}
              {aantallen.honden} honden op de site van{" "}
              {aantallen.organisaties === 1
                ? "één stichting"
                : `${aantallen.organisaties} stichtingen`}
              .
            </p>
            <p>
              Elke stichting die hier staat, is door ons benaderd met de vraag of dit
              wat hen betreft in orde is. Wil een stichting er niet op, dan halen wij
              die er dezelfde dag af, zonder dat daar een reden bij hoeft.
            </p>
            <p>
              Ken je een stichting die hier hoort te staan, of ben je er zelf een?
              Laat het weten.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/voor-stichtingen/"
              className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016]"
            >
              Voor stichtingen
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-full border border-ink px-8 py-4 text-base font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
