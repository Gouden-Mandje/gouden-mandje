"use client";

import { useEffect, useState } from "react";
import { BasketMark } from "./Icons";

const LINKS: [string, string][] = [
  ["Honden", "#honden"],
  ["Hoe het werkt", "#hoe"],
  ["Waarom wij", "#waarom"],
  ["Voor stichtingen", "#stichtingen"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/90 shadow-[0_1px_0_0_#E7DDCD] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink transition-transform duration-300 group-hover:scale-105">
            <BasketMark />
          </span>
          <span className="text-lg font-semibold tracking-tight [font-family:var(--font-display)]">
            Gouden Mandje
          </span>
        </a>

        <div className="hidden items-center gap-9 text-[15px] font-medium text-[#6B5847] md:flex">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-ink">
              {label}
            </a>
          ))}
          <a
            href="#honden"
            className="rounded-full bg-ink px-6 py-2.5 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C2016] hover:shadow-lg"
          >
            Bekijk honden
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-beige md:hidden"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 rounded bg-ink transition-transform duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded bg-ink transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded bg-ink transition-transform duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobiel menu */}
      <div
        className={`overflow-hidden bg-cream/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? "max-h-96 border-b border-sand" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4 text-[15px] font-medium text-[#6B5847]">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 transition-colors hover:bg-beige hover:text-ink"
            >
              {label}
            </a>
          ))}
          <a
            href="#honden"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-ink px-6 py-3 text-center text-white"
          >
            Bekijk honden
          </a>
        </div>
      </div>
    </header>
  );
}
