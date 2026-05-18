"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS, CATEGORIES, type Project } from "@/content/projects";
import styles from "./AteljePlayground.module.css";

type Placement = {
  x: number; // 0-1 of canvas width
  y: number; // 0-1 of canvas height
  rot: number; // degrees
  scale: number;
  z: number;
};

const SEEDED_RANDOM = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const layoutPlacements = (n: number, seed: number): Placement[] => {
  const rnd = SEEDED_RANDOM(seed);
  return Array.from({ length: n }, (_, i) => ({
    x: 0.04 + rnd() * 0.88,
    y: 0.06 + rnd() * 0.84,
    rot: (rnd() - 0.5) * 24,
    scale: 0.82 + rnd() * 0.45,
    z: i,
  }));
};

export function AteljePlayground() {
  const items = useMemo(
    () => PROJECTS.filter((p) => p.cover && /^https?:\/\//.test(p.cover)),
    []
  );
  const [seed, setSeed] = useState(1);
  const [placements, setPlacements] = useState<Placement[]>(() =>
    layoutPlacements(items.length, 1)
  );
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [topZ, setTopZ] = useState(items.length);
  const [filter, setFilter] = useState<"all" | Project["category"]>("all");
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const shuffle = () => {
    const newSeed = Math.floor(Math.random() * 100000);
    setSeed(newSeed);
    setPlacements(layoutPlacements(items.length, newSeed));
  };

  const reset = () => {
    setSeed(1);
    setPlacements(layoutPlacements(items.length, 1));
  };

  const sortGrid = () => {
    // 6-column grid layout (skip random scatter)
    const cols = 6;
    setPlacements(
      items.map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return {
          x: 0.06 + (col / (cols - 1)) * 0.88,
          y: 0.08 + row * 0.12,
          rot: 0,
          scale: 1,
          z: i,
        };
      })
    );
  };

  // Drag handling
  const dragState = useRef<{ idx: number; offX: number; offY: number } | null>(null);

  const onPointerDown = (idx: number, e: React.PointerEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    const rect = canvasRef.current!.getBoundingClientRect();
    dragState.current = {
      idx,
      offX: e.clientX - (placements[idx].x * rect.width + rect.left),
      offY: e.clientY - (placements[idx].y * rect.height + rect.top),
    };
    const newZ = topZ + 1;
    setTopZ(newZ);
    setPlacements((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, z: newZ } : p))
    );
    setActiveIdx(idx);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const { idx, offX, offY } = dragState.current;
    const newX = (e.clientX - rect.left - offX) / rect.width;
    const newY = (e.clientY - rect.top - offY) / rect.height;
    setPlacements((prev) =>
      prev.map((p, i) =>
        i === idx
          ? {
              ...p,
              x: Math.max(-0.05, Math.min(0.95, newX)),
              y: Math.max(-0.05, Math.min(0.95, newY)),
            }
          : p
      )
    );
  };

  const onPointerUp = () => {
    dragState.current = null;
  };

  // Subtle parallax based on mouse position. Skip entirely on touch /
  // small screens — the canvas becomes a grid there and parallax has
  // no visual effect, but the listener would still cause re-renders.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (min-width: 700px)").matches) return;
    const onMove = (e: PointerEvent) => {
      if (dragState.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      setParallax({
        x: (e.clientX / w - 0.5) * 12,
        y: (e.clientY / h - 0.5) * 12,
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className={styles.shell}>
      {/* Huge locomotive type behind everything */}
      <div className={styles.bgType} aria-hidden="true">
        <span>ATELJE</span>
        <span>ATELJE</span>
        <span>ATELJE</span>
      </div>

      {/* Floating intro card */}
      <div className={styles.introCard}>
        <span className={styles.smallLabel}>Atelje · 78 projektov</span>
        <h1 className={styles.title}>
          <span>Vsa dela.</span>
          <span>Brez reda.</span>
        </h1>
        <p className={styles.intro}>
          Premikajte. Premešajte. Razporedite v mrežo. Kliknite, kar vas pritegne —
          to je delovni atelje, ne galerija.
        </p>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.toolBtn}
          onClick={shuffle}
          aria-label="Premešaj"
        >
          <span aria-hidden="true">⇆</span>&nbsp; Premešaj
        </button>
        <button
          type="button"
          className={styles.toolBtn}
          onClick={sortGrid}
          aria-label="Razporedi v mrežo"
        >
          <span aria-hidden="true">▦</span>&nbsp; V mrežo
        </button>
        <button
          type="button"
          className={styles.toolBtn}
          onClick={reset}
          aria-label="Razpostavi nazaj"
        >
          <span aria-hidden="true">↻</span>&nbsp; Razpostavi
        </button>

        <div className={styles.filterGroup} role="group" aria-label="Filter">
          {(["all", "cgp", "embalaza", "akcije", "publikacije", "priznanja", "druzbeno"] as const).map(
            (f) => (
              <button
                key={f}
                type="button"
                className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "Vse" : CATEGORIES[f].short}
              </button>
            )
          )}
        </div>
      </div>

      <div
        ref={canvasRef}
        className={styles.canvas}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {items.map((p, i) => {
          const place = placements[i];
          if (!place) return null;
          const dimmed = filter !== "all" && p.category !== filter;
          const isActive = activeIdx === i;
          const slug = p.href.split("/").pop() || p.slug;
          const cleanHref = `/${p.category}/${slug}`;

          return (
            <div
              key={p.slug + "-" + p.date}
              className={`${styles.card} ${dimmed ? styles.dimmed : ""} ${isActive ? styles.active : ""}`}
              style={{
                left: `${place.x * 100}%`,
                top: `${place.y * 100}%`,
                transform: `translate(${parallax.x * (place.scale - 0.9)}px, ${parallax.y * (place.scale - 0.9)}px) rotate(${place.rot}deg) scale(${place.scale})`,
                zIndex: place.z,
              }}
              onPointerDown={(e) => onPointerDown(i, e)}
              onClick={(e) => {
                // Allow click → navigate only if not dragged significantly
                if (dragState.current === null) {
                  // navigate via native anchor child
                } else {
                  e.preventDefault();
                }
              }}
            >
              <a
                href={cleanHref}
                className={styles.cardLink}
                draggable={false}
                onClick={(e) => {
                  // Prevent navigation on accidental drag-click
                  if (Math.abs(parallax.x) > 200) e.preventDefault();
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.cover ?? ""}
                  alt={p.title}
                  loading={i < 8 ? "eager" : "lazy"}
                  draggable={false}
                />
                <div className={styles.cardLabel}>
                  <span className={styles.cardCat}>{CATEGORIES[p.category].short}</span>
                  <span className={styles.cardTitle}>{p.title}</span>
                  <span className={styles.cardYear}>{p.year}</span>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      <div className={styles.hint}>
        <span>Drag · Click · Shuffle</span>
        <span>{items.length} kosov v ateljeju</span>
      </div>
    </div>
  );
}
