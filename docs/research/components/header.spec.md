# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** scroll-driven (uses `mix-blend-mode: difference` + an opacity-fading background bar driven by `html.is-over-home-hero` class)

## DOM Structure
```
<header>
  <div class="c-header_bg" />          {/* white fixed bar — opacity 0 over hero, 1 elsewhere */}
  <div class="c-header">
    <a class="c-header_logo" href="/">
      <span data-hover-shuffle>Locomotive</span>®
    </a>
    <nav class="c-header_menu">
      <ul class="c-header-menu_list">
        <li><a data-hover-shuffle>Work</a></li>
        <li><a data-hover-shuffle>Agency</a></li>
        <li><a data-hover-shuffle>Careers</a></li>
        <li><a data-hover-shuffle target="_blank">Store</a></li>
      </ul>
    </nav>
    <a class="c-header_cta" data-hover-shuffle href="/contact">Let's talk</a>
    <button class="c-header_menu-toggler" aria-label="Navigation mobile">Menu</button>
  </div>
</header>
```

## Computed Styles

### `.c-header_bg` (fixed white bar)
- position: fixed; top: 0; left: 0; width: 100%; height: var(--header-height)
- background: var(--color-bg) (#FFFFFF)
- z-index: 740
- opacity: 1 (default), 0 when `html.is-over-home-hero`
- transition: background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.2s same

### `.c-header` (12-col grid, foreground content)
- position: fixed; top: 0; left: 0; width: 100%; height: var(--header-height) (4rem)
- z-index: 800
- mix-blend-mode: difference  ← KEY
- color: rgb(255, 255, 255)  (inverted to black by difference over white bg)
- font-size: var(--font-size-medium); line-height: 1.2
- display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.33333rem
- padding: 0 var(--grid-margin)
- transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)

### `.c-header_logo`
- grid-area: 1 / 1 / 2 / 3
- font-weight: 400, font-family: HelveticaNowDisplay

### `.c-header_menu`
- grid-area: 1 / 7 / 2 / 11
- display: inline-block
- Inside ul.c-header-menu_list { white-space: nowrap }
- li.c-header-menu_item { display: inline-block, separated by ", " (use commas between items)

### `.c-header_cta`
- grid-area: 1 / 11 / 2 / 13
- text-align: right; justify-self: end

### `.c-header_menu-toggler` (mobile)
- Hidden on desktop (>= 1024px)
- Visible on mobile/tablet; replaces nav and cta

## Behaviors
### Mix-blend swap
- Trigger: presence/absence of `html.is-over-home-hero` (handled by LenisScroll IntersectionObserver)
- State A (over hero, dark video bg): `.c-header_bg` opacity 0 → text reads white over dark
- State B (scrolled past hero, white bg): `.c-header_bg` opacity 1 → text reads black over white (mix-blend inverts white text → black)

### Hover underline
- `.c-header a:not(.c-header_logo):hover` → text-decoration: underline; thickness 2px; offset 0.1em

## Responsive
- Desktop ≥1024: grid 12 cols, padding 40px, nav + cta visible
- Tablet ≤1024 and Mobile ≤699: padding 20px, nav and cta `display: none`, menu-toggler visible

## Verbatim text
- Logo: "Locomotive" (shuffles) + "®" (static)
- Menu (with commas): "Work", "Agency", "Careers", "Store" (Store opens in new tab)
- CTA: "Let's talk"
