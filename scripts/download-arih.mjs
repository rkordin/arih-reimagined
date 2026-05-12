// Download ARIH project hero images from squarespace CDN to public/arih/
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';

const ROOT = new URL('..', import.meta.url).pathname;
const PUBLIC = join(ROOT, 'public');

// Each asset can specify a fallback URL (used if the primary 404s).
const assets = [
  {
    url: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1610957917413-6T25GWAD78OVH9C1P7W3/modre-fructal.jpg',
    out: 'arih/fructal.jpg',
  },
  {
    // T-2 — user-specified URL first; fall back to greengo-powered-by-t-2 first image
    url: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1577893080720-WBKVMHVMHHVNLM93H3VM/T2_TV.jpg',
    fallback: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1578315580201-7ZZG2FQCGUIDTR9GWWRF/GG_Car.jpg',
    out: 'arih/t2.jpg',
  },
  {
    // Slovenska Filharmonija — first image from cgp-list/2022/5/18/slovenska-filharmonija
    url: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1652867769392-QFUQGSIB7SQCMM6580H6/SF_02.jpg',
    out: 'arih/filharmonija.jpg',
  },
  {
    // Hood Burger — first image from cgp-list/2018/9/5/hood-burger
    url: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1536148255336-CVU5KA51Y8CI0LBDD31M/image-asset.jpeg',
    fallback: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1536148305635-OMG5QNGA36449D1H94DG/HB_05_Poster-Frame-PSD.jpg',
    out: 'arih/hood.jpg',
  },
  {
    // Pipistrel — first image from cgp-list/2018/9/2/pipistrel-vertical-solutions
    url: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1535912743169-Q4D8W1SQZIZPJV74UOGD/wine-bottle-label-mockup-merlot-teran.jpg',
    fallback: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1535913134414-59EBPYUPX20HZNXUOXTM/Pipistrel-podlaga-SF_black.jpg',
    out: 'arih/pipistrel.jpg',
  },
  {
    // Kavarna Zvezda — first image from cgp-list/2024/2/16/kavarna-zvezda
    url: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/13602512-a5cc-4316-bf86-c7c5d66bd7f8/IMG_7127.jpg',
    fallback: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/b0ad255e-d435-4d17-bc39-c05e60e8c8e8/Zvezda_pingvin.jpg',
    out: 'arih/zvezda.jpg',
  },
  {
    // Studio black-and-white photo for About section — from domov entry
    url: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1535885889571-U60F2TO5O9DHDYHYELDC/nazorjeva092016_98.jpg',
    fallback: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1578398963264-KU08R7H31LC9QDW3J4YT/092016_26.jpg',
    out: 'arih/studio.jpg',
  },
  {
    // Igor Arih portrait (Joze_BB_01.jpg from the domov entry)
    url: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/1677682381272-RVHC8WT1XW0ECXCUQIA3/Joze_BB_01.jpg',
    fallback: 'https://images.squarespace-cdn.com/content/v1/5b892d3775f9ee54716f8e5b/c4d24c2b-fc94-4ead-b1cb-3a1f9ed209fe/Joze_BB_01.jpg',
    out: 'arih/founder.jpg',
  },
];

async function tryFetch(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function download({ url, fallback, out }) {
  const target = join(PUBLIC, out);
  if (existsSync(target)) return { url, out, skipped: true };
  await mkdir(dirname(target), { recursive: true });
  let usedFallback = false;
  let buf;
  try {
    buf = await tryFetch(url);
  } catch (err) {
    if (fallback) {
      try {
        buf = await tryFetch(fallback);
        usedFallback = true;
      } catch (err2) {
        return { url, out, error: `primary: ${err.message}; fallback: ${err2.message}` };
      }
    } else {
      return { url, out, error: err.message };
    }
  }
  await writeFile(target, buf);
  return { url: usedFallback ? fallback : url, out, size: buf.length, usedFallback };
}

async function run() {
  const batchSize = 4;
  const results = [];
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(download));
    results.push(...batchResults);
    for (const r of batchResults) {
      if (r.error) {
        console.log(`x ${r.out}: ${r.error}`);
      } else if (r.skipped) {
        console.log(`= ${r.out} (already exists)`);
      } else {
        const tag = r.usedFallback ? ' [fallback]' : '';
        console.log(`+ ${r.out} (${(r.size / 1024).toFixed(1)} KB)${tag}`);
      }
    }
  }
  const failures = results.filter((r) => r.error);
  if (failures.length) {
    console.error(`\n${failures.length} asset(s) failed.`);
    process.exit(1);
  }
  console.log(`\nDone: ${results.length} assets processed.`);
}

run();
