import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Maximize2 } from "lucide-react";
import {
  floorPlanIntro,
  floorPlanSheets,
  type FloorPlanSheet,
} from "../data/floorPlans";
import { inr } from "../data/pricing";
import { useEnquiry, LockedPreview } from "./Enquiry";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { Reveal, Section, SectionHead } from "./ui";

const masterPlan: LightboxItem = {
  src: "/assets/master-plan/master-plan.webp",
  alt: "Master plan of the Rajapushpa Imperia site showing the towers around a landscaped core",
  caption: "Rajapushpa Imperia · Master Plan",
};

export default function Residences() {
  const [selected, setSelected] = useState<FloorPlanSheet>(floorPlanSheets[0]);
  const [masterPlanOpen, setMasterPlanOpen] = useState(false);
  const { openEnquiry } = useEnquiry();

  const requestPlan = () =>
    openEnquiry({
      type: "Floor Plan Request",
      details: `${selected.title} · ${selected.floors}`,
    });

  return (
    <Section id="residences" tone="ivory" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow={floorPlanIntro.eyebrow}
          title="Find the floor plate that fits."
          lede="Browse the tower plans and select a residence type. Each original brochure image includes its area statement and specifications."
        />

        <div
          id="floor-plans"
          className="mt-10 scroll-mt-24 overflow-hidden rounded-2xl border border-forest/30 bg-forest-dark shadow-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/12 px-5 py-4 sm:px-6">
            <div>
              <p className="eyebrow text-terracotta">Residence collection</p>
              <p className="mt-1 text-sm text-ivory/70">
                {selected.title} <span className="text-ivory/35">/</span> Brochure plan
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs text-ivory/60">
              <Lock size={13} /> Preview locked
            </span>
          </div>

          <div className="grid lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,1fr)]">
            <aside className="min-w-0 border-b border-ivory/12 p-4 sm:p-5 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between gap-3 px-1 pb-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ivory/75">
                  Browse plan sheets
                </h3>
                <span className="eyebrow text-ivory/40">
                  {String(floorPlanSheets.length).padStart(2, "0")}
                </span>
              </div>
              <div className="max-h-64 space-y-2 overflow-y-auto pr-1 lg:max-h-[38rem]">
                {floorPlanSheets.map((sheet, index) => {
                  const isSelected = selected.id === sheet.id;
                  return (
                    <button
                      key={sheet.id}
                      type="button"
                      onClick={() => setSelected(sheet)}
                      aria-pressed={isSelected}
                      className={`w-full rounded-xl border p-3.5 text-left transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${
                        isSelected
                          ? "border-terracotta/65 bg-forest text-ivory"
                          : "border-ivory/10 bg-ivory/[0.04] text-ivory/75 hover:border-ivory/25 hover:bg-ivory/[0.08]"
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="min-w-0">
                          <span className={`eyebrow block ${isSelected ? "text-terracotta" : "text-ivory/40"}`}>
                            Plan {String(index + 1).padStart(2, "0")} ·{" "}
                            {sheet.style === "sundeck" ? "Sundeck" : "Centre balcony"}
                          </span>
                          <span className="mt-2 block text-[0.92rem] font-semibold leading-snug">
                            {sheet.towers.join(" & ")}
                          </span>
                        </span>
                        {isSelected && (
                          <span className="mt-1 shrink-0 text-terracotta" aria-hidden="true">
                            <Lock size={14} />
                          </span>
                        )}
                      </span>
                      <span className={`mt-2 block text-[0.72rem] leading-relaxed ${
                        isSelected ? "text-ivory/65" : "text-ivory/45"
                      }`}>
                        {sheet.floors}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 hidden text-[0.72rem] leading-relaxed text-ivory/45 lg:block">
                Brochure plans are shown as supplied. Confirm dimensions and availability
                with the project team.
              </p>
            </aside>

            <div className="min-w-0 p-3 sm:p-5 lg:p-6">
              <div className="relative flex min-h-[32rem] items-center justify-center overflow-hidden rounded-xl bg-ivory sm:min-h-[42rem]">
                <LockedPreview
                  label="floor plan"
                  buttonLabel="Unlock Floor Plan"
                  onUnlock={requestPlan}
                >
                  <motion.img
                    key={selected.id}
                    src={selected.image}
                    alt={selected.imageAlt}
                    width={selected.imageWidth}
                    height={selected.imageHeight}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0.55 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    className="mx-auto h-auto max-h-[78svh] min-h-[32rem] w-full object-contain sm:min-h-[42rem]"
                  />
                </LockedPreview>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-4">
                <div className="min-w-0">
                  <p className="eyebrow text-terracotta">
                    {selected.style === "sundeck" ? "Sundeck apartments" : "Centre balcony"}
                  </p>
                  <p className="mt-1 text-sm text-ivory/70">{selected.floors}</p>
                </div>
                <button
                  type="button"
                  onClick={requestPlan}
                  className="btn btn-light !px-4 !py-2.5 !text-xs"
                >
                  Request this plan
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:gap-14">
          <Reveal className="min-w-0">
            <figure className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-charcoal/8">
              <button
                type="button"
                onClick={() => setMasterPlanOpen(true)}
                className="group relative block w-full cursor-zoom-in"
                aria-label="Enlarge master plan"
              >
                <img
                  src={masterPlan.src}
                  alt={masterPlan.alt}
                  width={1616}
                  height={1266}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-contain"
                />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-forest-dark/90 px-4 py-2.5 text-xs font-medium text-ivory shadow-lg transition group-hover:bg-forest">
                  <Maximize2 size={14} /> Enlarge master plan
                </span>
              </button>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow text-terracotta">Master Plan</p>
            <h3 className="display-2 mt-4 text-forest-dark">Eight towers, one landscape.</h3>
            <p className="mt-5 leading-relaxed text-muted">
              The brochure’s master plan places the towers around the perimeter and gives the
              centre to landscape and water. More than 82% of the 24 acres is open space, per
              the brochure.
            </p>
            <p className="mt-6 text-[0.8rem] leading-relaxed text-muted">
              Rates from <span className="tnum font-medium text-forest-dark">{inr(8499)}</span>{" "}
              per sq. ft. — request the price sheet for details.
            </p>
          </Reveal>
        </div>
      </div>
      <Lightbox
        items={[masterPlan]}
        index={masterPlanOpen ? 0 : null}
        onClose={() => setMasterPlanOpen(false)}
        onNavigate={() => setMasterPlanOpen(false)}
        label="Master plan viewer"
      />
    </Section>
  );
}
