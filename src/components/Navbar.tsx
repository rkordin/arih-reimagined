import Link from "next/link";
import { HoverShuffle } from "./HoverShuffle";
import { navLinks } from "@/content/arih";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <header>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>
          <HoverShuffle text="Arih" className={styles.logoText} />
          <span aria-hidden="true">®</span>
        </Link>

        <nav className={styles.menu} aria-label="Primary">
          <ul className={styles.menuList}>
            {navLinks.map((item) => (
              <li key={item.label} className={styles.menuItem}>
                <Link href={item.href}>
                  <HoverShuffle text={item.label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/kontakt" className={styles.cta}>
          <HoverShuffle text="Kontakt" />
        </Link>

        <button className={styles.toggler} aria-label="Navigation mobile">
          Meni
        </button>
      </div>
    </header>
  );
}
