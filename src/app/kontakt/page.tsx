import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { contact, social, brand } from "@/content/arih";
import styles from "./kontakt.module.css";

export const metadata: Metadata = {
  title: "Kontakt · ARIH",
  description: "Agencija Arih — Celovška cesta 32, 1000 Ljubljana. info@arih.si.",
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main>
        <header className={styles.intro} data-scroll>
          <span className={styles.eyebrow}>Reach the studio</span>
          <h1 className={styles.title}>
            <span>Pišite.</span>
            <span>Pokličite.</span>
            <span>Obiščite.</span>
          </h1>
        </header>

        <section className={styles.cards}>
          <article className={styles.card}>
            <span className={styles.label}>01 — Studio</span>
            <h2 className={styles.cardTitle}>Agencija Arih d.o.o.</h2>
            <p className={styles.body}>
              {contact.street}
              <br />
              {contact.city}
              <br />
              {contact.country}
            </p>
            <a
              className={styles.cta}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                contact.street + ", " + contact.city
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in maps →
            </a>
          </article>

          <article className={styles.card}>
            <span className={styles.label}>02 — Direct</span>
            <h2 className={styles.cardTitle}>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </h2>
            <p className={styles.body}>
              <a href={`tel:${contact.phoneE164}`}>{contact.phone}</a>
              <br />
              {contact.hours}
            </p>
            <a className={styles.cta} href={`mailto:${contact.email}`}>
              Write to us →
            </a>
          </article>

          <article className={styles.card}>
            <span className={styles.label}>03 — Elsewhere</span>
            <h2 className={styles.cardTitle}>Social</h2>
            <ul className={styles.social}>
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label} →
                  </a>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.card} ${styles.cardWide}`}>
            <span className={styles.label}>04 — How we work</span>
            <h2 className={styles.cardTitle}>{brand.motto}</h2>
            <p className={styles.body}>
              We work direct with founders and directors. No account layer, no
              telephone game. If your project is right for us we&apos;ll say so
              within a week — and if it isn&apos;t, we&apos;ll point you to
              someone better suited.
            </p>
          </article>
        </section>

        <Footer />
      </main>
    </>
  );
}
