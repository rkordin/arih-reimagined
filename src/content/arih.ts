/**
 * ARIH content map.
 * Source: scrape-arih/_extracted/all-content.json (Agencija Arih, arih.si)
 * Studio quote: "Think big. Stay small." — Igor Arih
 */

export const brand = {
  name: "Arih",
  logoMark: "ⓐ",
  motto: "Think big. Stay small.",
  motto_si: "Misli veliko. Ostani majhen.",
  founder: "Igor Arih",
  yearFounded: 1996,
  city: "Ljubljana",
  country: "Slovenia",
  bigStat: { years: 30, projects: 94, awards: 47, clients: 60 },
};

export type FeaturedArihProject = {
  no: number;
  title: string;
  parts: [string, string?];
  href: string;
  blurb?: string;
  category: "CGP" | "Embalaža" | "Akcija" | "Knjiga" | "Atelje";
  image: { src: string; alt: string; width: number; height: number };
};

export const featuredProjects: FeaturedArihProject[] = [
  {
    no: 1,
    title: "Fructal Modra",
    parts: ["Fructal", "Modra"],
    href: "/embalaza/fructal-modra-steklenicka",
    blurb: "Premium reusable bottle line — modular packaging system",
    category: "Embalaža",
    image: { src: "/arih/fructal.jpg", alt: "Fructal Modra steklenička", width: 600, height: 380 },
  },
  {
    no: 2,
    title: "T-2 Optimum",
    parts: ["T-2", "Optimum"],
    href: "/akcije/t-2-vsak-ima-svoj-optimum",
    blurb: "National operator brand — every customer has their own optimum",
    category: "Akcija",
    image: { src: "/arih/t2.jpg", alt: "T-2 Optimum campaign", width: 600, height: 380 },
  },
  {
    no: 3,
    title: "Slovenska Filharmonija",
    parts: ["Slovenska", "Filharmonija"],
    href: "/cgp/slovenska-filharmonija",
    blurb: "Visual identity rooted in 1701 founding heritage",
    category: "CGP",
    image: { src: "/arih/filharmonija.jpg", alt: "Slovenska Filharmonija identity", width: 600, height: 380 },
  },
  {
    no: 4,
    title: "Hood Burger",
    parts: ["Hood", "Burger"],
    href: "/cgp/hood-burger",
    blurb: "Ljubljana's neighbourhood burger joint — full identity system",
    category: "CGP",
    image: { src: "/arih/hood.jpg", alt: "Hood Burger identity", width: 600, height: 380 },
  },
  {
    no: 5,
    title: "Pipistrel",
    parts: ["Pipistrel"],
    href: "/cgp/pipistrel-vertical-solutions",
    blurb: "Slovenian aviation pioneer — Vertical Solutions launch identity",
    category: "CGP",
    image: { src: "/arih/pipistrel.jpg", alt: "Pipistrel Vertical Solutions", width: 600, height: 380 },
  },
  {
    no: 6,
    title: "Kavarna Zvezda",
    parts: ["Kavarna", "Zvezda"],
    href: "/cgp/kavarna-zvezda",
    blurb: "Iconic Ljubljana confectionary café — packaging + identity",
    category: "Embalaža",
    image: { src: "/arih/zvezda.jpg", alt: "Kavarna Zvezda", width: 600, height: 380 },
  },
];

/* Selected campaign + book + community work as supporting sections */
export const campaigns = [
  { no: 7, label: "Delo. Misli širši.", href: "/akcije/delo-misli-iri", year: 2021 },
  { no: 8, label: "T-2 TV - Ustvarjena zate", href: "/akcije/t-2-tv-ustvarjena-zate", year: 2020 },
  { no: 9, label: "Toyota popusti, serija TV oglasov", href: "/akcije/toyota-popusti-serija-tv-oglasov", year: 2021 },
  { no: 10, label: "Pivovarna Union — Na luni", href: "/akcije/pivovaarna-union-tv-oglas-na-luni", year: 2021 },
  { no: 11, label: "MOL December v Ljubljani", href: "/akcije/mol-december-v-ljubljani", year: 2021 },
  { no: 12, label: "Smart Open Your Mind", href: "/akcije/smart-open-your-mind", year: 2021 },
];

export const publications = [
  { no: 13, label: "NLB letno poročilo 2002", href: "/publikacije/nova-ljubljanska-banka-letno-poroilo-2002" },
  { no: 14, label: "NLB letno poročilo 2003", href: "/publikacije/nova-ljubljanska-banka-letno-poroilo-2003" },
  { no: 15, label: "NLB letno poročilo 2004", href: "/publikacije/nova-ljubljanska-banka-letno-poroilo-2004" },
  { no: 16, label: "Hit letno poročilo 2003", href: "/publikacije/hit-letno-poroilo-2003" },
  { no: 17, label: "Hit letno poročilo 2004", href: "/publikacije/hit-letno-poroilo-2004" },
  { no: 18, label: "Adriatic Slovenica letno poročilo 2006", href: "/publikacije/adriatic-slovenica-letno-poroilo-2006" },
  { no: 19, label: "Lek letno poročilo 2007", href: "/publikacije/lek-letno-poroilo-2007" },
  { no: 20, label: "Trimo letno poročilo 2007", href: "/publikacije/trimo-letno-poroilo-2007" },
  { no: 21, label: "Knjiga Kalemegdan Park", href: "/publikacije/knjiga-kalemegdan-park" },
];

