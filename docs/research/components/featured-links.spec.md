# FeaturedLinks Specification

## Overview
- **Target file:** `src/components/FeaturedLinks.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png` (mid-section showing huge centered titles)
- **Interaction model:** hover-driven image reveal between split title spans

## DOM Structure
```
<section class="c-featured-links">
  <h2>Featured work</h2>
  <ul class="c-featured-links_list">
    <li class="c-featured-links_item" data-hover-shuffle="children">
      <h3 class="u-screen-reader-text">Theory Verse</h3>
      <div class="c-featured-links_title">
        <span data-hover-shuffle-child>Theory</span>
        <div class="c-image c-featured-links_visual">
          <span class="c-image_inner">
            <img src="/projects/theory-verse.jpg" alt="Theory Verse logo" width="300" height="189" />
          </span>
        </div>
        <span data-hover-shuffle-child>Verse</span>
      </div>
      <a class="c-featured-links_link" href="/work/theory-verse">Read more about this project</a>
    </li>
    [...4 more items...]
    <li class="c-featured-links_item -cta">
      <div class="c-featured-links_title">
        <span>* All Work</span>
      </div>
      <a class="c-featured-links_link" href="/work">See all projects</a>
    </li>
  </ul>
</section>
```

## Computed styles
- `.c-featured-links_list` { border-bottom: solid 2px }
- `.c-featured-links_item` { position: relative; border-top: solid 2px; display: flex; padding: 1.333rem 0 }
- `.c-featured-links_title` { display: flex; justify-content: center; line-height: 1; text-align: center; flex-grow: 1; font-family: LocomotiveNew; font-size: var(--font-size-huge) }
- `.c-featured-links_title > span` { display: inline-block; transform: translateY(0.1em) }
- `.c-featured-links_title > span:nth-child(1):not(:last-child)` { padding-right: 0.1em }
- `.c-featured-links_title > span:last-child:not(:first-child)` { padding-left: 0.1em }
- `.c-featured-links_visual` { overflow: hidden; display: inline-block; position: relative; width: 0em; transition: width 0.2s cubic-bezier(0.23,1,0.32,1) }
- `.c-featured-links_visual::before` { content: ""; display: block; padding-bottom: 1em }  /* aspect ratio */
- `.c-featured-links_item:hover .c-featured-links_visual` { width: 1.5em; transition-duration: 0.45s }
- `.c-featured-links_link` { position: absolute; top: 0; left: 0; width: 100%; height: 100%; font-size: 0 } (overlay click target)

## Behaviors
### Hover image reveal
- Trigger: hover (or focus-within) on `.c-featured-links_item`
- Width 0em → 1.5em (1.5 × line-height which equals font-size; at 110px font, 1.5em = 165px)
- Easing: cubic-bezier(0.23, 1, 0.32, 1)
- Duration: 0.45s enter, 0.2s leave
- The two spans naturally move apart as the image grows between them

### CTA item ("* All Work")
- `.c-featured-links_item.-cta .c-featured-links_title::before, ::after` { content: "🕳"; font-size: 50%; animation: featuredProjectsAllFlash 2s linear infinite }
- We approximate the original animation (alternate opacity / blink)

### Text content with embedded image
- Theory|Verse, Scout|Motors, Mate|Libre, Destigmatize (single word — image to its right)
- "Populous" appears single-word in the HTML; image reveals to the right of it

## Verbatim text
Items in order:
1. Theory|Verse → `/work/theory-verse` (image: theory-verse.jpg)
2. Scout|Motors → `/work/scout-motors` (image: scout-motors.jpg)
3. Populous (single word with empty second span) → `/work/populous` (image: populous.jpg)
4. Mate|Libre → `/work/mate-libre` (image: mate-libre.jpg)
5. Destigmatize (single word, empty second span) → `/work/destigmatize` (image: destigmatize.jpg)
6. "All Work" → `/work` (CTA item with hole emoji bullets)

## Responsive
- Font size scales via var(--font-size-huge) = 7.638vw (~110px @ 1440, ~58px @ 768, 40px <500)
- Padding may shrink slightly via spacing vars; keep 1.333rem standard
