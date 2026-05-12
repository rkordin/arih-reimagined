import { DigitGrid, SpinningNumber } from "./RotatingNumber";
import { brand, heroCopy } from "@/content/arih";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <div className={`c-home-hero ${styles.hero}`} data-scroll>
      <div className={styles.background} aria-hidden="true">
        {/* Animated digit grid as living background — numbers shuffle every ~220ms */}
        <DigitGrid rows={8} cols={16} className={styles.digitGrid} />
        <div className={styles.gradient} />
      </div>

      {/* Floating year stamp top-left */}
      <span className={styles.yearStamp} aria-hidden="true">
        <SpinningNumber value={brand.yearFounded} prefix="EST. " size="48px" speed="28s" />
      </span>

      {/* Floating project counter top-right */}
      <span className={styles.projectStamp} aria-hidden="true">
        <SpinningNumber value={brand.bigStat.projects} prefix="WORKS · " size="48px" speed="24s" />
      </span>

      <div className={styles.content}>
        <h1 className={`c-heading -h1 ${styles.heading}`}>
          <span className={styles.lineA}>{brand.name}<sup>®</sup></span>
          <span className={styles.bigLine}>{heroCopy.title_en}</span>
          <span className={styles.lineB}>{heroCopy.subtitle_en}</span>
        </h1>
      </div>
    </div>
  );
}
