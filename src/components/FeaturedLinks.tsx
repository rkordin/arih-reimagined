import { SpinningNumber } from "./RotatingNumber";
import { featuredProjects } from "@/content/arih";
import styles from "./FeaturedLinks.module.css";

export function FeaturedLinks() {
  return (
    <>
      <h2 className={styles.heading}>
        <span>Selected work</span>
        <span className={styles.headingCount}>({featuredProjects.length + 1})</span>
      </h2>
      <section className={styles.section} data-scroll>
        <ul className={styles.list}>
          {featuredProjects.map((p) => (
            <li key={p.title} className={styles.item}>
              <h3 className="u-screen-reader-text">{p.title}</h3>
              <span className={styles.badge} aria-hidden="true">
                <SpinningNumber value={p.no} size="56px" speed="18s" />
              </span>
              <div className={styles.title} aria-hidden="true">
                <span>{p.parts[0]}</span>
                <div className={styles.visual}>
                  <span className={styles.visualInner}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image.src}
                      alt={p.image.alt}
                      width={p.image.width}
                      height={p.image.height}
                    />
                  </span>
                </div>
                {p.parts[1] ? <span>{p.parts[1]}</span> : <span aria-hidden="true" />}
              </div>
              <span className={styles.category} aria-hidden="true">{p.category}</span>
              <a href={p.href} className={styles.link}>
                Read more about {p.title}
              </a>
            </li>
          ))}

          <li className={`${styles.item} ${styles.ctaItem}`}>
            <h3 className="u-screen-reader-text">All work</h3>
            <span className={styles.badge} aria-hidden="true">
              <SpinningNumber value={94} prefix="Σ " size="56px" speed="12s" />
            </span>
            <div className={`${styles.title} ${styles.ctaTitle}`} aria-hidden="true">
              <span>All work</span>
            </div>
            <a href="/cgp" className={styles.link}>
              See all projects
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
