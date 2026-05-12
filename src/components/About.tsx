import Link from "next/link";
import { HoverShuffle } from "./HoverShuffle";
import { CountingNumber } from "./RotatingNumber";
import { aboutCopy, brand } from "@/content/arih";
import styles from "./About.module.css";

export function About() {
  return (
    <div className={`c-home-about u-margin -small-top ${styles.about}`} data-scroll>
      <p className={`c-heading -h1 ${styles.heroCopy}`}>
        {aboutCopy.big_en}
      </p>

      <div className={styles.grid}>
        <div className={styles.visualCol}>
          <div className={styles.visual} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/arih/founder.jpg" alt="" className={styles.portrait} />
          </div>
          <span className={styles.caption}>
            <span>{aboutCopy.caption_en_a}</span>
            <span>{aboutCopy.caption_en_b}</span>
          </span>
        </div>

        <div className={styles.textCol}>
          <p className={`o-text -medium ${styles.para}`}>{aboutCopy.small_en}</p>

          {/* Rotating-numbers stats strip */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                <CountingNumber to={new Date().getFullYear() - brand.yearFounded} suffix="+" />
              </span>
              <span className={styles.statLabel}>Years in business</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                <CountingNumber to={brand.bigStat.projects} suffix="" />
              </span>
              <span className={styles.statLabel}>Projects shipped</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                <CountingNumber to={brand.bigStat.clients} suffix="+" />
              </span>
              <span className={styles.statLabel}>Long-term clients</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                <CountingNumber to={brand.bigStat.awards} suffix="" />
              </span>
              <span className={styles.statLabel}>Awards &amp; recognitions</span>
            </div>
          </div>

          <div className={styles.buttons}>
            <Link href="/atelje" className="c-button -full" data-icon="→">
              <span className="c-button_label">
                <HoverShuffle text="The studio" />
              </span>
            </Link>
            <Link href="/kontakt" className="c-button -full" data-icon="→">
              <span className="c-button_label">
                <HoverShuffle text="Kontakt" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
