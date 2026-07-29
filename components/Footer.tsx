import { BasketMark } from "./Icons";

const SOCIALS = [
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
        <path
          d="M14.5 8.5H17V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H8.5v3.5H11V21h3.5v-6.5H17l.5-3.5h-3v-2a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
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
            {[
              ["Over ons", "#"],
              ["Voor stichtingen", "#stichtingen"],
              ["Contact", "#"],
              ["Privacy", "#"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="transition-colors hover:text-ink">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-sand text-taupe transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-sand pt-8 text-sm text-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gouden Mandje. Alle rechten voorbehouden.</p>
          <p>Iedere hond verdient een gouden mandje.</p>
        </div>
      </div>
    </footer>
  );
}
