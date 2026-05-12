# Behaviors — locomotive.ca/en

## Global

### Lenis smooth scroll
- `<html class="lenis">` confirmed. Use `@studio-freight/lenis` (or `lenis` package) at root layout.
- Lenis adds class `is-scrolling-up` / `is-scrolling-down` to html during scroll.

### State classes on `<html>`
- `is-loaded`, `is-ready` — added after init (we can add immediately on mount)
- `is-over-home-hero` — present while viewport top intersects hero; removed once user scrolls past it
- `is-top` — present while at top of page
- `is-scrolling-up` / `is-scrolling-down` from Lenis

### Hover shuffle
- Elements with `data-hover-shuffle=""` shuffle their text characters on hover (random characters cycle for ~0.3-0.4s then resolve). With `data-hover-shuffle="children"` and `data-hover-shuffle-child=""` on inner spans, only the labeled child shuffles.
- For our clone: approximate with a simple JS function that randomizes letters then settles, OR skip on first pass (still functional).

## Header

### Mix-blend-mode swap
- `.c-header { mix-blend-mode: difference }` — text appears white-on-dark or black-on-light automatically (inverts whatever is underneath)
- `.c-header_bg { position: fixed; opacity: 1; background: #FFF }` — this is the white bar visible at top
- `html.is-over-home-hero .c-header_bg { opacity: 0 }` — over hero (dark video), the white bg fades out → mix-blend over the dark video makes text white
- Transitions on `.c-header_bg`: `background-color 0.3s ease, opacity 0.2s ease`
- **Trigger:** add/remove `is-over-home-hero` class on html. Use IntersectionObserver on `.c-home-hero` — when intersecting top of viewport, add the class.

### Hover underline
- `.c-header a:not(.c-header_logo):hover` adds `text-decoration: underline` with thickness `var(--border-size)` (2px), offset 0.1em

## Hero

### Background video
- Element `.c-home-hero_background { position: fixed; z-index: -1 }`, parent `.c-home-hero { position: relative; height: 100vh (or 900px) }`
- Inside: `<video autoplay muted loop playsinline poster="..." />` with source mp4 (Vimeo URL)
- Scroll-css-progress on `.c-home-hero` sets `--progress: 0..1` (probably used to scale/parallax — but doesn't visually move much on this site)
- **Build approach**: download poster image, use as `<video poster=...>` with downloaded mp4 if accessible, else just poster as `<img>` background.

## Summary section

### Three.js ring
- Canvas 880×1232 (440×616 displayed)
- Probably a torus that rotates with `--progress` scroll var
- **Build approach**: static SVG ring or use CSS conic-gradient/circle and rotate it with `animation` driven by `@scroll-timeline` (or fallback to simple rotation)

## Featured links

### Hover image reveal
- Title is in `.c-featured-links_title` (display: flex, justify-content: center)
- DOM: `<span>Theory</span> <div.c-image>...</div> <span>Verse</span>`
- Image container has `width: 0em` default, `width: 1.5em` on hover (1.5 × line-height-of-110 ≈ 165px)
- Transition: `width var(--transition-speed-enter) cubic-bezier(0.23, 1, 0.32, 1)` (enter: 0.45s, leave: 0.2s)
- The two spans stay anchored to their positions but the image slides between them, pushing them apart
- `overflow: hidden` on the image container prevents image leaking during transition
- `.c-featured-links_item.-inactive { opacity: 0.3 }` — when one item is hovered, sibling items get `-inactive` class (likely via JS) — visual emphasis. Optional; on first pass keep all at opacity 1.

### "All Work" CTA item
- `.c-featured-links_item.-cta` has `::before` and `::after` with `content: "🕳"`, `font-size: 50%`, animation `featuredProjectsAllFlash` 2s linear infinite — flashing/spinning hole emoji on each side of "All Work"

## About section

### Three.js team canvas
- Loads ~28 .glb files (rigged 3D models of team members), cycles through them
- **Build approach**: drop in a static image (group photo or 3D render screenshot), or simple looping image carousel.

## Sections in general

### data-scroll-* attrs
- `data-scroll` / `data-scroll-css-progress` / `data-scroll-module-progress` — these are Locomotive Scroll v5 attributes that update CSS variables based on element visibility
- `data-scroll-call="inview, ..."` — fires JS callbacks on enter/leave inview
- **Build approach**: implement basic IntersectionObserver to add `.is-inview` class on entry. Use Lenis for the actual scroll smoothness.

## Buttons

### `.c-button` style
- `display: inline-flex`, `min-width: 200px`, `border-top: solid 2px`, `padding: 10px 0`, font-size 26px (medium)
- `data-icon="→"` renders content via `::after` pseudo with `margin-left: 0.5em`, `font-size: 75%`
- `.c-button.-full { width: 100% }`
- Hover: `text-decoration: underline` with thickness 2px (`var(--border-size)`)

## Lists

### `.c-list`
- `<ul>` with `<li.c-list_row>` children
- Each row has `border-top: solid 2px`
- `.c-list.-no-border-last-child .c-list_row:last-child { border-bottom: none }` (already no bottom-border by default; this controls last row only)
- `.c-list_link` — anchor; `data-icon="↗"` renders arrow after-content, padding-right: 50px to accommodate icon
