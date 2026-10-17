import { useMemo, useState } from "react";
import { Maximize2 } from "lucide-react";
import { galleryItems } from "../data/gallery";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { Reveal, Section, SectionHead } from "./ui";

const tags = ["All", ...Array.from(new Set(galleryItems.map((g) => g.tag)))];

/**
 * Gallery — brochure imagery in a masonry-ish grid with a filtered lightbox.
 * Every image is authentic and extracted from the supplied PDF.
 */
export default function Gallery() {
  const [tag, setTag] = useState("All");
  const [index, setIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (tag === "All" ? galleryItems : galleryItems.filter((g) => g.tag === tag)),
    [tag]
  );

  const items: LightboxItem[] = visible.map((g) => ({
    src: g.src,
    alt: g.alt,
    caption: `${g.caption} · ${g.tag}`,
  }));

  return (
    <Section id="gallery" tone="white" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="Gallery"
            title="Renders from the brochure."
            lede="Every image here is authentic brochure artwork extracted from the supplied PDF — no stock photography, no third-party project imagery."
          />

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTag(t);
                    setIndex(null);
                  }}
                  aria-pressed={tag === t}
                  className={`rounded-full border px-4 py-1.5 text-[0.8rem] font-medium transition ${
                    tag === t
                      ? "border-forest bg-forest text-ivory"
                      : "border-charcoal/15 text-charcoal/70 hover:border-forest/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {visible.map((item, i) => (
            <Reveal
              key={item.src}
              delay={0.04 * i}
              className={item.wide ? "col-span-2" : item.tall ? "row-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl ring-1 ring-charcoal/8"
                aria-label={`View ${item.caption}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,43,34,0)_35%,rgba(11,43,34,0.78)_100%)]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-left">
                  <span>
                    <span className="block text-[0.68rem] uppercase tracking-[0.14em] text-ivory/65">
                      {item.tag}
                    </span>
                    <span className="mt-1 block text-[0.86rem] font-medium leading-snug text-ivory">
                      {item.caption}
                    </span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ivory/35 text-ivory opacity-0 backdrop-blur transition group-hover:opacity-100">
                    <Maximize2 size={15} />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-[0.8rem] leading-relaxed text-muted">
            Images are architectural renders and artistic representations from the brochure,
            not photographs of completed construction.
          </p>
        </Reveal>
      </div>

      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
        label="Project gallery"
      />
    </Section>
  );
}
