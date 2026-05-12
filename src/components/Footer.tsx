import Link from "next/link";
import { HoverShuffle } from "./HoverShuffle";
import { CountingNumber, SpinningNumber } from "./RotatingNumber";
import { contact, social, navLinks, brand } from "@/content/arih";
import styles from "./Footer.module.css";

export function Footer() {
  const today = new Date();
  return (
    <footer className={`c-footer ${styles.footer}`}>
      <nav className={styles.nav} aria-label="Footer">
        <ul className={styles.menuList}>
          <li className={styles.menuMain}>
            <h2 className={styles.menuTitle}>Meni</h2>
            <ul className={styles.subList}>
              {navLinks.map((m) => (
                <li key={m.label} className={styles.menuItem}>
                  <Link href={m.href} className={styles.menuLink}>
                    <HoverShuffle text={m.label} />
                  </Link>
                </li>
              ))}
              <li className={styles.menuItem}>
                <Link href="/kontakt" className={styles.menuLink}>
                  <HoverShuffle text="Kontakt" />
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/priznanja" className={styles.menuLink}>
                  <HoverShuffle text="Priznanja" />
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/publikacije" className={styles.menuLink}>
                  <HoverShuffle text="Publikacije" />
                </Link>
              </li>
            </ul>
            <div className={styles.menuCta}>
              <button type="button">
                <HoverShuffle text="Privacy" />
              </button>
              <button type="button">
                <HoverShuffle text="Newsletter" />
                <span aria-hidden="true"> ↓</span>
              </button>
            </div>
          </li>

          <li className={styles.menuCol}>
            <h2 className={styles.menuTitle}>Social</h2>
            <ul className={styles.subList}>
              {social.map((s) => (
                <li key={s.label} className={styles.menuItem}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.menuLink}
                    data-icon="↗"
                  >
                    <HoverShuffle text={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li className={styles.menuCol}>
            <h2 className={styles.menuTitle}>Stat</h2>
            <ul className={`${styles.subList} ${styles.statList}`}>
              <li className={styles.menuItem}>
                <span className={styles.statLabel}>Years</span>
                <span className={styles.statValue}>
                  <CountingNumber to={today.getFullYear() - brand.yearFounded} suffix="+" />
                </span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.statLabel}>Projects</span>
                <span className={styles.statValue}>
                  <CountingNumber to={brand.bigStat.projects} />
                </span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.statLabel}>Clients</span>
                <span className={styles.statValue}>
                  <CountingNumber to={brand.bigStat.clients} suffix="+" />
                </span>
              </li>
              <li className={styles.menuItem}>
                <span className={styles.statLabel}>Awards</span>
                <span className={styles.statValue}>
                  <CountingNumber to={brand.bigStat.awards} />
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className={styles.contact}>
        <a
          href="https://maps.google.com/?q=Nazorjeva+6+Ljubljana"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.address}
        >
          {contact.street}
          <br />
          {contact.city}, {contact.country}
        </a>
        <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={styles.line}>
          <span>Telephone </span>
          <span>{contact.phone}</span>
        </a>
        <a href={`mailto:${contact.email}`} className={styles.line}>
          {contact.email}
        </a>
        <span className={styles.copy}>
          <SpinningNumber value={today.getFullYear()} prefix="©" size="32px" speed="36s" />
        </span>
      </div>
    </footer>
  );
}
