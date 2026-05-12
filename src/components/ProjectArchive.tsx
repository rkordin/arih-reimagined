"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { CATEGORIES } from "@/content/projects";
import styles from "./ProjectArchive.module.css";

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  items: Project[];
  /** When true, show each row's category (mixed-category lists like Priznanja). */
  showCategory?: boolean;
};

export function ProjectArchive({ eyebrow, title, lede, items, showCategory = false }: Props) {
  const [hoverSrc, setHoverSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!imgRef.current) return;
      imgRef.current.style.left = `${e.clientX}px`;
      imgRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <header className={styles.intro} data-scroll>
        <div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div>
          <p className={styles.lede}>{lede}</p>
          <span className={styles.count}>
            {items.length.toString().padStart(2, "0")} projektov
          </span>
        </div>
      </header>

      <ul className={styles.list} data-scroll>
        {items.map((p) => {
          const cat = CATEGORIES[p.category];
          const slug = p.href.split("/").pop() || p.slug;
          const cleanHref = `/${p.category}/${slug}`;
          return (
            <li
              key={p.slug + p.date}
              className={styles.row}
              onPointerEnter={() => setHoverSrc(p.cover)}
              onPointerLeave={() => setHoverSrc(null)}
            >
              <span className={styles.year}>{p.year}</span>
              {showCategory && <span className={styles.cat}>{cat.short}</span>}
              {!showCategory && <span className={styles.cat} aria-hidden="true" />}
              <span className={styles.title2}>
                <span>{p.title}</span>
                {p.cover && (
                  <span className={styles.preview} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.cover ?? ""} alt="" loading="lazy" />
                  </span>
                )}
              </span>
              <span className={styles.meta}>{p.imagesCount} slik</span>
              <Link href={cleanHref} className={styles.link}>
                {p.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        ref={imgRef}
        className={`${styles.hoverImage} ${hoverSrc ? styles.active : ""}`}
        style={hoverSrc ? { backgroundImage: `url(${hoverSrc})` } : undefined}
        aria-hidden="true"
      />
    </>
  );
}
