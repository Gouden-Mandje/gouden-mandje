# Gouden Mandje

Homepage voor het platform waar mensen rescuehonden van Nederlandse stichtingen ontdekken.

## Stack

- Next.js (App Router, statische export)
- React 19
- TypeScript
- Tailwind CSS 3
- Geen externe UI libraries

## Lokaal draaien

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deployen op Cloudflare Pages

Het project gebruikt `output: "export"` (statische export), dus er is geen adapter nodig.

1. Push deze repo naar GitHub.
2. Cloudflare Dashboard: Workers & Pages, Create, Pages, Connect to Git.
3. Instellingen:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Deploy.

## Foto's vervangen

De hondenfoto's zijn Unsplash placeholders. Vervang de URLs in `lib/data.ts`
(hondenkaarten), `components/Hero.tsx` en `components/StorySection.tsx` door
eigen beeld, bij voorkeur lokaal in `public/`.

## Structuur

```
app/            Layout, globale styles, homepage
components/     Alle secties als losse componenten
lib/            Honden- en filterdata
public/         Favicon, robots.txt, eigen beeld
```
