import fs from "node:fs";
import path from "node:path";
import * as mupdf from "mupdf";

const PDF = process.argv[2];
const OUT = process.argv[3];
fs.mkdirSync(OUT, { recursive: true });

const doc = mupdf.Document.openDocument(PDF, "application/pdf");
const pdf = doc.asPDF();
const count = doc.countPages();
const manifest = [];

for (let i = 0; i < count; i++) {
  const page = pdf.loadPage(i);
  const obj = page.getObject();
  const res = obj.getInheritable("Resources");
  const xobj = res ? res.get("XObject") : null;
  if (!xobj) { page.destroy(); continue; }
  let idx = 0;
  xobj.forEach((val, key) => {
    try {
      const r = val.resolve();
      const sub = r.get("Subtype");
      if (!sub || String(sub.toString()).replace(/^\//, "") !== "Image") return;
      const img = pdf.loadImage(val);
      const w = img.getWidth();
      const h = img.getHeight();
      if (w < 400 || h < 400) { img.destroy(); return; }
      const pix = img.toPixmap(mupdf.Matrix.identity, mupdf.ColorSpace.DeviceRGB, false);
      const name = `p${String(i + 1).padStart(2, "0")}-${idx++}-${w}x${h}.png`;
      fs.writeFileSync(path.join(OUT, name), pix.asPNG());
      manifest.push({ page: i + 1, key: String(key), name, w, h });
      pix.destroy();
      img.destroy();
    } catch (e) {
      console.error("skip", i + 1, String(key), e.message);
    }
  });
  page.destroy();
}
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log("extracted", manifest.length, "images");
doc.destroy();
