/**
 * Pricing — transcribed verbatim from the supplied price sheet image
 * ("PRICE SHEET", Rajapushpa Imperia at Rajapushpa Lifestyle City,
 * TS RERA Reg. No. P01100003723) and the supplied promotional offer image.
 *
 * Nothing in this file is estimated. Values the price sheet does not state
 * (GST rate, stamp duty, registration charges) are deliberately absent rather
 * than guessed — see `pricing.notStated`.
 */

export interface ChargeRow {
  label: string;
  detail?: string;
  /** Printed value, exactly as shown on the price sheet. */
  value: string;
  /** Numeric rate in rupees, used by the estimator. */
  rate: number;
  /** "per" basis: per saleable sft, or a flat one-time amount. */
  basis: "perSft" | "flat";
}

export interface Phase {
  id: "phase-1" | "phase-2";
  label: string;
  rate: number;
  note: string;
  gst: string;
}

export const phases: Phase[] = [
  {
    id: "phase-1",
    label: "Phase - 1",
    rate: 8799,
    note: "Ready to Move In — No GST",
    gst: "No GST, as printed on the price sheet",
  },
  {
    id: "phase-2",
    label: "Phase - 2",
    rate: 8499,
    note: "A, B, G, H Towers",
    gst: "Applicable GST payable with every instalment",
  },
];

export const basePriceLabel = "Base Price";

/** Every priced row of the price sheet, in printed order. */
export const chargeRows: ChargeRow[] = [
  {
    label: "Floor Rise Charges",
    detail: "from 5th floor onwards",
    value: "₹ 20/- per sft",
    rate: 20,
    basis: "perSft",
  },
  {
    label: "East / North Facing Charges",
    value: "₹ 50/- per sft",
    rate: 50,
    basis: "perSft",
  },
  {
    label: "Corner Apartment Charges",
    value: "₹ 50/- per sft",
    rate: 50,
    basis: "perSft",
  },
  {
    label: "View Premium Charges",
    value: "₹ 50/- per sft",
    rate: 50,
    basis: "perSft",
  },
  {
    label: "Courtyard View Charges",
    value: "₹ 100/- per sft",
    rate: 100,
    basis: "perSft",
  },
  {
    label: "Car Parking: Double Back to Back",
    value: "₹ 5,50,000/-",
    rate: 550000,
    basis: "flat",
  },
  {
    label: "W.E.G.",
    detail: "Water, Electricity, Gas, Infrastructure & Copper Pipping",
    value: "₹ 300/- per sft",
    rate: 300,
    basis: "perSft",
  },
  {
    label: "Towards Club house",
    value: "₹ 4,00,000/-",
    rate: 400000,
    basis: "flat",
  },
  {
    label: "Legal & Documentation Charges",
    value: "₹ 30,000/-",
    rate: 30000,
    basis: "flat",
  },
];

/** Row indices of `chargeRows` that are one-time flat amounts. */
export const flatChargeLabels = chargeRows
  .filter((r) => r.basis === "flat")
  .map((r) => r.label);

export interface ScheduleStep {
  milestone: string;
  percent: number;
}

/** PAYMENT SCHEDULE table, exactly as printed. Sums to 100%. */
export const paymentSchedule: ScheduleStep[] = [
  { milestone: "Booking Amount", percent: 10 },
  { milestone: "Within 15 Days from the date of booking", percent: 10 },
  { milestone: "On Casting of B3 Roof Slab", percent: 15 },
  { milestone: "On Casting of 5th Floor Slab", percent: 10 },
  { milestone: "On Casting of 12th Floor Slab", percent: 10 },
  { milestone: "On Casting of 19th Floor Slab", percent: 10 },
  { milestone: "On Casting of 26th Floor Slab", percent: 10 },
  { milestone: "On Casting of 32nd Floor Slab", percent: 10 },
  { milestone: "On Casting of 39th Floor Slab", percent: 10 },
  { milestone: "At the time of Registration/Handover", percent: 5 },
];

/** "Other Terms And Conditions" — reproduced word for word, numbered as printed. */
export const priceSheetTerms: string[] = [
  "TDS payment is the responsibility of the buyer. T.D.S @ 1% on the total sale consideration shall be deducted and paid directly to the IT department through online process on builders PAN: AAECR6002Q with every instalment.",
  "Applicable GST is to be paid with every instalment.",
  "Corpus Fund @ Rs.75/- per sft and advance Maintenance Charges @ Rs.84/- per sft for 24 months is to be paid 15 days ahead of Registration Date along with applicable GST",
  "Stamp Duty, Mutation Fees & other Statutory Fees/Taxes to be paid as applicable – 15 days ahead of registration date.",
  "The GST, Stamp Duty etc., is subject to change from time to time based on government norms without any prior notifications.",
  "Prices are subject to change without any prior notice.",
];

