import Link from "next/link";
import { SLOGAN } from "@/lib/data";
import { BasketMark } from "./Icons";

const LINKS: [string, string][] = [
  ["Over ons", "/over-ons/"],
  ["Voor stichtingen", "/voor-stichtingen/"],
  ["Contact", "/contact/"],
  ["Privacy", "/privacy/"],
];

export default function Footer() {
  return (
    <footer className="border-t border-sand px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink">
                <BasketMark />
              </span>
              <span className="text-lg font-semibold tracking-tight [font-family:var(--font-display)]">
                Gouden Mandje
              </span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-taupe">
              Het platform waar je rescuehonden van Nederlandse stichtingen
              ontdekt. Adoptie gebeurt altijd via de stichting zelf.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-16 gap-y-3 text-[15px] font-medium text-[#6B5847]"
            aria-label="Footer"
          >
            {LINKS.map(([label, href]) => (
              <Link key={label} href={href} className="transition-colors hover:text-ink">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-sand pt-8 text-sm text-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gouden Mandje. Alle rechten voorbehouden.</p>
          <p>{SLOGAN}.</p>
        </div>
      </div>
    </footer>
  );
}
