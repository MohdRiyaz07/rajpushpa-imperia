import { Check } from "lucide-react";
import { overview, residenceSummary } from "../data/projectData";
import { Reveal, Section, SectionHead } from "./ui";

/**
 * Overview — editorial two-column introduction to the project.
 */
export default function Overview() {
  return (
    <Section id="overview" tone="white" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          <div>
            <SectionHead eyebrow={overview.eyebrow} title={overview.title} />

            <Reveal delay={0.12}>
              <p className="mt-6 leading-relaxed text-charcoal/80">{overview.intro}</p>
            </Reveal>

            <div className="mt-8 space-y-5">
              {overview.body.map((p) => (
                <Reveal key={p.slice(0, 24)} delay={0.16}>
                  <p className="leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <ul className="mt-9 space-y-3 border-t border-charcoal/10 pt-8">
                {residenceSummary.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[0.95rem] text-charcoal/85">
                    <Check size={17} className="mt-0.5 shrink-0 text-terracotta" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:pt-2">
            <figure className="relative">
              <img
                src={overview.image}
                alt={overview.imageAlt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-2xl object-cover"
              />
              <figcaption className="mt-3 text-xs text-muted">
                {residenceSummary.types} · {residenceSummary.sizeRange}
              </figcaption>
            </figure>
          </Reveal>
        </div>

      </div>
    </Section>
  );
}