/** Post-registration amounts stated in term 3, priced per saleable sft. */
export const possessionCharges = {
  corpusFund: { rate: 75, label: "Corpus Fund", value: "Rs. 75/- per sft" },
  advanceMaintenance: {
    rate: 84,
    months: 24,
    label: "Advance Maintenance Charges",
    value: "Rs. 84/- per sft for 24 months",
  },
  whenToPay: "15 days ahead of Registration Date, along with applicable GST",
};

/** Things the price sheet does NOT state. Deliberately not fabricated. */
export const pricingNotStated = [
  "GST rate or amount — the sheet only says “applicable GST”",
  "Stamp duty, mutation fees and other statutory fees/taxes",
  "Registration charges",
  "Maintenance charges after the initial 24-month advance",
];

const WHATSAPP_RECIPIENT = "916281245149";
const ENQUIRY_EMAIL = "ravindra@hyderabadpropertyconsultants.com";

export const priceSheetContact = {
  phone: "+91 62812 45149",
  phoneHref: `tel:+${WHATSAPP_RECIPIENT}`,
  /** Configured WhatsApp recipient in international format. */
  whatsappNumber: WHATSAPP_RECIPIENT,
  whatsappHref: `https://wa.me/${WHATSAPP_RECIPIENT}`,
  email: ENQUIRY_EMAIL,
  emailHref: `mailto:${ENQUIRY_EMAIL}`,
  website: "www.rajapushpa.in",
  websiteHref: "https://www.rajapushpa.in",
};

/* ------------------------------------------------------------------ */
/* Promotional offer — from the supplied offer image, reproduced as is. */
/* ------------------------------------------------------------------ */

export const offer = {
  eyebrow: "The Offer",
  headline: "One ADDRESS, TWO WAYS to OWN",
  locationLine: "@ Rajapushpa LIFE STYLE CITY, TELLAPUR.",
  configurations: "Premium 2, 2.5 & 3 BHK Homes · 1,350 – 2,880 sft.",
  reraLine: "TS RERA Reg. No.: P01100003723",
  reraSite: "rera.telangana.gov.in",
  reraHref: "https://rera.telangana.gov.in",
  image: "/assets/offers/offer.webp",
  imageAlt:
    "Rajapushpa Imperia promotional offer creative: One Address Two Ways to Own, Phase-I OC received no GST ready to move-in, Phase-II pay 50% now and 50% at possession",
  options: [
    {
      id: "phase-1",
      phase: "Phase-I",
      title: "OC Received · No GST",
      badge: "READY TO MOVE-IN",
      lines: [
        "Occupancy Certificate received, as stated in the supplied offer material",
        "No GST on the purchase",
        "Ready to move in",
      ],
    },
    {
      id: "phase-2",
      phase: "Phase-II",
      title: "Pay 50% Now · 50% at Possession",
      badge: "FLEXIBLE PAYMENT",
      lines: [
        "Pay 50% now",
        "Pay 50% at the time of possession",
        "Phase-2 base price ₹ 8,499 per sq. ft. on the price sheet (A, B, G, H Towers)",
      ],
    },
  ],
  caveat:
    "Reproduced from the supplied promotional offer. Promotional claims are not independently verified current guarantees — confirm applicability, tower allocation and timelines with the sales team.",
};

/**
 * Tower-letter mapping used by the estimator's phase-2 note.
 * The price sheet names Phase-2 towers only as "A, B, G, H"; the brochure names
 * towers Aster, Blossom, Casper, Daisy, Eden, Falcon, Grace and Hazel. The
 * first-letter match is the obvious reading but is NOT stated by either source,
 * so it is labelled indicative everywhere it is surfaced.
 */
export const phaseTowerMappingNote =
  "The price sheet identifies Phase-2 towers only as “A, B, G, H Towers”. Matching those letters to the brochure’s tower names (Aster, Blossom, Grace, Hazel) is indicative and requires confirmation.";

export const phase2TowerLetters = ["A", "B", "G", "H"];

/* --------------------------- helpers ----------------------------- */

export const inr = (n: number): string =>
  "₹ " + Math.round(n).toLocaleString("en-IN");

export const inrLong = (n: number): string =>
  "₹ " + Math.round(n).toLocaleString("en-IN") + "/-";

export const pricingIntro = {
  eyebrow: "Pricing",
  title: "Request the current price sheet.",
  lede:
    "The original price sheet contains the listed rates, charges, payment schedule and terms.",
  disclaimer:
    "Prices, charges, payment terms and offers reproduced here require confirmation with the developer or authorized sales team. The price sheet itself states that prices are subject to change without any prior notice.",
};
