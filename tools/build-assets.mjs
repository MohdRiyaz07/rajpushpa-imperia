import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("..");
const OUT = path.join(ROOT, "public", "assets");

const dirs = [
  "hero", "architecture", "amenities", "master-plan",
  "floor-plans", "location", "offers", "pricing", "gallery", "brand",
];
for (const d of dirs) fs.mkdirSync(path.join(OUT, d), { recursive: true });

async function webp(srcRel, dest, opts = {}) {
  const { width, quality = 82, lossless = false } = opts;
  const src = path.join(ROOT, "work", srcRel);
  let pipeline = sharp(src);
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  await pipeline.webp({ quality, lossless }).toFile(path.join(OUT, dest));
  console.log("wrote", dest);
}

// Hero renders (from brochure embedded images)
await webp("images/p03-0-2380x1684.png", "hero/hero-towers.webp", { width: 2200, quality: 84 });
await webp("images/p02-1-1307x885.png", "hero/hero-facade.webp", { width: 1600, quality: 84 });

// Architecture / lifestyle
await webp("images/p08-0-1129x1385.png", "architecture/promenade.webp", { width: 1400 });
await webp("images/p04-0-2381x1684.png", "architecture/yoga-lawn.webp", { width: 2000 });
await webp("images/p02-0-1489x1053.png", "architecture/sky-towers.webp", { width: 1400 });

// Amenities
await webp("images/p05-1-902x1163.png", "amenities/pool-float.webp", { width: 1100 });
await webp("images/p05-0-743x1163.png", "amenities/pool-water.webp", { width: 900 });
await webp("images/p06-0-1463x1684.png", "amenities/clubhouse-lobby.webp", { width: 1400 });

// Master plan (keep detail, lossless-ish)
await webp("images/p07-0-1616x1266.png", "master-plan/master-plan.webp", { width: 1616, quality: 92 });

// Floor plans: keep native resolution, high quality
const plans = [
  ["p09-0-1252x2137", "aster-eden-centre-balcony"],
  ["p10-0-1225x2094", "aster-eden-sundeck"],
  ["p11-0-2059x1310", "blossom-falcon-centre-balcony"],
  ["p12-0-2018x1302", "blossom-falcon-sundeck"],
  ["p13-0-2005x1305", "casper-grace-centre-balcony"],
  ["p14-0-2086x1363", "casper-grace-sundeck"],
  ["p15-0-1304x2235", "daisy-hazel-centre-balcony"],
  ["p16-0-1248x2065", "daisy-hazel-sundeck"],
];
for (const [file, name] of plans) {
  await webp(`images/${file}.png`, `floor-plans/${name}.webp`, { quality: 92 });
}

// Location map (180dpi page render)
await webp("brochure-hi/page-18.png", "location/location-map.webp", { width: 2400, quality: 88 });

// Offer + price sheet source documents
await webp("inputs/offer.png", "offers/offer.webp", { width: 1400, quality: 88 });
await webp("inputs/pricesheet.png", "pricing/price-sheet.webp", { width: 1300, quality: 88 });

// Gallery (distinct project imagery, varied crops)
// NOTE: each entry must come from a DIFFERENT source render — the app's gallery
// shows these side by side, so two entries must never share a source image.
await webp("images/p02-1-1307x885.png", "gallery/g-facade.webp", { width: 1200, quality: 80 });
await webp("images/p08-0-1129x1385.png", "gallery/g-promenade.webp", { width: 1000, quality: 80 });
await webp("images/p05-1-902x1163.png", "gallery/g-pool.webp", { width: 900, quality: 80 });
await webp("images/p02-0-1489x1053.png", "gallery/g-sky.webp", { width: 1200, quality: 80 });

// Brand: crop wordmark from price-sheet header (green panel is rows 0-176 of
// this crop; rows 177+ are the orange rule and white paper — excluded so the
// keyed variants below have no solid band under the letters)
const headerCrop = await sharp(path.join(ROOT, "work", "inputs/pricesheet.png"))
  .extract({ left: 545, top: 15, width: 505, height: 177 })
  .png()
  .toBuffer();
await sharp(headerCrop).webp({ quality: 92 }).toFile(path.join(OUT, "brand/imperia-wordmark.webp"));
console.log("wrote brand/imperia-wordmark.webp");

// sample background color of the wordmark crop for header/footer theming
const { dominant } = await sharp(headerCrop).stats().then((s) => ({ dominant: s.dominant }));
console.log("wordmark dominant color:", dominant);

console.log("done");
