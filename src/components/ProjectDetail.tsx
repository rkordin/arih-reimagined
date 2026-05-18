import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROJECTS,
  CATEGORIES,
  type Project,
  type ProjectCategory,
  slovenianDate,
} from "@/content/projects";
import styles from "./ProjectDetail.module.css";

const cleanSlugFromHref = (href: string) => href.split("/").pop() || "";
const cleanHref = (p: Project) => `/${p.category}/${cleanSlugFromHref(p.href)}`;

export function ProjectDetail({
  category,
  slug,
}: {
  category: ProjectCategory;
  slug: string;
}) {
  const project = PROJECTS.find(
    (p) => p.category === category && cleanSlugFromHref(p.href) === slug
  );
  if (!project) notFound();

  const cat = CATEGORIES[category];
  const related = PROJECTS.filter(
    (p) => p.category === category && p.slug !== project.slug
  ).slice(0, 3);

  return (
    <>
      <header className={styles.head} data-scroll>
        <div>
          <span className={styles.meta}>
            {cat.label} · {slovenianDate(project.date)}
          </span>
          <h1 className={styles.title}>{project.title}</h1>
          {project.tagline && <p className={styles.tagline}>{project.tagline}</p>}
        </div>
        <dl className={styles.specs}>
          <dt>Leto</dt>
          <dd>{project.year}</dd>
          <dt>Kategorija</dt>
          <dd>
            <Link href={`/${project.category}`}>{cat.short}</Link>
          </dd>
          <dt>Slik</dt>
          <dd>{project.imagesCount}</dd>
        </dl>
      </header>

      <section className={styles.gallery} data-scroll>
        {project.images.map((src, i) => (
          <figure
            key={src + i}
            className={`${styles.fig} ${i === 0 || i % 3 === 1 ? styles.full : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${project.title} — slika ${i + 1}`}
              loading={i < 2 ? "eager" : "lazy"}
            />
          </figure>
        ))}
      </section>

      {project.quote && (
        <section className={styles.pullquote} data-scroll>
          <blockquote className={styles.quoteBlock}>
            <p>
              <span aria-hidden="true" className={styles.quoteMark}>“</span>
              {project.quote}
              <span aria-hidden="true" className={styles.quoteMark}>”</span>
            </p>
            {project.quoteAttribution && (
              <cite className={styles.quoteCite}>{project.quoteAttribution}</cite>
            )}
          </blockquote>
        </section>
      )}

      {project.description && (
        <section className={styles.description} data-scroll>
          <span className={styles.meta}>O projektu</span>
          <div>
            <p>{project.description}</p>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className={styles.related} data-scroll>
          <span className={styles.relatedHead}>Več v {cat.label.toLowerCase()}</span>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <Link
                key={r.slug + r.date}
                href={cleanHref(r)}
                className={styles.relatedCard}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.cover ?? ""} alt={r.title} loading="lazy" />
                <div className={styles.relatedMeta}>
                  <span>{CATEGORIES[r.category].short}</span>
                  <span>{r.year}</span>
                </div>
                <h3 className={styles.relatedTitle}>{r.title}</h3>
              </Link>
            ))}
          </div>
          <Link href={`/${category}`} className={styles.back}>
            ← Vsi v {cat.short}
          </Link>
        </section>
      )}
    </>
  );
}
