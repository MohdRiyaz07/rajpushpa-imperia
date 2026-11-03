import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { galleryItems } from "../data/gallery";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { Reveal, Section, SectionHead } from "./ui";

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const items: LightboxItem[] = galleryItems.map((item) => ({
    src: item.src,
    alt: item.alt,
    caption: `${item.caption} · ${item.tag}`,
  }));

  const scrollCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const slide = carousel.querySelector<HTMLElement>("[data-gallery-slide]");
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 16;
    carousel.scrollBy({
      left: direction * ((slide?.offsetWidth ?? carousel.clientWidth) + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <Section id="gallery" tone="white" className="scroll-mt-20 py-16 md:py-20">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHead
            eyebrow="Gallery"
            title="A closer look at Imperia."
            lede="Swipe through renders and brochure imagery. Select an image to view it larger."
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollCarousel(-1)}
              aria-label="Show previous gallery image"
              className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 text-forest-dark transition hover:border-forest hover:bg-ivory"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(1)}
              aria-label="Show next gallery image"
              className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 text-forest-dark transition hover:border-forest hover:bg-ivory"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          id="gallery-carousel"
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4"
          aria-label="Project image carousel"
        >
          {galleryItems.map((item, itemIndex) => (
            <Reveal
              key={item.src}
              className="min-w-[88%] snap-start sm:min-w-[47%] lg:min-w-[32%]"
            >
              <button
                type="button"
                data-gallery-slide
                onClick={() => setIndex(itemIndex)}
                className="group relative block h-[17rem] w-full overflow-hidden rounded-2xl ring-1 ring-charcoal/8 sm:h-[21rem]"
                aria-label={`View ${item.caption}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(52,17,23,0)_35%,rgba(52,17,23,0.78)_100%)]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-left">
                  <span>
                    <span className="block text-[0.68rem] uppercase tracking-[0.14em] text-ivory/90">
                      {item.tag}
                    </span>
                    <span className="mt-1 block text-[0.86rem] font-medium leading-snug text-ivory">
                      {item.caption}
                    </span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ivory/35 text-ivory opacity-100 backdrop-blur transition sm:opacity-0 sm:group-hover:opacity-100">
                    <Maximize2 size={15} />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

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
