import { AlertCircle, ArrowRight } from "lucide-react";
import { offer, phases } from "../data/pricing";
import { Reveal, Section, SectionHead } from "./ui";

/**
 * Offer — the supplied promotional creative and the two ownership options it
 * describes, reproduced as marketing claims from that material.
 */
export default function Offer() {
  return (
    <Section id="offer" tone="white" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHead eyebrow={offer.eyebrow} title={offer.headline} />

            <Reveal delay={0.1}>
              <p className="mt-5 text-[0.95rem] font-medium uppercase tracking-[0.1em] text-forest">
                {offer.locationLine}
              </p>
              <p className="mt-1.5 text-[0.95rem] text-muted">{offer.configurations}</p>
            </Reveal>

            <div className="mt-10 space-y-4">
              {offer.options.map((opt, i) => (
                <Reveal key={opt.id} delay={0.08 * i}>
                  <div className="rounded-2xl border border-charcoal/10 bg-ivory/60 p-6 md:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-forest px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ivory">
                        {opt.phase}
                      </span>
                      <span className="rounded-full border border-terracotta/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
                        {opt.badge}
                      </span>
                    </div>
                    <h3 className="display-3 mt-4 text-forest-dark">{opt.title}</h3>
                    <ul className="mt-3.5 space-y-2">
                      {opt.lines.map((line) => (
                        <li key={line} className="flex gap-2.5 text-[0.9rem] text-charcoal/80">
                          <ArrowRight size={15} className="mt-0.5 shrink-0 text-terracotta" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-7 flex gap-3 rounded-xl border border-charcoal/12 bg-white p-4">
                <AlertCircle size={17} className="mt-0.5 shrink-0 text-terracotta" />
                <p className="text-[0.82rem] leading-relaxed text-muted">{offer.caveat}</p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-6 text-[0.78rem] leading-relaxed text-muted">
                {offer.reraLine} ·{" "}
                <a
                  href={offer.reraHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-4 hover:text-forest-dark"
                >
                  {offer.reraSite}
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure className="overflow-hidden rounded-2xl ring-1 ring-charcoal/8">
              <img
                src={offer.image}
                alt={offer.imageAlt}
                width={1254}
                height={1254}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover"
              />
              <figcaption className="border-t border-charcoal/8 bg-ivory/60 px-5 py-3 text-[0.75rem] text-muted">
                The supplied promotional creative, shown as delivered.
              </figcaption>
            </figure>

            <dl className="mt-6 grid grid-cols-2 gap-4">
              {phases.map((p) => (
                <div key={p.id} className="rounded-xl bg-forest-dark p-5 text-ivory">
                  <dt className="text-[0.72rem] uppercase tracking-[0.14em] text-ivory/60">
                    {p.label} base price
                  </dt>
                  <dd className="tnum mt-2 font-display text-[1.9rem] leading-none">
                    ₹ {p.rate.toLocaleString("en-IN")}
                    <span className="ml-1.5 font-sans text-[0.72rem] font-normal uppercase tracking-[0.1em] text-ivory/60">
                      / sft
                    </span>
                  </dd>
                  <dd className="mt-2.5 text-[0.78rem] leading-snug text-ivory/70">{p.note}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
