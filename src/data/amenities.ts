/**
 * Amenities — transcribed from the supplied brochure.
 *   page 4 : fitness
 *   page 5 : childhood / family
 *   page 6 : clubhouse features
 *   page 8 : exclusive project features
 *   page 7 : master-plan legend entries (landscape & recreation)
 *
 * Grouped only where the source itself groups them. Entries with an `image`
 * use authentic brochure imagery; the rest fall back to a Lucide icon.
 */

export type AmenityIcon =
  | "waves"
  | "dumbbell"
  | "trees"
  | "users"
  | "baby"
  | "shield"
  | "car"
  | "sparkles"
  | "heart";

export interface AmenityGroup {
  id: string;
  title: string;
  blurb: string;
  image?: string;
  imageAlt?: string;
  icon: AmenityIcon;
  items: string[];
}

export const amenityGroups: AmenityGroup[] = [
  {
    id: "fitness",
    title: "Fitness & Sports",
    blurb:
      "“More space for your fitness per sq. ft.” — the brochure’s sports spread, reproduced item for item.",
    image: "/assets/architecture/yoga-lawn.webp",
    imageAlt: "Resident on a yoga mat on the landscaped lawn, brochure image",
    icon: "dumbbell",
    items: [
      "1 km Jogging & Cycling Trail",
      "Outdoor Yoga Deck",
      "Outdoor Gym",
      "2 Basketball Courts",
      "2 Futsal Courts",
      "2 Volleyball Courts",
      "4 Tennis Courts",
      "2 Cricket Practice Nets",
      "Box Cricket",
      "Multi-purpose Court",
    ],
  },
  {
    id: "family",
    title: "Family & Children",
    blurb:
      "“More space for childhood per sq. ft.” — play, safety and everyday convenience for young families.",
    image: "/assets/amenities/pool-float.webp",
    imageAlt: "Swimming pool water, brochure image",
    icon: "baby",
    items: [
      "Creche with Exclusive Play Areas for Kids",
      "Hobby Rooms for Toddlers",
      "Indoor games",
      "Children’s Play Areas with Sand Bed",
      "Skating Rink",
      "School Bus Bay with Waiting lounge",
      "2 Swimming Pools with kids’ pool",
      "Onsite Clinic & Pharmacy",
      "Traffic-free Podium",
    ],
  },
  {
    id: "clubhouse",
    title: "Clubhouse",
    blurb:
      "“More space for joyful memories per sq. ft.” — clubhouse features exactly as listed in the brochure.",
    image: "/assets/amenities/clubhouse-lobby.webp",
    imageAlt: "Clubhouse lobby interior from the brochure",
    icon: "waves",
    items: [
      "Cross fit Training Arena",
      "4 Badminton Courts",
      "2 Squash Courts",
      "Table Tennis",
      "2 Swimming Pools with deck",
      "Indoor/Outdoor Coffee lounge",
      "Creche with secure and confined kids’ play area",
      "Meditation/Yoga & Aerobics room",
      "Gym with cardio and weights",
      "Saloon & Spa",
      "Library",
      "Hobby Rooms",
      "Indoor Games (carrom, foosball and air hockey)",
      "2 Audio Visual Rooms",
      "Pool & billiards lounge",
      "Terrace Party Area",
      "Multipurpose Hall with attached Banquet Lawn",
      "Grocery store",
      "ATM",
      "Restaurant",
      "On-site Clinic & Pharmacy",
      "Conference Room",
      "8 Well-furnished guest suites",
    ],
  },
  {
    id: "landscape",
    title: "Landscape & Open Space",
    blurb:
      "Exotic designer landscapes and waterscapes across a site that is more than 82% open, per the brochure.",
    image: "/assets/architecture/promenade.webp",
    imageAlt: "Tree-lined promenade with families, brochure image",
    icon: "trees",
    items: [
      "Exotic Designer Landscapes & Waterscapes",
      "Arrival Plaza and Main Spine",
      "Central Lawn, Party Lawn and Amphitheater",
      "Tree Court, Mini Forest and Shade Structure",
      "Interactive Fountain and Club Entry Water Feature",
      "Passive Seating Plaza and Stepped Walkway",
      "Sunrise/Sunset View Deck",
      "Pet Park",
      "Cycle Track and Cycle Stand",
    ],
  },
  {
    id: "convenience",
    title: "Convenience & Security",
    blurb: "From the brochure’s “Exclusive Project Features” and specifications pages.",
    icon: "shield",
    items: [
      "High-level Security",
      "Separate Entry/Exit for Residents, Vendors/Housekeeping Staff and Visitors",
      "100% Power Backup",
      "Imposing Entrance Lounge for each Tower",
      "Exclusive Pick-up and Drop-off Zones for Each Tower",
      "High-Speed Elevators",
      "High-Speed Internet Connectivity",
      "Work From Home office spaces",
      "Water Harvesting and Water Efficient Sanitary Fittings",
      "Elevated Ramps in Common Areas (for elderly/differently abled)",
      "Round the clock Facility Management",
      "Onsite Clinic & Pharmacy",
    ],
  },
];
