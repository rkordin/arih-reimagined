"use client";

import styles from "./HeroAnimated.module.css";

/**
 * 10-second looping ARIH® hero — runtime CSS/SVG implementation of the
 * Higgsfield brief.
 *
 * Timeline (each loop):
 *   0.0 – 1.0s  Hold start frame: black bg, pixelated ARIH® projected on face
 *   1.0 – 3.0s  Pixel grid resolves block-by-block (top-left → bottom-right)
 *   3.0s        HARD CUT: bg flips black → deep crimson (single click moment)
 *   3.0 – 5.0s  ARIH® slides off the face, anchors right two-thirds of frame
 *   5.0 – 6.5s  Wordmark locked sharp at right; chromatic aberration fades out
 *   6.5 – 8.0s  Subtitle "Branding and design studio — Ljubljana, since 1996." fades up
 *   8.0 – 9.6s  Hold sharp end frame
 *   9.6 – 10s   4-frame glitch (red/cyan split + type stutter) wipes back to start
 */
export function HeroAnimated() {
  return (
    <div className={`c-home-hero ${styles.hero}`} data-scroll>
      {/* L0: background colour state */}
      <div className={styles.bg} aria-hidden="true" />

      {/* L1: portrait base — projected text wraps onto the face */}
      <div className={styles.portrait} aria-hidden="true" />

      {/* L2: faint architectural blueprint marks (top-left corner) */}
      <svg className={styles.arcs} viewBox="0 0 200 200" aria-hidden="true">
        <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none">
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="40" />
          <line x1="100" y1="20" x2="100" y2="180" />
          <line x1="20" y1="100" x2="180" y2="100" />
          <path d="M 40 40 A 60 60 0 0 1 100 100" />
        </g>
      </svg>

      {/* L3: pixel-grid projection of ARIH® that resolves */}
      <div className={styles.pixelStage} aria-hidden="true">
        <div className={styles.pixelText}>ARIH<span className={styles.reg}>®</span></div>
        <div className={styles.pixelOverlay}>
          {/* 8x8 grid of mask cells, each animated with staggered delay */}
          {Array.from({ length: 64 }).map((_, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            // diagonal stagger from upper-left to lower-right
            const delay = (row + col) * 0.08;
            return (
              <span
                key={i}
                className={styles.pixelCell}
                style={{ animationDelay: `${delay}s` }}
              />
            );
          })}
        </div>
      </div>

      {/* L4: anchored mega-wordmark on the right (visible from t=3s onward) */}
      <div className={styles.wordmark} aria-hidden="true">
        <span>ARIH<sup>®</sup></span>
      </div>

      {/* L5: tagline (centered, big, on the start frame; transitions out) */}
      <div className={styles.tagline}>
        <span>Think big.</span>
        <span>Stay small.</span>
      </div>

      {/* L6: subtitle along the bottom edge (visible from t=6.5s) */}
      <div className={styles.subtitle}>
        Branding and design studio — Ljubljana, since 1996.
      </div>

      {/* L7: chromatic aberration overlay (active during pixel phase + glitch) */}
      <div className={styles.aberration} aria-hidden="true" />

      {/* L8: end-of-loop glitch flash */}
      <div className={styles.glitch} aria-hidden="true" />

      {/* SR-only H1 for SEO/A11y */}
      <h1 className={styles.srOnly}>
        ARIH® — Think big. Stay small. Branding and design studio, Ljubljana, since 1996.
      </h1>
    </div>
  );
}
