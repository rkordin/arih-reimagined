"use client";

import styles from "./HeroVideo.module.css";

export function HeroVideo() {
  return (
    <div className={`c-home-hero ${styles.hero}`} data-scroll>
      <video
        className={styles.video}
        src="/hero/intro_v2.mp4"
        poster="/hero/poster_v2.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.tagline}>
        <span>Think big.</span>
        <span>Stay small.</span>
      </div>

      <div className={styles.subtitle}>
        Branding and design studio — Ljubljana, since 1996.
      </div>

      <h1 className={styles.srOnly}>
        ARIH® — Think big. Stay small. Branding and design studio, Ljubljana, since 1996.
      </h1>
    </div>
  );
}
