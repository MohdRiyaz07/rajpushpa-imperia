import * as mupdf from "mupdf";

const PDF = process.argv[2];
const pages = (process.argv[3] || "9,10,11,12,13,14,15,16").split(",").map(Number);

const doc = mupdf.Document.openDocument(PDF, "application/pdf");
const pdf = doc.asPDF();

for (const pno of pages) {
  const page = pdf.loadPage(pno - 1);
  const st = page.toStructuredText();
  const json = JSON.parse(st.asJSON());
  // Collect lines: {text, bbox}
  const lines = [];
  for (const block of json.blocks || []) {
    for (const line of block.lines || []) {
      if (!line.text) continue;
      lines.push({ text: line.text, bbox: [line.bbox.x, line.bbox.y, line.bbox.x + line.bbox.w, line.bbox.y + line.bbox.h] });
    }
  }
  console.log(`\n===== PAGE ${pno} (${lines.length} lines) =====`);
  lines
    .sort((a, b) => (a.bbox[1] - b.bbox[1]) || (a.bbox[0] - b.bbox[0]))
    .forEach((l) => {
      console.log(
        `y=${l.bbox[1].toFixed(0).padStart(5)} x=${l.bbox[0].toFixed(0).padStart(5)}..${l.bbox[2].toFixed(0).padStart(5)}  ${l.text}`
      );
    });
}
doc.destroy();
