"use client";

import { useRef, useEffect } from "react";

/**
 * Wraps text in a span that shuffles its characters on hover, mimicking
 * locomotive.ca's `data-hover-shuffle` behavior.
 */
export function HoverShuffle({
  text,
  className,
  duration = 350,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const originalRef = useRef(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const original = originalRef.current;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*?/0123456789";
    let frame = 0;
    let interval: number | null = null;

    function shuffle() {
      if (interval) return;
      const start = performance.now();
      interval = window.setInterval(() => {
        const elapsed = performance.now() - start;
        const progress = Math.min(1, elapsed / duration);
        const settled = Math.floor(progress * original.length);
        let out = "";
        for (let i = 0; i < original.length; i++) {
          if (i < settled || original[i] === " ") {
            out += original[i];
          } else {
            out += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        if (el) el.textContent = out;
        if (progress >= 1) {
          if (el) el.textContent = original;
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
        }
        frame++;
      }, 30) as unknown as number;
    }

    function stop() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      if (el) el.textContent = original;
    }

    const parent = el.parentElement;
    parent?.addEventListener("mouseenter", shuffle);
    parent?.addEventListener("mouseleave", stop);
    parent?.addEventListener("focusin", shuffle);
    parent?.addEventListener("focusout", stop);

    return () => {
      parent?.removeEventListener("mouseenter", shuffle);
      parent?.removeEventListener("mouseleave", stop);
      parent?.removeEventListener("focusin", shuffle);
      parent?.removeEventListener("focusout", stop);
      if (interval) clearInterval(interval);
    };
  }, [duration]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
