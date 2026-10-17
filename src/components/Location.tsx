import { AlertTriangle, ExternalLink, MapPin } from "lucide-react";
import { landmarkGroups, location } from "../data/location";
import { Reveal, Section, SectionHead } from "./ui";

const mapsSearchHref =
  "https://www.google.com/maps/search/?api=1&query=Rajapushpa%20Imperia%20Tellapur%20Hyderabad";

/**
 * Location — the brochure's address line and its own location map, plus every
 * landmark printed on that map. Distance labels are reported exactly as
 * annotated, with the map's own "Not to Scale" caveat attached.
 */
export default function Location() {
  return (
    <Section id="location" tone="ivory" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow={location.eyebrow}
          title={location.title}
          lede={location.lede}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <figure className="overflow-hidden rounded-2xl bg-white ring-1 ring-charcoal/8">
              <img
                src={location.mapImage}
                alt={location.mapImageAlt}
                width={2400}
                height={1697}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-contain"
              />
              <figcaption className="border-t border-charcoal/8 px-5 py-3 text-[0.78rem] text-muted">
                Location map reproduced from the brochure — marked “Not to Scale”.
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <div className="rounded-2xl bg-forest-dark p-6 text-ivory md:p-7">
                <p className="eyebrow flex items-center gap-2 text-terracotta">
                  <MapPin size={13} /> Address
                </p>
                <address className="mt-4 not-italic">
                  {location.address.map((line) => (
                    <span key={line} className="block text-[1rem] leading-relaxed text-ivory">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-4 border-t border-ivory/12 pt-4 text-[0.78rem] leading-relaxed text-ivory/55">
                  {location.addressNote}
                </p>
                <a
                  href={mapsSearchHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-light mt-5 w-full"
                >
                  Search on Google Maps
                  <ExternalLink size={14} />
                </a>
                <p className="mt-3 text-[0.72rem] leading-relaxed text-ivory/45">
                  Opens a Google Maps search for the project name — no verified place listing
                  or coordinates are asserted here.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {location.distanceLabels.map((d) => (
                  <div
                    key={d.label}
                    className="rounded-xl border border-charcoal/12 bg-white p-4 text-center"
                  >
                    <span className="tnum block font-display text-[1.35rem] leading-none text-forest-dark">
                      {d.value}
                    </span>
                    <span className="mt-2 block text-[0.7rem] leading-snug text-muted">
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 flex gap-2.5 text-[0.76rem] leading-relaxed text-muted">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-terracotta" />
                <span>{location.distanceNote}</span>
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16">
          <Reveal>
            <h3 className="display-3 text-forest-dark">
              Landmarks printed on the brochure’s location map
            </h3>
          </Reveal>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {landmarkGroups.map((group, gi) => {
              const items = location.landmarks.filter((l) => l.group === group);
              if (items.length === 0) return null;
              return (
                <Reveal key={group} delay={0.05 * gi}>
                  <div>
                    <p className="eyebrow border-b border-charcoal/12 pb-3 text-terracotta">
                      {group}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {items.map((l) => (
                        <li
                          key={l.name}
                          className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-charcoal/80"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-forest/40"
                          />
                          {l.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
