import { HoverShuffle } from "./HoverShuffle";
import { CountingNumber, RotatingTextRing } from "./RotatingNumber";
import { brand } from "@/content/arih";
import styles from "./Summary.module.css";

export function Summary() {
  const today = new Date();
  return (
    <section
      className={`c-home-summary u-padding -big-top -big-bottom ${styles.summary}`}
      data-scroll
    >
      <span className={styles.label}>
        ©{brand.yearFounded}–{today.getFullYear()}
      </span>

      <div className={styles.inner}>
        {/* Top line: Years */}
        <p className={styles.text}>
          <span>
            <CountingNumber to={today.getFullYear() - brand.yearFounded} suffix=" years" />
          </span>
          <span>{brand.bigStat.projects} projects</span>
          <span>{brand.bigStat.awards} awards</span>
        </p>

        {/* Two rotating text rings overlapping */}
        <div className={styles.visual} aria-hidden="true">
          <RotatingTextRing
            text=" · STUDIO ARIH · SINCE 1996 · LJUBLJANA · MISLI VELIKO · OSTANI MAJHEN "
            diameter={300}
            speed="40s"
            className={styles.outerRing}
          />
          <RotatingTextRing
            text=" · 01 · 02 · 03 · 04 · 05 · 06 · 07 · 08 · 09 · 10 · 11 · 12 · "
            diameter={200}
            speed="28s"
            reverse
            className={styles.innerRing}
          />
          <span className={styles.center}>
            <span className={styles.centerLabel}>Year</span>
            <span className={styles.centerYear}>{today.getFullYear()}</span>
          </span>
        </div>

        <span className={styles.footer}>
          <a
            href="/atelje"
            className="c-button -full"
            data-icon="→"
          >
            <span className="c-button_label">
              <HoverShuffle text="The studio" />
            </span>
          </a>
        </span>
      </div>
    </section>
  );
}
