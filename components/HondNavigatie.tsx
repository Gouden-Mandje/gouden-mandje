"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { burenVan } from "@/lib/selectie";

/**
 * Bladeren door de honden die na het filteren overbleven.
 *
 * Verschijnt alleen wanneer de bezoeker vanaf het overzicht is doorgeklikt.
 * Komt iemand binnen via een gedeelde link of via Google, dan is er geen
 * selectie en tonen we niets extra's; dan is de knop terug naar alle honden
 * genoeg.
 *
 * De selectie staat in sessionStorage en niet op de server, want deze pagina's
 * zijn statisch gebouwd. Zie lib/selectie.ts voor de toelichting.
 */
export default function HondNavigatie({ id }: { id: string }) {
  const [buren, setBuren] = useState<ReturnType<typeof burenVan>>(null);

  // Pas in de browser lezen: sessionStorage bestaat niet tijdens het bouwen.
  useEffect(() => {
    setBuren(burenVan(id));
  }, [id]);

  if (!buren) return null;

  const { vorige, volgende, positie, totaal, filters } = buren;
  const overzicht = `/honden/${filters ? `?${filters}` : ""}`;

  return (
    <nav
      aria-label="Bladeren door je selectie"
      className="mt-12 border-t border-sand pt-6"
    >
      <p className="mb-4 text-center text-[13px] text-taupe">
        Hond {positie} van {totaal} in je selectie
      </p>

      <div className="flex items-stretch gap-3">
        {vorige ? (
          <Link
            href={`/honden/${vorige.id}/`}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-sand bg-white px-4 py-3 text-left transition-colors hover:border-ink"
          >
            <span aria-hidden="true" className="text-taupe">←</span>
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-wide text-taupe">
                Vorige
              </span>
              <span className="block truncate text-[15px] font-medium text-ink">
                {vorige.naam}
              </span>
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}

        {volgende ? (
          <Link
            href={`/honden/${volgende.id}/`}
            className="flex min-w-0 flex-1 items-center justify-end gap-2 rounded-2xl border border-sand bg-white px-4 py-3 text-right transition-colors hover:border-ink"
          >
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-wide text-taupe">
                Volgende
              </span>
              <span className="block truncate text-[15px] font-medium text-ink">
                {volgende.naam}
              </span>
            </span>
            <span aria-hidden="true" className="text-taupe">→</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </div>

      <Link
        href={overzicht}
        className="mt-3 block rounded-2xl bg-cream px-4 py-3 text-center text-[15px] font-medium text-ink transition-colors hover:bg-beige"
      >
        Terug naar je {totaal} honden
      </Link>
    </nav>
  );
}
