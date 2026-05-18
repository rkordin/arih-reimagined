"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HoverShuffle } from "./HoverShuffle";
import { navLinks } from "@/content/arih";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.classList.add("is-mobile-menu-open");
      document.body.style.overflow = "hidden";
    } else {
      root.classList.remove("is-mobile-menu-open");
      document.body.style.overflow = "";
    }
    return () => {
      root.classList.remove("is-mobile-menu-open");
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={open ? styles.headerOpen : undefined}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.header}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
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

        <button
          className={styles.toggler}
          aria-label={open ? "Zapri meni" : "Odpri meni"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? "Zapri" : "Meni"}</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobilni meni"
        aria-hidden={!open}
      >
        <ul className={styles.mobileList}>
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setOpen(false)}
              >
                <span className={styles.mobileLinkLabel}>{item.label}</span>
                <span className={styles.mobileLinkDesc} aria-hidden="true">
                  {item.desc}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/kontakt"
              className={`${styles.mobileLink} ${styles.mobileLinkCta}`}
              onClick={() => setOpen(false)}
            >
              <span className={styles.mobileLinkLabel}>Kontakt</span>
              <span className={styles.mobileLinkDesc} aria-hidden="true">
                Pišite nam
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
