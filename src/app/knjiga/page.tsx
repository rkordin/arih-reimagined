import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { book } from "@/content/arih";
import { BookOrderForm } from "@/components/BookOrderForm";
import styles from "./knjiga.module.css";

export const metadata: Metadata = {
  title: `Knjiga „${book.titlePrimary}“ · ARIH`,
  description: `${book.titlePrimary} — ${book.titleSubtitle}. Knjiga ${book.author}a.`,
};

export default function KnjigaPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO — massive title overlay on cover */}
        <section className={styles.hero}>
          <div className={styles.heroStage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.cover}
              src={book.images[0].url}
              alt={book.images[0].alt}
            />
            <div className={styles.heroOverlay}>
              <span className={styles.eyebrow}>Knjiga · {book.year}</span>
              <h1 className={styles.bigTitle}>
                <span>Budi</span>
                <span>Voda</span>
              </h1>
              <p className={styles.heroSub}>{book.titleSubtitle}</p>
              <a href="#narocilnica" className={styles.heroCta}>
                Naroči knjigo &nbsp;→
              </a>
            </div>
          </div>
          <div className={styles.heroFooter}>
            <span>{book.pages} strani</span>
            <span>{book.format}</span>
            <span>{book.language}</span>
            <span>{book.publisher}</span>
          </div>
        </section>

        {/* O KNJIGI */}
        <section className={styles.about} data-scroll>
          <div className={styles.aboutHead}>
            <span className={styles.smallLabel}>O knjigi</span>
          </div>
          <div className={styles.aboutBody}>
            <p>
              Oglaševanje, kot smo ga poznali v osemdesetih, je davno presežek.
              Mediji so postali dvosmerni, publika nestrpna, sporočila preglasna.
              Knjiga premišljuje, kaj pride za tem in kako se v tem svetu obdržati
              pri pameti, pri ekipi in pri naročniku.
            </p>
            <p>
              Avtor strne tridesetletne izkušnje v sedem konkretnih napak, ki jih
              oglaševanje še vedno počne, in v sedem orodij za bolj zdravo
              komunikacijo. Med poglavji so razvrščeni resnični primeri iz arhiva
              agencije in branja, ki so vplivala na njegov pristop.
            </p>
            <p>
              Knjiga ne ponuja receptov. Ponuja skrbno premišljeno mnenje človeka,
              ki je delal in se motil dovolj dolgo, da je svoja prepričanja
              zasluženo dobil.
            </p>
          </div>
          <aside className={styles.specs}>
            <dl>
              <dt>Strani</dt>
              <dd>{book.pages}</dd>
              <dt>Format</dt>
              <dd>{book.format}</dd>
              <dt>Jezik</dt>
              <dd>{book.language}</dd>
              <dt>Leto</dt>
              <dd>{book.year}</dd>
              <dt>Založnik</dt>
              <dd>{book.publisher}</dd>
              <dt>ISBN</dt>
              <dd>{book.isbn}</dd>
            </dl>
          </aside>
        </section>

        {/* IMAGES — full bleed spread */}
        <figure className={styles.spread} data-scroll>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.images[1].url} alt={book.images[1].alt} />
          <figcaption>{book.images[1].alt}</figcaption>
        </figure>

        {/* AVTOR */}
        <section className={styles.author} data-scroll>
          <div className={styles.authorPortrait}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={book.images[2].url} alt="Igor Arih — portret" />
          </div>
          <div className={styles.authorBody}>
            <span className={styles.smallLabel}>Avtor</span>
            <h2 className={styles.authorName}>{book.author}</h2>
            <p>
              Rojen {book.authorYear} v {book.authorPlace}u, kreativni direktor in
              lastnik Agencije Arih. Po desetletju dela v agenciji Futura je leta
              1991 ustanovil svojo ekipo. Danes vodi izbran krog naročnikov in
              sodeluje pri lastnih blagovnih znamkah.
            </p>
            <p>
              Bil je član žirije za tisk na festivalu Cannes Lions ter žirij Zlati
              boben, SOF in Idea festival. Predaval je doma in v tujini. Pisanje
              obravnava kot redno disciplino in del prakse — knjiga je nadaljevanje
              tega istega dela.
            </p>
          </div>
        </section>

        {/* REVIEWS */}
        <section className={styles.reviews} data-scroll>
          <div className={styles.reviewsHead}>
            <span className={styles.smallLabel}>Kaj pravijo bralci</span>
            <span className={styles.smallLabel} style={{ opacity: 0.4 }}>
              (odzivi se zbirajo)
            </span>
          </div>
          <div className={styles.reviewGrid}>
            <blockquote className={styles.review}>
              <p>
                „Bere se kot pogovor med dvema kolegoma za mizo. Brez modnih besed
                in brez teorij — samo prakse.“
              </p>
              <cite>Bralka, oglaševalska stroka</cite>
            </blockquote>
            <blockquote className={styles.review}>
              <p>
                „Knjiga, ki jo želim podariti vsakemu mlademu sodelavcu, preden ga
                pošljem na prvo stranko.“
              </p>
              <cite>Bralec, marketing manager</cite>
            </blockquote>
            <blockquote className={styles.review}>
              <p>
                „Iskrena, jezikovno jedrnata, prepričljiva tam, kjer je strokovna
                literatura največkrat vodena.“
              </p>
              <cite>Bralka, urednica</cite>
            </blockquote>
          </div>
        </section>

        {/* ORDER FORM */}
        <section id="narocilnica" className={styles.orderSection} data-scroll>
          <div className={styles.orderHead}>
            <span className={styles.smallLabel}>Naročilnica</span>
            <h2 className={styles.orderTitle}>Naročite knjigo.</h2>
            <p className={styles.orderNote}>
              Demo. Naročila se ne procesirajo — namen je prikaz toka. Ob izstavi se
              vključi pravo plačilno procesiranje.
            </p>
          </div>
          <BookOrderForm
            variants={book.variants}
            shipping={book.shipping}
          />
        </section>

        <Footer />
      </main>
    </>
  );
}