export const social = [
  { label: "Instagram", href: "https://www.instagram.com/agencija_arih/" },
  { label: "Behance", href: "https://www.behance.net/arihagency" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/arih" },
];

export const navLinks = [
  { label: "CGP", href: "/cgp", desc: "Celostne grafične podobe" },
  { label: "Embalaža", href: "/embalaza", desc: "Packaging" },
  { label: "Akcije", href: "/akcije", desc: "Campaigns" },
  { label: "Publikacije", href: "/publikacije", desc: "Publications" },
  { label: "Priznanja", href: "/priznanja", desc: "Awards" },
  { label: "Družbeno", href: "/druzbeno", desc: "Social" },
  { label: "Atelje", href: "/atelje", desc: "Studio playground" },
  { label: "Knjiga", href: "/knjiga", desc: "Budi Voda — the book" },
];

/* Book data — for /knjiga page */
export const book = {
  titlePrimary: "Budi Voda",
  titleSubtitle: "dopolnjena izdaja knjige „Iz mojih čevljev“",
  author: "Igor Arih",
  authorYear: 1964,
  authorPlace: "Vodnjan",
  pages: 230,
  isbn: "978-961-XXXXX-X-X",
  format: "150 × 230 mm, mehka vezava",
  language: "Slovenski / Srbski",
  year: 2026,
  publisher: "Agencija Arih",
  images: [
    {
      url: "https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1553853750939-8FO148CW3I5I7VA58QAS/knjiga1440X800.jpg",
      alt: "Knjiga Budi Voda — naslovnica",
    },
    {
      url: "https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1535890103889-0TGVNLLUHPNUQWNI1TI4/arih-knjiga2.jpg",
      alt: "Knjiga Budi Voda — odprte strani",
    },
    {
      url: "https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1535888474254-PM2Y71LO6QG3ZFW5G00H/igor-arih.jpg",
      alt: "Igor Arih — portret",
    },
  ],
  variants: [
    { id: "softcover-sl",  label: "Mehka vezava — slovenski",  price: 28.0, stock: "na zalogi" },
    { id: "hardcover-sl",  label: "Trda vezava — slovenski",   price: 38.0, stock: "na zalogi" },
    { id: "softcover-srb", label: "Mehka vezava — srbski",     price: 28.0, stock: "na zalogi" },
    { id: "bundle",        label: "Komplet (slo + srb)",       price: 48.0, stock: "omejeno" },
  ],
  shipping: [
    { id: "si", label: "Slovenija",      price: 4.5,  eta: "2–3 delovne dni" },
    { id: "eu", label: "Evropska unija", price: 12.0, eta: "5–7 delovnih dni" },
    { id: "ww", label: "Ostali svet",    price: 22.0, eta: "10–14 delovnih dni" },
  ],
};

/* Marquee items — small newsticker at the top/bottom of the page */
export const announcements = [
  "Knjiga „Budi Voda“ je na voljo",
  "Razstava izbranih del agencije",
  "Predavanja in delavnice na naslovu Celovška cesta 32",
  "Sodelujemo z naročniki, ki delajo dolgoročno",
  "Iščemo nove sodelavce — pišite na info@arih.si",
];

export const contact = {
  street: "Celovška cesta 32",
  city: "1000 Ljubljana",
  country: "Slovenia",
  phone: "01 434 17 24",
  phoneE164: "+38614341724",
  email: "info@arih.si",
  hours: "Pon–Pet 8.30–16.00",
};

/* Long-form copy — translated/adapted from arih.si */
export const heroCopy = {
  title_en: "Think big. Stay small.",
  title_si: "Misli veliko. Ostani majhen.",
  subtitle_en: "Branding and design studio — Ljubljana, since 1996.",
};

export const aboutCopy = {
  big_en:
    "We design brands that outlast the trends that birthed them. Identity, packaging, campaigns and books — built with the same patience a craftsperson uses on a single object. Thirty years, one small studio, deeply Slovenian and quietly global.",
  small_en:
    "From visual identity systems for cultural institutions to packaging that wins on the shelf, Studio Arih has shaped Slovenia's everyday graphic landscape since 1996. We work direct with founders and directors — no account layer, no telephone game.",
  caption_en_a: "Founder & Creative Director",
  caption_en_b: "Igor Arih",
};
