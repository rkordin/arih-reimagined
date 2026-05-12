import Link from "next/link";
import styles from "./CategoryIndex.module.css";

export type IndexItem = {
  no: number;
  label: string;
  href: string;
  meta?: string;
  image?: { src: string; alt: string };
};

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  items: IndexItem[];
};

export function CategoryIndex({ eyebrow, title, lede, items }: Props) {
  return (
    <>
      <header className={styles.intro} data-scroll>
        <div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <span className={styles.count}>({items.length.toString().padStart(2, "0")})</span>
        <p className={styles.lede}>{lede}</p>
      </header>

      <ul className={styles.list} data-scroll>
        {items.map((item) => (
          <li key={item.href} className={styles.item}>
            <span className={styles.no}>
              {item.no.toString().padStart(2, "0")}
            </span>
            <span className={styles.label}>
              <span>{item.label}</span>
              {item.image && (
                <span className={styles.thumb} aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image.src} alt="" />
                </span>
              )}
            </span>
            {item.meta && <span className={styles.meta}>{item.meta}</span>}
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
