/**
 * Floor plans — the eight "Area Statement (in Sft)" tables printed on brochure
 * pages 9–16, transcribed cell for cell. Nothing here is rounded, merged or
 * inferred: every carpet / walls / balconies / common / saleable / facing value
 * is exactly as printed.
 *
 * Column order on the brochure is:
 *   Carptet | Walls | Balconies | Common | Saleable | Facing
 * (the brochure itself spells the first column "Cartpet").
 */

export interface UnitRow {
  unit: number;
  carpet: number;
  walls: number;
  balconies: number;
  common: number;
  saleable: number;
  facing: "East" | "West" | "North";
}

export type TowerStyle = "centre-balcony" | "sundeck";

export interface FloorPlanSheet {
  id: string;
  towers: string[];
  style: TowerStyle;
  title: string;
  subtitle: string;
  floors: string;
  image: string;
  imageAlt: string;
  /** Intrinsic pixel size of `image`, used to reserve layout space before load. */
  imageWidth: number;
  imageHeight: number;
  units: UnitRow[];
}

const u = (
  unit: number,
  carpet: number,
  walls: number,
  balconies: number,
  common: number,
  saleable: number,
  facing: UnitRow["facing"]
): UnitRow => ({ unit, carpet, walls, balconies, common, saleable, facing });

