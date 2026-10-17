/**
 * Location — the brochure's "Location Map (Not to Scale)" page.
 *
 * Only the place names printed on that map are listed. The map carries three
 * distance labels (8 KMS against the Outer Ring Road, 2 Km near Samsthi
 * International School, 9 Km near the Nehru Express Highway) but does not tie
 * them to a stated origin, so they are reported exactly as annotated and never
 * turned into "X minutes from the project" claims.
 */

export const location = {
  eyebrow: "Location",
  title: "At Financial District, Tellapur.",
  lede:
    "Rajapushpa Imperia sits inside Rajapushpa Lifestyle City at Tellapur — the address printed on both the brochure cover and the supplied offer. The brochure's own location map places it among the Outer Ring Road, Gachibowli and the Financial District spine.",
  address: [
    "Rajapushpa Lifestyle City, Tellapur",
    "Financial District corridor, Hyderabad, Telangana",
  ],
  addressNote:
    "The brochure cover reads “At Financial District, Tellapur”; the offer reads “@ Rajapushpa LIFE STYLE CITY, TELLAPUR”.",
  mapImage: "/assets/location/location-map.webp",
  mapImageAlt:
    "Location map from the Rajapushpa Imperia brochure showing the project relative to the Outer Ring Road, Gachibowli Circle, Mindspace Circle and the Financial District",
  mapIsNotToScale: true,
  distanceLabels: [
    { label: "Outer Ring Road", value: "8 KMS" },
    { label: "Nehru Express Highway", value: "9 Km" },
    { label: "Samsthi International School", value: "2 Km" },
  ],
  distanceNote:
    "Distances are read off the brochure's location map, which is marked “Not to Scale” and does not state the origin point for each figure. Treat them as annotations, not verified travel distances — confirm with the sales team.",
  landmarks: [
    { name: "Outer Ring Road", group: "Roads & Arteries" },
    { name: "Nehru Express Highway", group: "Roads & Arteries" },
    { name: "Old Bombay Highway", group: "Roads & Arteries" },
    { name: "Puppalaguda Circle — Exit No. 2", group: "Roads & Arteries" },
    { name: "Gachibowli Circle", group: "Roads & Arteries" },
    { name: "Gopanpally Circle", group: "Roads & Arteries" },
    { name: "Mindspace Circle", group: "Business districts" },
    { name: "DLF Circle", group: "Business districts" },
    { name: "Wipro Circle", group: "Business districts" },
    { name: "Bio-Diversity Circle", group: "Business districts" },
    { name: "Q-City", group: "Business districts" },
    { name: "IKEA", group: "Business districts" },
    { name: "Hitec City to Jubilee Hills", group: "Business districts" },
    { name: "Varun Motors", group: "Neighbourhood" },
    { name: "Hayatt Hotel", group: "Neighbourhood" },
    { name: "Aliens Space Station", group: "Neighbourhood" },
    { name: "Indus Crest", group: "Neighbourhood" },
    { name: "Sankalp Homes", group: "Neighbourhood" },
    { name: "Ozone Heights", group: "Neighbourhood" },
    { name: "Manthri Celestia", group: "Neighbourhood" },
    { name: "Vajram", group: "Neighbourhood" },
    { name: "Aster Homes", group: "Neighbourhood" },
    { name: "Pristine Homes", group: "Neighbourhood" },
    { name: "Tuderken Homes", group: "Neighbourhood" },
    { name: "Mayfair Villas", group: "Neighbourhood" },
    { name: "Lake", group: "Neighbourhood" },
    { name: "Samsthi International School", group: "Schools" },
    { name: "Open Minds Birla School", group: "Schools" },
    { name: "International School", group: "Schools" },
  ],
};

export const landmarkGroups = ["Roads & Arteries", "Business districts", "Schools", "Neighbourhood"];
