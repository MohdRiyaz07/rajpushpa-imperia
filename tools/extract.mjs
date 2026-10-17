import fs from "node:fs";
import path from "node:path";
import * as mupdf from "mupdf";

const PDF = process.argv[2];
const OUT = process.argv[3];
const MODE = process.argv[4] || "pages"; // pages | images | text

fs.mkdirSync(OUT, { recursive: true });

const doc = mupdf.Document.openDocument(PDF, "application/pdf");
const count = doc.countPages();

if (MODE === "text") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const page = doc.loadPage(i);
    const text = page.toStructuredText().asText();
    parts.push(`\n===== PAGE ${i + 1} =====\n${text}`);
  }
  fs.writeFileSync(path.join(OUT, "brochure-text.txt"), parts.join("\n"));
  console.log("text written", count, "pages");
} else if (MODE === "pages") {
  const scale = Number(process.argv[5] || 110) / 72;
  for (let i = 0; i < count; i++) {
    const page = doc.loadPage(i);
    const pix = page.toPixmap(
      mupdf.Matrix.scale(scale, scale),
      mupdf.ColorSpace.DeviceRGB,
      false,
      true
    );
    const png = pix.asPNG();
    fs.writeFileSync(path.join(OUT, `page-${String(i + 1).padStart(2, "0")}.png`), png);
    pix.destroy();
    page.destroy();
    console.log("rendered page", i + 1);
  }
} else if (MODE === "images") {
  // Extract embedded images at native resolution via resource lookup
  for (let i = 0; i < count; i++) {
    const page = doc.loadPage(i);
    const imgs = page.getImages({}); // may not exist in all versions
    console.log("page", i + 1, JSON.stringify(imgs));
    page.destroy();
  }
}
doc.destroy();
