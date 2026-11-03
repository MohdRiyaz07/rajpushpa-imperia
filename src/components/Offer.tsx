import { ArrowRight } from "lucide-react";
import { offer, phases } from "../data/pricing";
import { useEnquiry } from "./Enquiry";
import { Reveal, Section, SectionHead } from "./ui";

export default function Offer() {
  const { openEnquiry } = useEnquiry();

  return (
    <Section id="offer" tone="white" className="scroll-mt-20 py-16 md:py-20">
      <div className="container-x">
        <SectionHead
          eyebrow={offer.eyebrow}
          title="Two clear ways to own."
          lede="Choose the offer that best fits your plans."
        />

        <div className="mt-9 grid items-start gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <figure className="overflow-hidden rounded-2xl bg-ivory ring-1 ring-charcoal/10">
              <img
                src={offer.image}
                alt={offer.imageAlt}
                width={1254}
                height={1254}
                loading="lazy"
                decoding="async"
                className="mx-auto max-h-[34rem] w-full object-contain"
              />
              <figcaption className="border-t border-charcoal/8 px-4 py-3 text-[0.75rem] text-muted">
                Promotional offer artwork supplied for Rajapushpa Imperia.
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {offer.options.map((option, index) => {
                const phase = phases.find((item) => item.id === option.id);

                return (
                  <Reveal key={option.id} delay={index * 0.08}>
                    <article className="h-full rounded-2xl border border-charcoal/10 bg-ivory/70 p-6 sm:p-7">
                      <p className="eyebrow text-forest">{option.phase}</p>
                      <h3 className="display-3 mt-3 text-forest-dark">{option.title}</h3>
                      <p className="mt-3 text-[0.92rem] leading-relaxed text-charcoal/80">
                        {option.summary}
                      </p>
                      {phase && (
                        <p className="tnum mt-5 border-t border-charcoal/10 pt-4 text-sm text-muted">
                          Base price:{" "}
                          <span className="font-semibold text-forest-dark">
                            ₹{phase.rate.toLocaleString("en-IN")} / sft
                          </span>
                          {phase.id === "phase-2" && (
                            <span className="mt-1 block text-xs">{phase.note}</span>
                          )}
                        </p>
                      )}
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.16}>
              <div className="mt-5 flex justify-center sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiry({
                      type: "Project Details Request",
                      details: "Current offer applicability and pricing",
                    })
                  }
                  className="btn btn-ghost w-full sm:w-auto"
                >
                  Ask about an offer <ArrowRight size={14} />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
