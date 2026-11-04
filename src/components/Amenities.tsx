import {
  Baby,
  Bike,
  Building2,
  Car,
  Dumbbell,
  Flower2,
  Gamepad2,
  Heart,
  ShieldCheck,
  Sparkles,
  TreePine,
  Users,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { amenityGroups, type AmenityIcon } from "../data/amenities";
import { Reveal, Section, SectionHead } from "./ui";
import { useState } from "react";

const iconMap: Record<AmenityIcon, LucideIcon> = {
  waves: Waves,
  dumbbell: Dumbbell,
  trees: TreePine,
  users: Users,
  baby: Baby,
  shield: ShieldCheck,
  car: Car,
  sparkles: Sparkles,
  heart: Heart,
};

/**
 * Amenities — the brochure's grouped amenity lists, presented as icon cards.
 */
export default function Amenities() {
  const [selectedGroup, setSelectedGroup] = useState("clubhouse");
  const orderedGroups = [...amenityGroups].sort((a, b) =>
    a.id === "clubhouse" ? -1 : b.id === "clubhouse" ? 1 : 0
  );
  const visibleGroups = amenityGroups.filter((group) => group.id === selectedGroup);

  const iconFor = (item: string, fallback: LucideIcon): LucideIcon => {
    const text = item.toLowerCase();
    if (/pool|water|fountain|waterscape/.test(text)) return Waves;
    if (/gym|fitness|cross fit|sport|court|cricket|tennis|badminton|squash/.test(text))
      return Dumbbell;
    if (/child|kid|creche|toddler|school|play area/.test(text)) return Baby;
    if (/tree|forest|landscape|lawn|garden|park|plant|plaza/.test(text))
      return TreePine;
    if (/cycle|cycling|bicycle|jogging/.test(text)) return Bike;
    if (/security|entry|exit|surveillance|fencing/.test(text)) return ShieldCheck;
    if (/car|parking|vehicle|ramp/.test(text)) return Car;
    if (/internet|connectivity|work from home/.test(text)) return Wifi;
    if (/game|billiard|carrom|foosball|air hockey|table tennis/.test(text))
      return Gamepad2;
    if (/spa|yoga|meditation|wellness/.test(text)) return Heart;
    if (/club|lounge|hall|restaurant|conference|library|guest suite/.test(text))
      return Building2;
    if (/fountain|interactive|decor|water feature/.test(text)) return Sparkles;
    if (/flower|exotic|designer/.test(text)) return Flower2;
    if (/people|family|community/.test(text)) return Users;
    return fallback;
  };

  return (
    <Section id="amenities" tone="ivory" className="scroll-mt-20 py-16 md:py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="Amenities"
          title="Spaces for every part of life."
          lede="Explore the amenities listed in the supplied project brochure."
          align="center"
        />

        <div className="mt-8 flex justify-center">
          <div
            className="flex max-w-full gap-2 overflow-x-auto px-1 pb-2"
            role="group"
            aria-label="Filter amenities by category"
          >
            {orderedGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedGroup(group.id)}
                aria-pressed={selectedGroup === group.id}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                  selectedGroup === group.id
                    ? "border-forest bg-forest text-white"
                    : "border-charcoal/15 bg-white text-charcoal/75 hover:border-forest/50"
                }`}
              >
                {group.title}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
          aria-live="polite"
        >
          {visibleGroups.flatMap((group) => {
            const FallbackIcon = iconMap[group.icon];
            return group.items.map((item, index) => {
              const Icon = iconFor(item, FallbackIcon);
              return (
                <Reveal key={`${group.id}-${item}`} delay={Math.min(index * 0.015, 0.12)}>
                  <article className="flex min-h-36 h-full flex-col items-center justify-center rounded-xl border border-charcoal/8 bg-white px-3 py-5 text-center shadow-[0_2px_12px_rgba(34,39,34,0.035)] transition duration-200 hover:-translate-y-0.5 hover:border-forest/25 hover:shadow-md sm:min-h-40 sm:px-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-sage/70 text-forest-dark">
                      <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3 className="mt-3 text-[0.82rem] font-medium leading-snug text-charcoal sm:text-[0.88rem]">
                      {item}
                    </h3>
                  </article>
                </Reveal>
              );
            });
          })}
        </div>

      </div>
    </Section>
  );
}
