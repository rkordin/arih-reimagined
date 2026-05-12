"use client";

import { useEffect, useRef } from "react";
import styles from "./RotatingNumber.module.css";

/* ===========================================================================
   <SpinningNumber>
   --------------------------------------------------------------------------
   A static numeric badge whose container slowly rotates around its center.
   Used for project №-badges, year stamps, section indices.
   =========================================================================== */
export function SpinningNumber({
  value,
  prefix = "№",
  size = "1em",
  speed = "20s",
  className = "",
}: {
  value: number | string;
  prefix?: string;
  size?: string;
  speed?: string;
  className?: string;
}) {
  const padded = typeof value === "number" ? String(value).padStart(2, "0") : value;
  return (
    <span
      className={`${styles.spinner} ${className}`}
      style={{ fontSize: size, animationDuration: speed }}
      aria-hidden="true"
    >
      <span className={styles.spinnerInner}>
        {prefix}
        {padded}
      </span>
    </span>
  );
}

/* ===========================================================================
   <OdometerNumber>
   --------------------------------------------------------------------------
   A mechanical-odometer-style number that rolls each digit when value changes.
   Use for stat counts that animate from 0 -> target on mount, or that cycle
   through a sequence of values.
   =========================================================================== */
export function OdometerNumber({
  value,
  digits = 3,
  className = "",
  duration = 1600,
}: {
  value: number;
  digits?: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reels = el.querySelectorAll<HTMLSpanElement>(`.${styles.reel}`);
    const target = String(value).padStart(digits, "0");
    reels.forEach((reel, i) => {
      const targetDigit = parseInt(target[i] ?? "0", 10);
      // randomize start offset for tactile feel
      const startOffset = Math.floor(Math.random() * 10);
      reel.style.transitionDuration = `${duration}ms`;
      reel.style.transitionTimingFunction = "cubic-bezier(0.22, 0.61, 0.36, 1)";
      // Two-step animation: pre-spin then settle
      reel.style.transform = `translateY(-${startOffset * 10}%)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          reel.style.transform = `translateY(-${targetDigit * 10}%)`;
        });
      });
    });
  }, [value, digits, duration]);

  return (
    <span ref={ref} className={`${styles.odometer} ${className}`} aria-label={String(value)}>
      {Array.from({ length: digits }).map((_, i) => (
        <span key={i} className={styles.reelWindow} aria-hidden="true">
          <span className={styles.reel}>
            {Array.from({ length: 10 }).map((_, d) => (
              <span key={d} className={styles.digit}>
                {d}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ===========================================================================
   <CountingNumber>
   --------------------------------------------------------------------------
   Counts up from 0 to target with easing. Triggers on mount or when
   IntersectionObserver sees it (handled via `data-scroll` + .is-inview).
   =========================================================================== */
export function CountingNumber({
  to,
  duration = 1800,
  className = "",
  suffix = "",
  prefix = "",
}: {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    let raf = 0;
    const startCount = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const tick = (t: number) => {
        const elapsed = t - start;
        const p = Math.min(1, elapsed / duration);
        // ease-out-cubic
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${prefix}${Math.round(to * eased)}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            startCount();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ===========================================================================
   <RotatingTextRing>
   --------------------------------------------------------------------------
   SVG circular text that rotates. For the summary section the original
   locomotive site used a Three.js torus — we replace with a rotating
   SVG ring of repeating text (numbers/years).
   =========================================================================== */
export function RotatingTextRing({
  text,
  diameter = 280,
  speed = "30s",
  className = "",
  reverse = false,
}: {
  text: string;
  diameter?: number;
  speed?: string;
  className?: string;
  reverse?: boolean;
}) {
  const cx = diameter / 2;
  const radius = diameter / 2 - 14;
  const id = `ring-${text.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <span
      className={`${styles.textRing} ${reverse ? styles.textRingReverse : ""} ${className}`}
      style={{ width: diameter, height: diameter, animationDuration: speed }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${diameter} ${diameter}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            id={id}
            d={`M ${cx},${cx} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text fontSize="14" letterSpacing="2">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
    </span>
  );
}

/* ===========================================================================
   <DigitGrid>
   --------------------------------------------------------------------------
   A grid of digits 0-9 that cycle randomly in place — gives a "live numbers
   in motion" texture for the hero background.
   =========================================================================== */
export function DigitGrid({
  rows = 6,
  cols = 12,
  className = "",
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cells = el.querySelectorAll<HTMLSpanElement>(`.${styles.gridCell}`);
    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      // randomly cycle ~10% of cells each tick
      for (let i = 0; i < cells.length; i++) {
        if (Math.random() < 0.08) {
          cells[i].textContent = String(Math.floor(Math.random() * 10));
        }
      }
    };
    const interval = window.setInterval(tick, 220);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [rows, cols]);

  return (
    <div
      ref={ref}
      className={`${styles.digitGrid} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className={styles.gridCell}>
          {Math.floor(Math.random() * 10)}
        </span>
      ))}
    </div>
  );
}
