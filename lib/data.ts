export type Dog = {
  name: string;
  age: string;
  country: string;
  flag: string;
  character: string;
  waiting: string;
  image: string;
};

export const DOGS: Dog[] = [
  {
    name: "Luna",
    age: "2 jaar",
    country: "Griekenland",
    flag: "🇬🇷",
    character: "Zachtaardig, aanhankelijk en dol op wandelen",
    waiting: "Wacht al 8 maanden",
    image:
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Rocco",
    age: "4 jaar",
    country: "Spanje",
    flag: "🇪🇸",
    character: "Rustige kracht, geduldig en kindvriendelijk",
    waiting: "Wacht al 1,5 jaar",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mira",
    age: "1 jaar",
    country: "Roemenië",
    flag: "🇷🇴",
    character: "Speels, slim en leert razendsnel",
    waiting: "Wacht al 5 maanden",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Toby",
    age: "6 jaar",
    country: "Curaçao",
    flag: "🇨🇼",
    character: "Loyale knuffelaar die rust zoekt",
    waiting: "Wacht al 2 jaar",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
  },
];

export const FILTERS = [
  {
    label: "Land",
    options: ["Alle landen", "Griekenland", "Spanje", "Roemenië", "Portugal", "Curaçao"],
  },
  {
    label: "Leeftijd",
    options: ["Alle leeftijden", "Puppy", "1 tot 3 jaar", "3 tot 7 jaar", "Senior"],
  },
  { label: "Grootte", options: ["Alle groottes", "Klein", "Middel", "Groot"] },
  { label: "Geslacht", options: ["Alle", "Reu", "Teef"] },
  { label: "Kan met kinderen", options: ["Maakt niet uit", "Ja", "Nee"] },
  { label: "Kan met katten", options: ["Maakt niet uit", "Ja", "Nee"] },
];

export const STEPS = [
  {
    title: "Vind jouw hond",
    text: "Zoek en filter door honden van tientallen Nederlandse stichtingen. Alles overzichtelijk op een plek.",
  },
  {
    title: "Lees het verhaal",
    text: "Iedere hond heeft een eerlijk profiel: karakter, achtergrond en wat hij of zij nodig heeft in een thuis.",
  },
  {
    title: "Adopteer via de stichting",
    text: "Klik door naar de stichting en doorloop daar de adoptie. Wij verbinden, zij begeleiden van kennismaking tot mandje.",
  },
];

export const WHY_POINTS = [
  {
    title: "Alles op een plek",
    text: "Geen tientallen websites meer afstruinen. Alle honden van aangesloten stichtingen vind je hier, in een overzicht.",
  },
  {
    title: "Alleen betrouwbare stichtingen",
    text: "Wij werken uitsluitend met geregistreerde Nederlandse stichtingen met een zorgvuldige adoptieprocedure.",
  },
  {
    title: "Eerlijke profielen",
    text: "Geen mooipraterij. Ieder profiel vertelt wat een hond echt nodig heeft, zodat de match klopt.",
  },
  {
    title: "Gratis voor iedereen",
    text: "Voor adoptanten en stichtingen. Ons doel is simpel: meer honden in een gouden mandje.",
  },
];
