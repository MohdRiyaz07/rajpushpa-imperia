/**
 * Central project facts.
 *
 * Source of truth: supplied "Rajapushpa Imperia" brochure PDF, promotional offer
 * image and price sheet. Every fact below was read from those materials. Items
 * marked `note: confirmation required` are documented in the README and must be
 * confirmed with the sales team before being relied upon.
 */

export interface Stat {
  value: string;
  label: string;
  note?: string;
}

export const project = {
  name: "Rajapushpa Imperia",
  developer: "Rajapushpa Properties",
  context: "Rajapushpa Lifestyle City",
  locationLine: "Tellapur, Hyderabad, Telangana",
  coverLocationLine: "At Financial District, Tellapur",
  rera: "P01100003723",
  reraLabel: "TS RERA Reg. No.: P01100003723",
  brochureSite: "rajapushpa.in",
  siteOfficeAddress:
    "Sy. No. 447, Osman Nagar, near Rajapushpa Green Dale, Tellapur, Hyderabad, Telangana 502032",
  siteOfficeAddressSource:
    "Address as published on rajapushpa.in contact page — confirm with sales team",
} as const;

/** Headline figures — brochure page 2 "project features". */
export const stats: Stat[] = [
  { value: "24", label: "Acre development", note: "Brochure: “24 Acres”" },
  { value: "8", label: "Residential towers", note: "Brochure: “8 Towers”" },
  { value: "40", label: "Floors", note: "Brochure: “40 Floors”" },
  { value: "82%+", label: "Open space", note: "Brochure: “More than 82% Open Space”" },
];

export const residenceSummary = {
  types: "Premium 2, 2.5 & 3 BHK Homes",
  sizeRange: "1,350 – 2,880 sft",
  sizeRangeNote: "Premium 2, 2.5 & 3 BHK Homes · 1,350 – 2,880 sft",
  highlights: [
    "Premium Lifestyle 2, 2.5 & 3 BHK Apartments",
    "Sundeck Apartments",
    "Exotic Designer Landscapes & Waterscapes",
    "Lavish clubhouse with sporting amenities",
    "2 Swimming Pools with Deck",
  ],
};

export const overview = {
  eyebrow: "The Project",
  title: "A community designed to give you more life per sq.\u00a0ft.",
  intro:
    "Rajapushpa Imperia is a 24-acre development of 8 towers and 40 floors inside Rajapushpa Lifestyle City at Tellapur — where the brochure leaves more than 82% of the ground open, and every home looks onto landscape.",
  body: [
    "At Imperia, the plan puts towers on the edges of the site and gives the centre back to landscape, so homes look onto greenery rather than vehicular movement. Podium-level promenades, a central lawn and a clubhouse form the social core of the community.",
    "Every tower carries a shared vocabulary — an imposing entrance lounge, high-speed elevators, dedicated pick-up and drop-off zones and 100% power backup — as listed in the brochure’s exclusive project features.",
    
  ],
  image: "/assets/architecture/promenade.webp",
  imageAlt:
    "Landscaped podium promenade with families walking, from the Rajapushpa Imperia brochure",
};

export const faqs: { q: string; a: string }[] = [
  {
    q: "Where is Rajapushpa Imperia located?",
    a: "The brochure cover reads “At Financial District, Tellapur”, and the offer material places it “@ Rajapushpa LIFE STYLE CITY, TELLAPUR”. The site office address published by the developer is Sy. No. 447, Osman Nagar, near Rajapushpa Green Dale, Tellapur, Hyderabad, Telangana 502032 — confirm the exact location with the sales team before visiting.",
  },
  {
    q: "What configurations and unit sizes are listed?",
    a: "Premium 2, 2.5 and 3 BHK homes are advertised with sizes from 1,350 to 2,880 sft. Exact tower-wise areas are shown in the Floor Plans section.",
  },
  {
    q: "How many towers and floors does the project have?",
    a: "As stated in the supplied brochure: 24 acres, 8 towers, 40 floors, and more than 82% open space. Tower names listed in the brochure are Aster, Blossom, Casper, Daisy, Eden, Falcon, Grace and Hazel.",
  },
  {
    q: "What amenities are described in the brochure?",
    a: "Two swimming pools with deck, a 1 km jogging and cycling trail, outdoor yoga deck and outdoor gym, basketball, futsal, volleyball, tennis and cricket facilities, skating rink, children’s play areas, a G+4 clubhouse with badminton and squash courts, gym, spa, library, banquet hall, guest suites and more — see the Amenities section for the full grouped list.",
  },
  {
    q: "What phases does the offer mention?",
    a: "The supplied offer material describes two ways to own: Phase-I — OC received, no GST, ready to move-in; Phase-II — pay 50% now and 50% at the time of possession. These are promotional claims reproduced from that material, not independently verified current guarantees. Confirm current applicability with the sales team.",
  },
  {
    q: "What does the cost estimator include?",
    a: "It itemises: base price (phase rate × area), floor-rise charge from the 5th floor, east/north-facing charge, corner charge, view or courtyard-view charge, W.E.G. charge, double back-to-back parking, clubhouse charge and legal & documentation charge — all rates as printed on the supplied price sheet. It excludes GST, stamp duty, registration, corpus fund and maintenance unless the price sheet lists them; those must be confirmed with the sales team.",
  },
  {
    q: "How can I confirm current pricing and availability?",
    a: "Call or email the sales contact printed on the supplied price sheet, or submit the enquiry form on this page. Prices on this page are reproduced from the supplied price sheet and require confirmation — the sheet itself states prices are subject to change without prior notice.",
  },
  {
    q: "Is this the official developer website?",
    a: "No. This is an informational project page built from the supplied brochure, offer and price sheet. It is not the developer’s official website. Project information, pricing, charges, payment terms, offers and availability are subject to confirmation with the developer or authorized sales team.",
  },
];

export const footerDisclaimer =
  "This website is owned and operated by an authorized real estate marketing partner (Agent RERA No: A02500004621). This platform is intended solely for informational purposes to share verified project updates, layout details, and pricing insights regarding Rajapushpa Imperia. It does not constitute an official offer, allotment, or binding contract to purchase any property. All unit availability, floor plans, and prices are subject to change without prior notice. Renderings, views, and artistic illustrations are for representational purposes only. Project information, pricing, charges, payment terms, offers and availability are based on the supplied brochure, promotional offer and price sheet, and should be confirmed with the developer or authorized sales team.";
