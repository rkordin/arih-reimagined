import { HoverShuffle } from "./HoverShuffle";
import { campaigns, publications, brand } from "@/content/arih";
import styles from "./Extras.module.css";

export function Extras() {
  return (
    <section
      className={`c-home-extras u-margin -big-top -big-bottom ${styles.extras}`}
      data-scroll
    >
      <h2 className={`c-heading -h1 ${styles.title}`}>
        <span>Extras</span>
        <span className={styles.count}>
          ({campaigns.length + publications.length + 1})
        </span>
      </h2>

      <SectionOverline title="Campaigns" count={campaigns.length}>
        <ul className="c-list -no-border-last-child">
          {campaigns.map((c) => (
            <li key={c.href} className="c-list_row">
              <div className={`c-list_item ${styles.row}`}>
                <span className={styles.numCol}>№ {String(c.no).padStart(2, "0")}</span>
                <a href={c.href} className={`c-list_link ${styles.linkMain}`} data-icon="↗">
                  <HoverShuffle text={c.label} />
                </a>
                <span className={styles.yearCol}>{c.year}</span>
              </div>
            </li>
          ))}
        </ul>
      </SectionOverline>

      <SectionOverline title="Publications" count={publications.length}>
        <ul className="c-list -no-border-last-child">
          {publications.map((p) => (
            <li key={p.href} className="c-list_row">
              <div className={`c-list_item ${styles.row}`}>
                <span className={styles.numCol}>№ {String(p.no).padStart(2, "0")}</span>
                <a href={p.href} className={`c-list_link ${styles.linkMain}`} data-icon="↗">
                  <HoverShuffle text={p.label} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </SectionOverline>

      <SectionOverline title="Studio">
        <div className={styles.studioContent}>
          <p className={styles.studioPara}>
            Visit us at <strong>{"Nazorjeva 6, Ljubljana"}</strong>. The studio is open
            Monday through Friday, 9:00–17:00 CET. We work directly with founders and
            creative directors — no account layer, just people who know your file as
            well as you do.
          </p>
          <ul className="c-list -no-border-last-child">
            <li className="c-list_row">
              <div className={`c-list_item ${styles.row}`}>
                <span className={styles.numCol}>№ 22</span>
                <a href="/atelje" className={`c-list_link ${styles.linkMain}`} data-icon="↗">
                  <HoverShuffle text="Read the studio story" />
                </a>
              </div>
            </li>
            <li className="c-list_row">
              <div className={`c-list_item ${styles.row}`}>
                <span className={styles.numCol}>№ 23</span>
                <a href="mailto:info@arih.si" className={`c-list_link ${styles.linkMain}`} data-icon="↗">
                  <HoverShuffle text="Start a project — info@arih.si" />
                </a>
              </div>
            </li>
          </ul>
          {/* Big stat ticker */}
          <div className={styles.studioStats} aria-hidden="true">
            <div><span className={styles.statN}>{brand.bigStat.years}+</span><span>years</span></div>
            <div><span className={styles.statN}>{brand.bigStat.projects}</span><span>projects</span></div>
            <div><span className={styles.statN}>{brand.bigStat.clients}+</span><span>clients</span></div>
            <div><span className={styles.statN}>{brand.bigStat.awards}</span><span>awards</span></div>
          </div>
        </div>
      </SectionOverline>
    </section>
  );
}

function SectionOverline({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="c-section-overline">
      <div className="c-section-overline_inner">
        <h2 className="c-section-overline_title">
          {title}
          {count !== undefined && <span className={styles.olCount}> ({count})</span>}
        </h2>
        <div className="c-section-overline_content">{children}</div>
      </div>
    </div>
  );
}
