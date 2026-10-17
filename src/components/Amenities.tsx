import {
  Baby,
  Car,
  Dumbbell,
  Heart,
  ShieldCheck,
  Sparkles,
  TreePine,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { amenityGroups, type AmenityIcon } from "../data/amenities";
import { Reveal, Section, SectionHead } from "./ui";

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
 * Amenities — the brochure's grouped amenity lists, reproduced item for item,
 * with the brochure imagery that belongs to each group.
 */
export default function Amenities() {
  const total = amenityGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <Section id="amenities" tone="dark" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Amenities"
          title="More life per sq. ft."
          lede="Every item below is listed in the supplied brochure — the fitness spread, the childhood spread, the clubhouse features and the exclusive project features. Nothing has been added."
          tone="light"
        />

        <Reveal delay={0.1}>
          <p className="tnum mt-6 text-[0.8rem] uppercase tracking-[0.16em] text-ivory/50">
            {total} listed amenities across {amenityGroups.length} groups
          </p>
        </Reveal>

        <div className="mt-12 space-y-6">
          {amenityGroups.map((group, gi) => {
            const Icon = iconMap[group.icon];
            return (
              <Reveal key={group.id} delay={0.05 * gi}>
                <article className="overflow-hidden rounded-2xl border border-ivory/12 bg-white/[0.035] backdrop-blur-sm">
                  <div
                    className={`grid gap-0 ${
                      group.image ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]" : ""
                    }`}
                  >
                    <div className="p-7 md:p-9">
                      <div className="flex items-start gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-terracotta/15 text-terracotta">
                          <Icon size={20} />
                        </span>
                        <div>
                          <h3 className="display-3 text-ivory">{group.title}</h3>
                          <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-ivory/60">
                            {group.blurb}
                          </p>
                        </div>
                      </div>

                      <ul className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 border-b border-ivory/8 pb-2.5 text-[0.88rem] leading-snug text-ivory/80"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-terracotta"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {group.image && (
                      <div className="relative min-h-[220px] overflow-hidden lg:min-h-full">
                        <img
                          src={group.image}
                          alt={group.imageAlt ?? ""}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,43,34,0.92)_0%,rgba(11,43,34,0.25)_45%,rgba(11,43,34,0)_100%)] lg:block"
                        />
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
