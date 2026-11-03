/**
 * Gallery — authentic imagery extracted from the supplied brochure PDF and
 * re-encoded to WebP by tools/build-assets.mjs. Captions describe only what is
 * visible in the render; they add no claims beyond the brochure.
 */

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  tag: string;
  /** Wider tiles in the masonry grid. */
  tall?: boolean;
  wide?: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    src: "/assets/gallery/construction-progress.jpg",
    alt: "Aerial photograph showing Rajapushpa Imperia towers during construction",
    caption: "Construction progress",
    tag: "Construction",
  },
  {
    src: "/assets/gallery/clubhouse-day.jpg",
    alt: "Daytime architectural render of the clubhouse exterior at Rajapushpa Imperia",
    caption: "Clubhouse exterior",
    tag: "Clubhouse",
  },
  {
    src: "/assets/gallery/clubhouse-evening.jpg",
    alt: "Evening architectural render of the clubhouse exterior at Rajapushpa Imperia",
    caption: "Clubhouse at dusk",
    tag: "Clubhouse",
  },
  {
    src: "/assets/hero/hero-towers.webp",
    alt: "Architectural render of the Rajapushpa Imperia residential towers at dusk",
    caption: "The towers, as rendered in the brochure",
    tag: "Architecture",
    wide: true,
  },
  {
    src: "/assets/gallery/g-pool.webp",
    alt: "Swimming pool with deck, brochure render",
    caption: "Swimming pool with deck",
    tag: "Amenities",
  },
  {
    src: "/assets/gallery/g-promenade.webp",
    alt: "Tree-lined promenade with families walking, brochure render",
    caption: "Podium promenade",
    tag: "Landscape",
  },
  {
    src: "/assets/gallery/g-sky.webp",
    alt: "Residential towers against a clouded sky, brochure render",
    caption: "Towers against the skyline",
    tag: "Architecture",
  },
  {
    src: "/assets/gallery/g-facade.webp",
    alt: "Close view of the tower facade, brochure render",
    caption: "Facade detail",
    tag: "Architecture",
  },
  {
    src: "/assets/amenities/pool-water.webp",
    alt: "Ripples across the swimming pool water, brochure image",
    caption: "Pool water",
    tag: "Amenities",
  },
  {
    src: "/assets/amenities/clubhouse-lobby.webp",
    alt: "Clubhouse lobby interior with seating, brochure image",
    caption: "Clubhouse lounge",
    tag: "Clubhouse",
    tall: true,
  },
  {
    src: "/assets/architecture/yoga-lawn.webp",
    alt: "Resident on a yoga mat on the landscaped lawn, brochure image",
    caption: "Outdoor yoga deck",
    tag: "Amenities",
  },
  {
    src: "/assets/master-plan/master-plan.webp",
    alt: "Master plan of the 24-acre site showing eight towers around a landscaped core",
    caption: "Master plan",
    tag: "Master plan",
    wide: true,
  },
];
