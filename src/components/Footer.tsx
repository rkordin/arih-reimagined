import { HoverShuffle } from "./HoverShuffle";
import { CountingNumber, SpinningNumber } from "./RotatingNumber";
import { contact, social, brand } from "@/content/arih";
import styles from "./Footer.module.css";

export function Footer() {
  const today = new Date();
  const mapsQuery = encodeURIComponent(`${contact.street}, ${contact.city}, ${contact.country}`);

  return (
    <footer className={`c-footer ${styles.footer}`}>
      <nav className={styles.nav} aria-label="Footer">
        <ul className={styles.menuList}>
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
          href={`https://maps.google.com/?q=${mapsQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.address}
        >
          {contact.street}
          <br />
          {contact.city}, {contact.country}
        </a>
        <a href={`tel:${contact.phoneE164}`} className={styles.line}>
          <span>Telefon </span>
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