export const floorPlanSheets: FloorPlanSheet[] = [
  {
    id: "aster-eden-centre-balcony",
    towers: ["Aster", "Eden"],
    style: "centre-balcony",
    title: "Aster & Eden — with centre balcony",
    subtitle: "Area Statement (in Sft)",
    floors: "Aster: 1st to 10th & 21st to 30th Floors · Eden: 1st to 9th & 20th to 29th Floors",
    image: "/assets/floor-plans/aster-eden-centre-balcony.webp",
    imageAlt:
      "Aster and Eden tower floor plate with centre balconies, and the unit area statement table, from the brochure",
    imageWidth: 1252,
    imageHeight: 2137,
    units: [
      u(1, 1369, 94, 135, 447, 2045, "West"),
      u(2, 1775, 109, 187, 579, 2650, "East"),
      u(3, 869, 80, 106, 295, 1350, "West"),
      u(4, 1000, 85, 126, 339, 1550, "East"),
      u(5, 1124, 89, 131, 376, 1720, "East"),
      u(6, 1124, 89, 131, 376, 1720, "West"),
      u(7, 1000, 85, 126, 339, 1550, "West"),
      u(8, 876, 80, 99, 295, 1350, "East"),
      u(9, 1775, 109, 187, 579, 2650, "West"),
      u(10, 1369, 94, 135, 447, 2045, "East"),
    ],
  },
  {
    id: "aster-eden-sundeck",
    towers: ["Aster", "Eden"],
    style: "sundeck",
    title: "Aster & Eden — with Sundeck",
    subtitle: "Apartments with Sundeck · Area Statement (in Sft)",
    floors: "Aster: 11th to 20th & 31st to 40th Floors · Eden: 10th to 19th & 30th to 39th Floors",
    image: "/assets/floor-plans/aster-eden-sundeck.webp",
    imageAlt:
      "Aster and Eden tower sundeck apartment floor plate with the unit area statement table, from the brochure",
    imageWidth: 1225,
    imageHeight: 2094,
    units: [
      u(1, 1420, 94, 247, 494, 2255, "West"),
      u(2, 1775, 109, 366, 630, 2880, "East"),
      u(3, 869, 80, 106, 295, 1350, "West"),
      u(4, 1000, 85, 126, 339, 1550, "East"),
      u(5, 1124, 89, 131, 376, 1720, "East"),
      u(6, 1124, 89, 131, 376, 1720, "West"),
      u(7, 1000, 85, 126, 339, 1550, "West"),
      u(8, 876, 80, 99, 295, 1350, "East"),
      u(9, 1836, 109, 305, 630, 2880, "West"),
      u(10, 1369, 94, 298, 494, 2255, "East"),
    ],
  },
  {
    id: "blossom-falcon-centre-balcony",
    towers: ["Blossom", "Falcon"],
    style: "centre-balcony",
    title: "Blossom & Falcon — with centre balcony",
    subtitle: "Area Statement (in Sft)",
    floors: "1st to 9th & 20th to 29th Floors",
    image: "/assets/floor-plans/blossom-falcon-centre-balcony.webp",
    imageAlt:
      "Blossom and Falcon tower floor plate with centre balconies and the unit area statement table, from the brochure",
    imageWidth: 2059,
    imageHeight: 1310,
    units: [
      u(1, 1798, 104, 172, 581, 2655, "West"),
      u(2, 1373, 90, 134, 448, 2045, "East"),
      u(3, 1578, 98, 156, 513, 2345, "West"),
      u(4, 899, 77, 98, 301, 1375, "North"),
      u(5, 1367, 90, 141, 447, 2045, "North"),
      u(6, 1139, 84, 122, 375, 1720, "North"),
      u(7, 1578, 97, 157, 513, 2345, "East"),
      u(8, 1792, 104, 178, 581, 2655, "East"),
      u(9, 1587, 98, 147, 513, 2345, "West"),
    ],
  },
  {
    id: "blossom-falcon-sundeck",
    towers: ["Blossom", "Falcon"],
    style: "sundeck",
    title: "Blossom & Falcon — with Sundeck",
    subtitle: "Apartments with Sundeck · Area Statement (in Sft)",
    floors: "10th to 19th & 30th to 39th Floors",
    image: "/assets/floor-plans/blossom-falcon-sundeck.webp",
    imageAlt:
      "Blossom and Falcon tower sundeck apartment floor plate with the unit area statement table, from the brochure",
    imageWidth: 2018,
    imageHeight: 1302,
    units: [
      u(1, 1799, 104, 315, 622, 2840, "West"),
      u(2, 1373, 90, 264, 483, 2210, "East"),
      u(3, 1639, 97, 256, 558, 2550, "West"),
      u(4, 899, 77, 98, 301, 1375, "North"),
      u(5, 1367, 90, 141, 447, 2045, "North"),
      u(6, 1139, 84, 122, 375, 1720, "North"),
      u(7, 1639, 97, 256, 558, 2550, "East"),
      u(8, 1792, 104, 322, 622, 2840, "East"),
      u(9, 1587, 98, 284, 551, 2520, "West"),
    ],
  },
  {
    id: "casper-grace-centre-balcony",
    towers: ["Casper", "Grace"],
    style: "centre-balcony",
    title: "Casper & Grace — with centre balcony",
    subtitle: "Area Statement (in Sft)",
    floors: "1st to 9th & 20th to 29th Floors",
    image: "/assets/floor-plans/casper-grace-centre-balcony.webp",
    imageAlt:
      "Casper and Grace tower floor plate with centre balconies and the unit area statement table, from the brochure",
    imageWidth: 2005,
    imageHeight: 1305,
    units: [
      u(1, 1798, 104, 172, 581, 2655, "West"),
      u(2, 1587, 98, 147, 513, 2345, "East"),
      u(3, 1578, 97, 157, 513, 2345, "West"),
      u(4, 1139, 84, 122, 375, 1720, "North"),
      u(5, 1367, 90, 141, 447, 2045, "North"),
      u(6, 899, 77, 98, 301, 1375, "North"),
      u(7, 1578, 97, 157, 513, 2345, "East"),
      u(8, 1792, 104, 178, 581, 2655, "East"),
      u(9, 1378, 91, 129, 447, 2045, "West"),
    ],
  },
  {
    id: "casper-grace-sundeck",
    towers: ["Casper", "Grace"],
    style: "sundeck",
    title: "Casper & Grace — with Sundeck",
    subtitle: "Apartments with Sundeck · Area Statement (in Sft)",
    floors: "10th to 19th & 30th to 39th Floors",
    image: "/assets/floor-plans/casper-grace-sundeck.webp",
    imageAlt:
      "Casper and Grace tower sundeck apartment floor plate with the unit area statement table, from the brochure",
    imageWidth: 2086,
    imageHeight: 1363,
    units: [
      u(1, 1799, 104, 315, 622, 2840, "West"),
      u(2, 1587, 99, 283, 551, 2520, "East"),
      u(3, 1639, 97, 256, 558, 2550, "West"),
      u(4, 1138, 84, 122, 376, 1720, "North"),
      u(5, 1367, 90, 141, 447, 2045, "North"),
      u(6, 899, 77, 98, 301, 1375, "North"),
      u(7, 1639, 97, 256, 558, 2550, "East"),
      u(8, 1792, 104, 322, 622, 2840, "East"),
      u(9, 1378, 91, 261, 485, 2215, "West"),
    ],
  },
  {
    id: "daisy-hazel-centre-balcony",
    towers: ["Daisy", "Hazel"],
    style: "centre-balcony",
    title: "Daisy & Hazel — with centre balcony",
    subtitle: "Area Statement (in Sft)",
    floors: "Daisy: 1st to 9th & 21st to 29th Floors · Hazel: 1st to 10th & 21st to 30th Floors",
    image: "/assets/floor-plans/daisy-hazel-centre-balcony.webp",
    imageAlt:
      "Daisy and Hazel tower floor plate with centre balconies and the unit area statement table, from the brochure",
    imageWidth: 1304,
    imageHeight: 2235,
    units: [
      u(1, 1775, 109, 187, 579, 2650, "West"),
      u(2, 1369, 94, 135, 447, 2045, "East"),
      u(3, 876, 80, 99, 295, 1350, "East"),
      u(4, 1000, 85, 126, 339, 1550, "West"),
      u(5, 1125, 88, 131, 376, 1720, "West"),
      u(6, 1125, 88, 131, 376, 1720, "East"),
      u(7, 1000, 85, 126, 339, 1550, "East"),
      u(8, 869, 80, 106, 295, 1350, "West"),
      u(9, 1369, 94, 135, 447, 2045, "West"),
      u(10, 1775, 109, 186, 580, 2650, "East"),
    ],
  },
  {
    id: "daisy-hazel-sundeck",
    towers: ["Daisy", "Hazel"],
    style: "sundeck",
    title: "Daisy & Hazel — with Sundeck",
    subtitle: "Apartments with Sundeck · Area Statement (in Sft)",
    floors: "Daisy: 10th to 19th & 30th to 39th Floors · Hazel: 11th to 20th & 31st to 40th Floors",
    image: "/assets/floor-plans/daisy-hazel-sundeck.webp",
    imageAlt:
      "Daisy and Hazel tower sundeck apartment floor plate with the unit area statement table, from the brochure",
    imageWidth: 1248,
    imageHeight: 2065,
    units: [
      u(1, 1836, 109, 305, 630, 2880, "West"),
      u(2, 1369, 95, 298, 493, 2255, "East"),
      u(3, 876, 80, 99, 295, 1350, "East"),
      u(4, 1000, 85, 126, 339, 1550, "West"),
      u(5, 1125, 88, 131, 376, 1720, "West"),
      u(6, 1125, 88, 131, 376, 1720, "East"),
      u(7, 1000, 85, 126, 339, 1550, "East"),
      u(8, 869, 80, 106, 295, 1350, "West"),
      u(9, 1420, 94, 248, 493, 2255, "West"),
      u(10, 1775, 109, 366, 630, 2880, "East"),
    ],
  },
];

/** Tower pairs shown in the brochure's master plan. */
export const towerPairs = ["Aster & Eden", "Blossom & Falcon", "Casper & Grace", "Daisy & Hazel"];

export const floorPlanIntro = {
  eyebrow: "Residences",
  title: "Floor plans across eight towers.",
  lede:
    "Choose a tower pair and residence type to view its original floor plate and area statement.",
  note:
    "Units are numbered 1–10 per floor plate. Premium 2, 2.5 & 3 BHK homes are advertised at 1,350–2,880 sft; the brochure does not label a BHK count against individual units, so no configuration is asserted per unit.",
};
