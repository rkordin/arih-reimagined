// Download all assets from locomotive.ca/en to public/
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';

const ROOT = new URL('..', import.meta.url).pathname;
const PUBLIC = join(ROOT, 'public');

const assets = [
  // Fonts
  { url: 'https://locomotive.ca/assets/fonts/HelveticaNowDisplay-Regular.woff2', out: 'fonts/HelveticaNowDisplay-Regular.woff2' },
  { url: 'https://locomotive.ca/assets/fonts/HelveticaNowDisplay-Regular.woff', out: 'fonts/HelveticaNowDisplay-Regular.woff' },
  { url: 'https://locomotive.ca/assets/fonts/PPLocomotiveNew-Light.woff2', out: 'fonts/PPLocomotiveNew-Light.woff2' },
  { url: 'https://locomotive.ca/assets/fonts/PPLocomotiveNew-Light.woff', out: 'fonts/PPLocomotiveNew-Light.woff' },

  // Favicons / SEO
  { url: 'https://locomotive.ca/assets/images/favicons/apple-touch-icon.png', out: 'seo/apple-touch-icon.png' },
  { url: 'https://locomotive.ca/assets/images/favicons/favicon-32x32.png', out: 'seo/favicon-32x32.png' },
  { url: 'https://locomotive.ca/assets/images/favicons/favicon-16x16.png', out: 'seo/favicon-16x16.png' },
  { url: 'https://locomotive.ca/assets/images/favicons/safari-pinned-tab.svg', out: 'seo/safari-pinned-tab.svg' },
  { url: 'https://locomotive.ca/uploads/metadata/Open_Graph_Loco_%281%29.png', out: 'seo/og-image.png' },

  // Hero
  { url: 'https://locomotive.ca/uploads/home/poster_desktop.png', out: 'hero/poster.png' },
  // Hero video (large — try, but ok if 403/blocked)
  { url: 'https://player.vimeo.com/progressive_redirect/playback/792718372/rendition/1080p/file.mp4?loc=external&log_user=0&signature=978abf9e4b33e3e143901fbcbf68e159d90d5eeb95ed25f8378d341514009cf8', out: 'hero/hero.mp4', optional: true },

  // Featured project thumbnails (300w)
  { url: 'https://locomotive.ca/uploads/projects/Theory_verse/Theory_verse_logo-300w.jpg', out: 'projects/theory-verse.jpg' },
  { url: 'https://locomotive.ca/uploads/projects/Scout_motors/scout_thumbnail-300w.jpg', out: 'projects/scout-motors.jpg' },
  { url: 'https://locomotive.ca/uploads/projects/Populous/image_51-300w.jpg', out: 'projects/populous.jpg' },
  { url: 'https://locomotive.ca/uploads/projects/Mate_Libre/mate-intro-300w.jpg', out: 'projects/mate-libre.jpg' },
  { url: 'https://locomotive.ca/uploads/projects/Destigmatize/slider3-300w.jpg', out: 'projects/destigmatize.jpg' },

  // Store
  { url: 'https://locomotive.ca/assets/images/temp/pros-de-linternet-white-t-shirt.jpg', out: 'store/tshirt.jpg' },
  { url: 'https://locomotive.ca/assets/images/temp/pros-de-linternet-sand-cap.jpg', out: 'store/hat.jpg' },
];

async function download({ url, out, optional }) {
  const target = join(PUBLIC, out);
  if (existsSync(target)) return { url, out, skipped: true };
  await mkdir(dirname(target), { recursive: true });
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (clone)' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(target, buf);
    return { url, out, size: buf.length };
  } catch (err) {
    return { url, out, error: err.message, optional };
  }
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
        console.log(`${r.optional ? '⚠ (optional)' : '✗'} ${r.out}: ${r.error}`);
      } else if (r.skipped) {
        console.log(`= ${r.out} (already exists)`);
      } else {
        console.log(`✓ ${r.out} (${(r.size / 1024).toFixed(1)} KB)`);
      }
    }
  }
  const failures = results.filter(r => r.error && !r.optional);
  if (failures.length) {
    console.error(`\n${failures.length} required asset(s) failed.`);
    process.exit(1);
  }
  console.log(`\nDone: ${results.length} assets processed.`);
}

run();
