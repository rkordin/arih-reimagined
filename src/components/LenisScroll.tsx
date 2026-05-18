"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let lastScrollY = 0;
    const html = document.documentElement;

    function onScroll() {
      const y = window.scrollY;
      // direction state
      if (y > lastScrollY) {
        html.classList.add("is-scrolling-down");
        html.classList.remove("is-scrolling-up");
      } else if (y < lastScrollY) {
        html.classList.add("is-scrolling-up");
        html.classList.remove("is-scrolling-down");
      }
      // top state
      if (y < 10) html.classList.add("is-top");
      else html.classList.remove("is-top");
      lastScrollY = y;
    }

    lenis.on("scroll", onScroll);

    // observe the hero — toggle is-over-home-hero. If no hero on this page,
    // make sure the class is cleared (it might have been left over from a
    // prior client-side navigation, since route changes don't re-render
    // <html> classes).
    const hero =
      document.querySelector(".c-home-hero") || document.querySelector("[data-home-hero]");
    let io: IntersectionObserver | null = null;
    if (hero) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
            html.classList.add("is-over-home-hero");
          } else {
            html.classList.remove("is-over-home-hero");
          }
        },
        { threshold: [0, 0.05, 0.5, 1] }
      );
      io.observe(hero);
    } else {
      html.classList.remove("is-over-home-hero");
    }

    // inview observer — adds .is-inview to any [data-scroll] element when it enters
    const inviewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll("[data-scroll]").forEach((el) => inviewObserver.observe(el));

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    html.classList.add("is-loaded", "is-ready");

    return () => {
      lenis.destroy();
      io?.disconnect();
      inviewObserver.disconnect();
      html.classList.remove("is-over-home-hero");
    };
  }, []);

  return null;
}
