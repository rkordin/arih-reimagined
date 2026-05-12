# Page Topology — locomotive.ca/en

## Layout primitives
- Page: lenis smooth scroll, vertical orientation, document height ~6598px desktop
- HTML data-attrs: `data-template="home"`, `data-theme="default"`, `data-scroll-orientation="vertical"`
- HTML classes (state): `lenis`, `is-loaded`, `is-ready`, `is-over-home-hero` (only while above hero fold)
- Header is `position: fixed`, full width, 4rem (60-64px) tall, z-index 800
- Body has no overflow control; html drives scrolling via Lenis
- Inner content lives in `.o-container` with `padding: 0 var(--grid-margin)` (40px desktop / 20px mobile)

## Color & token system
| Var | Value |
|---|---|
| `--color` | `#000000` |
| `--color-bg` | `#FFFFFF` |
| `--menu-color` | `#FFFFFF` |
| `--menu-color-bg` | `#312DFB` (blue accent) |
| `--border` | `solid 2px` |
| `--border-size` | `2px` |
| `--font-size` | `15px` body |
| `--font-size-medium` | `1.7333rem` desktop = 26px / `1.6rem` ≤1024 = 24px / `18px` ≤500 |
| `--font-size-h1` | `4.6667rem` (70px) / `3.333rem` (50px) / `2.4rem` (36px) |
| `--font-size-huge` | `7.6389vw` (~110px@1440, ~58px@768, ~40px@500) |
| `--grid-columns` | `12` |
| `--grid-margin` | `2.667rem` (~40px) |
| `--grid-gutter` | `20px` |
| `--header-height` | `4rem` |

## Fonts
- Body: **HelveticaNowDisplay** (regular 400) — fallback Apple system fonts
- Display: **PPLocomotiveNew-Light** alias `LocomotiveNew` (light 400) — used on huge titles + h1

## Top-to-bottom topology

1. **Header (fixed)** — `<header data-module-header="m4">` containing `.c-header`
   - 12-col CSS grid, height 4rem
   - Logo `.c-header_logo` cols 1-3 (`Locomotive®`, "Locomotive" gets hover-shuffle)
   - Nav `.c-header_menu` cols 7-11: Work / Agency / Careers / Store (external)
   - CTA `.c-header_cta` cols 11-13: "Let's talk", right-aligned
   - Mobile menu toggler (hamburger label "Menu") visible <1024 (replaces nav+cta)
   - Adjacent fixed div `.c-header_bg` (z-index 740) — white background bar that fades in once scrolled past hero
   - **`.c-header` uses `mix-blend-mode: difference`** — so the white-foreground inverts to black over white sections automatically

2. **Hero `.c-home-hero`** (900px tall)
   - `.c-home-hero_content` — h1 "🔶 Locomotive® \n Digital-first Design Agency🍺🔞" (70px LocomotiveNew, white), bottom-aligned (y≈716)
   - `.c-home-hero_background` — `position: fixed`, z-index -1, contains a `<video>` autoplaying loop (Vimeo, poster `uploads/home/poster_desktop.png`)
   - `--progress: 0..1` CSS var driven by scroll (data-scroll-css-progress)

3. **Summary `.c-home-summary`** (~957px)
   - Centered text block. Year label `©2008-2026` absolutely positioned top-right
   - Stacked centered text: "Seven Years / Running / 2018-2024" (26px medium, three spans stacked with line breaks visually)
   - **Three.js canvas (`data-module-ring`)** — rendering a 3D ring/torus that rotates with scroll (`--progress`)
   - Bottom button: "The dynasty →" with `data-hover-shuffle="children"` (links to six.locomotive.ca)

4. **`<h2>Featured work`** (26px medium label)

5. **Featured links `.c-featured-links`** (~914px) — list of 6 huge centered titles
   - Each `.c-featured-links_item`: 110px line-height (110px font-size LocomotiveNew), centered, padding 1.333rem 0, border-top, last has border-bottom
   - Hover behavior: title splits into two spans, an image grows from width 0 → 1.5em (165px) between them with `transition: width 0.45s cubic-bezier(0.23, 1, 0.32, 1)`
   - Items: Theory|Verse → /work/theory-verse, Scout|Motors, Populous (single word), Mate|Libre, Destigmatize, "* All Work" (cta variant with `::before/::after` hole emoji animation)
   - "Read more about this project" link is absolutely positioned 100% overlay (screen-reader text + click target)

6. **About `.c-home-about`** (~1054px)
   - Big paragraph header `.c-home-about_title` (70px LocomotiveNew): "🔰Design and code are only tools of expression. What sets us and our work apart is people. We're a small group of creative thinkers who craft bespoke digital-first brand identities and experiences, tailor-made for you and your audience.🔛🔜"
   - 12-col grid below
     - Left col (3-7): **Three.js canvas (`data-module-team-canvas`)** rendering team avatars (3D GLB models). Caption underneath: "Always looking / for top shelf talent" (26px medium)
     - Right col (7-13): Paragraph "From strategy to deployment..." (26px medium), then 2 buttons "Agency →" and "Careers →"

7. **Extras `.c-home-extras`** (~1731px)
   - Title "Extras (13)" — h2 in `.c-heading.-h1` size (70px LocomotiveNew)
   - Three `.c-section-overline` blocks (small label + list to the right via grid):
     - **Articles** — 6 list items (links → medium.com posts)
     - **Culture** — 6 list items (links → explore.locomotive.ca yearly trips)
     - **Store** — "Check out our gear" link + two product cards (T-Shirt $30, Hat $25)
   - Each list link: 26px medium, has `data-icon="↗"` after-content arrow
   - List rows have border-top, last has no border (`-no-border-last-child`)

8. **Footer `.c-footer`** (~663px)
   - Top nav block: Menu list (Work/Agency/Careers/Let's talk/Privacy/Français + Cookie pref + Newsletter buttons)
   - Social list (Instagram, Twitter, LinkedIn, Behance, GitHub)
   - External list (Store, Locomotive Scroll, Annual trips, Dynasty)
   - Contact block: Address (1211 Jean-Talon Est, Montréal QC, Canada, H2R 1W1) → Google Maps, tel: +1 514 524 5678, mailto: info@locomotive.ca
   - Footer year "©2026"

## Hover/interaction model summary
- **Almost all links have `data-hover-shuffle`** — character shuffle animation on hover (text scrambles then resolves). Built-in to Locomotive's JS lib.
- **Featured links hover** — width-transition image reveal between split title spans (see #5 above)
- **Header `mix-blend-mode: difference`** + `.c-header_bg` opacity transition handle theme switching automatically
- **All Work item** — animated 🕳 hole-emoji bullets on each side (CSS animation `featuredProjectsAllFlash`)

## Responsive breakpoints (from CSS vars + measurements)
- **Desktop ≥1024**: 12-col grid; padding 40px; h1=70px, medium=26px, huge=110px-ish (7.638vw)
- **Tablet ~768**: 8-col grid; padding 20px; nav hides → hamburger; h1=50px, medium=24px
- **Mobile ≤500**: stack everything; h1=36px, medium=18px, huge=40px

## Build approach
Given time/scope, replace Three.js canvases with static SVG/CSS approximations (or keep static images of those moments). Vimeo background video — use poster image with subtle scale animation as static fallback. Lenis smooth scroll — install `@studio-freight/lenis`.
