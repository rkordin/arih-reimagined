"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../app/kontakt/kontakt.module.css";

const ADDRESS_LINE_1 = "Celovška cesta 32";
const ADDRESS_LINE_2 = "1000 Ljubljana, Slovenia";
const ADDRESS_QUERY = "Celovška cesta 32, 1000 Ljubljana, Slovenia";
const COORDS = { lat: 46.0664, lng: 14.4986 };

const MAP_STYLE = [
  { featureType: "all", elementType: "labels", stylers: [{ visibility: "on" }] },
  { featureType: "all", elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 40 }] },
  { featureType: "all", elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 16 }] },
  { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#000000" }, { lightness: 20 }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#c4c4c4" }] },
  { featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{ color: "#707070" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 20 }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 21 }, { visibility: "on" }] },
  { featureType: "poi.business", elementType: "geometry", stylers: [{ visibility: "on" }] },
  { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#be2026" }, { lightness: "0" }, { visibility: "on" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ visibility: "off" }] },
  { featureType: "road.highway", elementType: "labels.text.stroke", stylers: [{ visibility: "off" }, { hue: "#ff000a" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 18 }] },
  { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ color: "#575757" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "labels.text.stroke", stylers: [{ color: "#2c2c2c" }] },
  { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 16 }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#999999" }] },
  { featureType: "road.local", elementType: "labels.text.stroke", stylers: [{ saturation: "-52" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 19 }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 17 }] },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
type GMaps = any;

declare global {
  interface Window {
    google?: { maps: GMaps };
    __gmapsLoader?: Promise<GMaps>;
  }
}

const loadGoogleMaps = (apiKey: string): Promise<GMaps> => {
  if (typeof window === "undefined") return Promise.reject(new Error("no-window"));
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  if (window.__gmapsLoader) return window.__gmapsLoader;
  window.__gmapsLoader = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=quarterly&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.maps) resolve(window.google.maps);
      else reject(new Error("gmaps-no-global"));
    };
    script.onerror = () => reject(new Error("gmaps-load-failed"));
    document.head.appendChild(script);
  });
  return window.__gmapsLoader;
};

type Status = "loading" | "ready" | "missing-key" | "error";

export function Map() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`;

  useEffect(() => {
    if (!apiKey) {
      setStatus("missing-key");
      return;
    }
    let cancelled = false;
    loadGoogleMaps(apiKey)
      .then((maps) => {
        if (cancelled || !canvasRef.current) return;
        const map = new maps.Map(canvasRef.current, {
          center: COORDS,
          zoom: 15,
          styles: MAP_STYLE,
          backgroundColor: "#000000",
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: "cooperative",
          clickableIcons: false,
        });
        new maps.Marker({
          position: COORDS,
          map,
          title: "Agencija Arih — Celovška 32",
          icon: {
            path: "M 0,-28 C -10,-28 -16,-20 -16,-12 C -16,-2 0,14 0,14 C 0,14 16,-2 16,-12 C 16,-20 10,-28 0,-28 Z M 0,-17 a 5,5 0 1 1 0,10 a 5,5 0 1 1 0,-10",
            fillColor: "#be2026",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 1.1,
            anchor: new maps.Point(0, 14),
          },
        });
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  return (
    <section className={styles.map} aria-label="Lokacija Agencija Arih na zemljevidu">
      <div ref={canvasRef} className={styles.mapCanvas} />

      {status !== "ready" && (
        <div className={styles.mapFallback} role="status">
          {status === "loading" && <span>Loading map…</span>}
          {status === "missing-key" && (
            <>
              <span>Map unavailable.</span>
              <a href={directionsUrl} target="_blank" rel="noreferrer">
                Open in Google Maps →
              </a>
            </>
          )}
          {status === "error" && (
            <>
              <span>Map failed to load.</span>
              <a href={directionsUrl} target="_blank" rel="noreferrer">
                Open in Google Maps →
              </a>
            </>
          )}
        </div>
      )}

      <div className={styles.mapOverlay}>
        <span className={styles.label}>05 — Visit</span>
        <h3 className={styles.mapAddress}>
          {ADDRESS_LINE_1}
          <br />
          {ADDRESS_LINE_2}
        </h3>
        <a
          className={styles.mapCta}
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Get directions →
        </a>
      </div>
    </section>
  );
}
