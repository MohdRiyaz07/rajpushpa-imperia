import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, RotateCcw, Calculator } from "lucide-react";
import { floorPlanSheets } from "../data/floorPlans";
import {
  chargeRows,
  inr,
  paymentSchedule,
  phases,
  possessionCharges,
} from "../data/pricing";
import { Reveal, Section, SectionHead } from "./ui";

/** Per-sft charge lookup from the price sheet. */
const rate = (label: string) => chargeRows.find((r) => r.label === label)!.rate;

const FLOOR_RISE = rate("Floor Rise Charges");
const FACING = rate("East / North Facing Charges");
const CORNER = rate("Corner Apartment Charges");
const VIEW = rate("View Premium Charges");
const COURTYARD = rate("Courtyard View Charges");
const WEG = rate("W.E.G.");
const PARKING = rate("Car Parking: Double Back to Back");
const CLUBHOUSE = rate("Towards Club house");
const LEGAL = rate("Legal & Documentation Charges");

interface Line {
  label: string;
  detail?: string;
  amount: number;
}

interface UnitOption {
  key: string;
  group: string;
  unit: number;
  saleable: number;
  facing: string;
}

const allUnits: UnitOption[] = floorPlanSheets.flatMap((s) =>
  s.units.map((u) => ({
    key: `${s.id}-${u.unit}`,
    group: `${s.towers.join(" & ")} · ${s.style === "sundeck" ? "Sundeck" : "Centre balcony"}`,
    unit: u.unit,
    saleable: u.saleable,
    facing: u.facing,
  }))
);

/**
 * Cost estimator.
 *
 * Every rate comes from `chargeRows` in src/data/pricing.ts, which is a verbatim
 * transcription of the supplied price sheet. Where the sheet is silent (GST
 * rate, stamp duty, registration) nothing is computed. Where the sheet is
 * ambiguous — how the ₹20 floor-rise is applied, and what "sale consideration"
 * includes — the convention is stated on screen and can be switched.
 */
export default function CostEstimator() {
  const [unitKey, setUnitKey] = useState(allUnits[0].key);
  const [phaseId, setPhaseId] = useState<(typeof phases)[number]["id"]>("phase-2");
  const [floor, setFloor] = useState(12);
  const [corner, setCorner] = useState(false);
  const [viewPremium, setViewPremium] = useState(false);
  const [courtyard, setCourtyard] = useState(false);
  const [parking, setParking] = useState(true);
  const [clubhouse, setClubhouse] = useState(true);
  const [legal, setLegal] = useState(true);
  const [registrationCharges, setRegistrationCharges] = useState(false);
  const [riseMode, setRiseMode] = useState<"per-floor" | "flat">("per-floor");

  const unit = allUnits.find((u) => u.key === unitKey) ?? allUnits[0];
  const phase = phases.find((p) => p.id === phaseId) ?? phases[1];
  const area = unit.saleable;
  const eastOrNorth = unit.facing === "East" || unit.facing === "North";

  const reset = () => {
    setUnitKey(allUnits[0].key);
    setPhaseId("phase-2");
    setFloor(12);
    setCorner(false);
    setViewPremium(false);
    setCourtyard(false);
    setParking(true);
    setClubhouse(true);
    setLegal(true);
    setRegistrationCharges(false);
    setRiseMode("per-floor");
  };

  const { considerationLines, otherLines, registrationLines, totals } = useMemo(() => {
    const base = phase.rate * area;

    const riseFloors =
      floor < 5 ? 0 : riseMode === "per-floor" ? floor - 4 : 1;
    const floorRise = FLOOR_RISE * riseFloors * area;

    const consideration: Line[] = [
      {
        label: "Base price",
        detail: `₹ ${phase.rate.toLocaleString("en-IN")} × ${area.toLocaleString("en-IN")} sft · ${phase.label}`,
        amount: base,
      },
      {
        label: "Floor rise",
        detail:
          floor < 5
            ? `₹ ${FLOOR_RISE}/sft applies from the 5th floor — not applied on floor ${floor}`
            : riseMode === "per-floor"
              ? `₹ ${FLOOR_RISE}/sft × ${riseFloors} floor${riseFloors > 1 ? "s" : ""} of rise (floor ${floor} − 4)`
              : `₹ ${FLOOR_RISE}/sft applied flat from the 5th floor onwards`,
        amount: floorRise,
      },
      {
        label: "East / North facing",
        detail: eastOrNorth
          ? `₹ ${FACING}/sft · ${unit.facing}-facing unit`
          : `Not applied — ${unit.facing}-facing units are not charged on the price sheet`,
        amount: eastOrNorth ? FACING * area : 0,
      },
      {
        label: "Corner apartment",
        detail: `₹ ${CORNER}/sft`,
        amount: corner ? CORNER * area : 0,
      },
      {
        label: "View premium",
        detail: `₹ ${VIEW}/sft`,
        amount: viewPremium ? VIEW * area : 0,
      },
      {
        label: "Courtyard view",
        detail: `₹ ${COURTYARD}/sft`,
        amount: courtyard ? COURTYARD * area : 0,
      },
    ];

    const other: Line[] = [
      {
        label: "W.E.G.",
        detail: `Water, Electricity, Gas, Infrastructure & Copper Pipping · ₹ ${WEG}/sft`,
        amount: WEG * area,
      },
      {
        label: "Car parking (double back to back)",
        detail: "One-time",
        amount: parking ? PARKING : 0,
      },
      {
        label: "Towards club house",
        detail: "One-time",
        amount: clubhouse ? CLUBHOUSE : 0,
      },
      {
        label: "Legal & documentation charges",
        detail: "One-time",
        amount: legal ? LEGAL : 0,
      },
    ];

    const registration: Line[] = [
      {
        label: "Corpus fund",
        detail: possessionCharges.corpusFund.value,
        amount: registrationCharges ? possessionCharges.corpusFund.rate * area : 0,
      },
      {
        label: "Advance maintenance charges",
        detail: `${possessionCharges.advanceMaintenance.value} — ${possessionCharges.whenToPay}`,
        amount: registrationCharges
          ? possessionCharges.advanceMaintenance.rate *
            possessionCharges.advanceMaintenance.months *
            area
          : 0,
      },
    ];

    const considerationTotal = consideration.reduce((n, l) => n + l.amount, 0);
    const otherTotal = other.reduce((n, l) => n + l.amount, 0);
    const registrationTotal = registration.reduce((n, l) => n + l.amount, 0);

    return {
      considerationLines: consideration,
      otherLines: other,
      registrationLines: registration,
      totals: {
        considerationTotal,
        otherTotal,
        registrationTotal,
        total: considerationTotal + otherTotal + registrationTotal,
        tds: considerationTotal * 0.01,
      },
    };
  }, [phase, area, floor, riseMode, unit.facing, eastOrNorth, corner, viewPremium, courtyard, parking, clubhouse, legal, registrationCharges]);

  const effectiveRate = totals.considerationTotal / area;

  return (
    <Section id="estimator" tone="ivory" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Cost Estimator"
          title="Build your own number."
          lede="Pick a unit straight from the brochure’s area statements, set the floor and the optional charges, and the estimator itemises every line using only the rates printed on the price sheet."
        />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-6">
          {/* Inputs */}
          <Reveal className="h-full min-w-0">
            <form
              className="h-full min-w-0 rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm sm:p-6 md:p-7"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Estimator inputs"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="display-3 text-forest-dark">Your selection</h3>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-muted transition hover:text-forest-dark"
                >
                  <RotateCcw size={13} /> Reset
                </button>
              </div>

              <div className="mt-7 space-y-6">
                <div>
                  <label className="label" htmlFor="est-unit">
                    Unit (from the brochure area statements)
                  </label>
                  <select
                    id="est-unit"
                    className="field"
                    value={unitKey}
                    onChange={(e) => setUnitKey(e.target.value)}
                  >
                    {floorPlanSheets.map((sheet) => (
                      <optgroup
                        key={sheet.id}
                        label={`${sheet.towers.join(" & ")} — ${
                          sheet.style === "sundeck" ? "Sundeck" : "Centre balcony"
                        }`}
                      >
                        {sheet.units.map((u) => (
                          <option
                            key={`${sheet.id}-${u.unit}`}
                            value={`${sheet.id}-${u.unit}`}
                          >
                            Unit {u.unit} · {u.saleable.toLocaleString("en-IN")} sft ·{" "}
                            {u.facing}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <p className="mt-2 text-[0.76rem] text-muted">
                    Saleable area {area.toLocaleString("en-IN")} sft · {unit.facing} facing
                  </p>
                </div>

                <fieldset>
                  <legend className="label">Phase</legend>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {phases.map((p) => (
                      <label
                        key={p.id}
                        className={`cursor-pointer rounded-xl border p-4 transition ${
                          phaseId === p.id
                            ? "border-forest bg-white ring-1 ring-forest"
                            : "border-charcoal/12 bg-white/60 hover:border-forest/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="phase"
                          className="sr-only"
                          value={p.id}
                          checked={phaseId === p.id}
                          onChange={() => setPhaseId(p.id)}
                        />
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="text-[0.85rem] font-semibold text-forest-dark">
                            {p.label}
                          </span>
                          <span className="tnum text-[0.9rem] font-semibold text-terracotta">
                            ₹ {p.rate.toLocaleString("en-IN")}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-[0.75rem] leading-snug text-muted">
                          {p.note}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label className="label" htmlFor="est-floor">
                    Floor
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="est-floor"
                      type="range"
                      min={1}
                      max={40}
                      value={floor}
                      onChange={(e) => setFloor(Number(e.target.value))}
                      className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-charcoal/15 accent-terracotta"
                    />
                    <output
                      htmlFor="est-floor"
                      className="tnum w-12 rounded-lg bg-white px-2 py-1 text-center text-[0.85rem] font-semibold text-forest-dark ring-1 ring-charcoal/12"
                    >
                      {floor}
                    </output>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[0.75rem] text-muted">Floor-rise basis:</span>
                    {(
                      [
                        ["per-floor", "₹20 × floors of rise"],
                        ["flat", "₹20 flat from 5th"],
                      ] as ["per-floor" | "flat", string][]
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRiseMode(value)}
                        aria-pressed={riseMode === value}
                        className={`rounded-full border px-3 py-1 text-[0.72rem] font-medium transition ${
                          riseMode === value
                            ? "border-forest bg-forest text-ivory"
                            : "border-charcoal/15 bg-white text-charcoal/70 hover:border-forest/40"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <fieldset>
                  <legend className="label">Optional per-sft charges</legend>
                  <div className="space-y-2.5">
                    {[
                      {
                        id: "corner",
                        label: "Corner apartment",
                        rate: CORNER,
                        checked: corner,
                        set: setCorner,
                      },
                      {
                        id: "view",
                        label: "View premium",
                        rate: VIEW,
                        checked: viewPremium,
                        set: setViewPremium,
                      },
                      {
                        id: "courtyard",
                        label: "Courtyard view",
                        rate: COURTYARD,
                        checked: courtyard,
                        set: setCourtyard,
                      },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-charcoal/12 bg-white px-4 py-3 transition hover:border-forest/40"
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-forest"
                            checked={opt.checked}
                            onChange={(e) => opt.set(e.target.checked)}
                          />
                          <span className="text-[0.86rem] text-charcoal">{opt.label}</span>
                        </span>
                        <span className="tnum text-[0.8rem] text-muted">
                          ₹ {opt.rate}/sft
                        </span>
                      </label>
                    ))}
                    {!eastOrNorth && (
                      <p className="flex gap-2 text-[0.76rem] leading-relaxed text-muted">
                        <Info size={14} className="mt-0.5 shrink-0 text-terracotta" />
                        The East/North facing charge is not applied — this unit is{" "}
                        {unit.facing}-facing.
                      </p>
                    )}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="label">One-time charges</legend>
                  <div className="space-y-2.5">
                    {[
                      {
                        id: "parking",
                        label: "Car parking (double back to back)",
                        rate: PARKING,
                        checked: parking,
                        set: setParking,
                      },
                      {
                        id: "clubhouse",
                        label: "Towards club house",
                        rate: CLUBHOUSE,
                        checked: clubhouse,
                        set: setClubhouse,
                      },
                      {
                        id: "legal",
                        label: "Legal & documentation",
                        rate: LEGAL,
                        checked: legal,
                        set: setLegal,
                      },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-charcoal/12 bg-white px-4 py-3 transition hover:border-forest/40"
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-forest"
                            checked={opt.checked}
                            onChange={(e) => opt.set(e.target.checked)}
                          />
                          <span className="text-[0.86rem] text-charcoal">{opt.label}</span>
                        </span>
                        <span className="tnum text-[0.8rem] text-muted">
                          {inr(opt.rate)}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-charcoal/12 bg-white px-4 py-3.5 transition hover:border-forest/40">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-forest"
                    checked={registrationCharges}
                    onChange={(e) => setRegistrationCharges(e.target.checked)}
                  />
                  <span>
                    <span className="block text-[0.86rem] text-charcoal">
                      Include corpus fund &amp; advance maintenance
                    </span>
                    <span className="mt-0.5 block text-[0.76rem] leading-relaxed text-muted">
                      {possessionCharges.corpusFund.value} and{" "}
                      {possessionCharges.advanceMaintenance.value}, payable{" "}
                      {possessionCharges.whenToPay}.
                    </span>
                  </span>
                </label>
              </div>
            </form>
          </Reveal>

          {/* Breakdown */}
          <Reveal delay={0.1} className="h-full min-w-0">
            <div className="h-full">
              <div className="h-full overflow-hidden rounded-2xl bg-forest-dark text-ivory">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/12 px-5 py-5 sm:px-6 md:px-8">
                  <div className="flex items-center gap-3">
                    <Calculator size={18} className="text-terracotta" />
                    <h3 className="display-3 text-ivory">Estimate breakdown</h3>
                  </div>
                  <span className="rounded-full border border-ivory/15 px-3 py-1 text-[0.68rem] uppercase tracking-[0.12em] text-ivory/55">
                    Indicative
                  </span>
                </div>

                <div className="px-5 py-6 sm:px-6 md:px-8">
                  <p className="text-[0.72rem] uppercase tracking-[0.16em] text-ivory/50">
                    Sale consideration
                  </p>
                  <ul className="mt-3.5 space-y-3">
                    {considerationLines.map((l) => (
                      <li key={l.label} className="flex items-baseline justify-between gap-5">
                        <span className="min-w-0">
                          <span className="block text-[0.87rem] text-ivory/90">{l.label}</span>
                          {l.detail && (
                            <span className="mt-0.5 block text-[0.73rem] leading-snug text-ivory/50">
                              {l.detail}
                            </span>
                          )}
                        </span>
                        <span
                          className={`tnum shrink-0 text-[0.9rem] ${
                            l.amount === 0 ? "text-ivory/30" : "font-semibold text-ivory"
                          }`}
                        >
                          {l.amount === 0 ? "—" : inr(l.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-baseline justify-between gap-5 border-t border-ivory/12 pt-4">
                    <span className="text-[0.8rem] uppercase tracking-[0.1em] text-ivory/60">
                      Sub-total
                    </span>
                    <span className="tnum text-[1.05rem] font-semibold text-ivory">
                      {inr(totals.considerationTotal)}
                    </span>
                  </div>

                  <p className="mt-7 text-[0.72rem] uppercase tracking-[0.16em] text-ivory/50">
                    Other charges
                  </p>
                  <ul className="mt-3.5 space-y-3">
                    {otherLines.map((l) => (
                      <li key={l.label} className="flex items-baseline justify-between gap-5">
                        <span className="min-w-0">
                          <span className="block text-[0.87rem] text-ivory/90">{l.label}</span>
                          {l.detail && (
                            <span className="mt-0.5 block text-[0.73rem] leading-snug text-ivory/50">
                              {l.detail}
                            </span>
                          )}
                        </span>
                        <span
                          className={`tnum shrink-0 text-[0.9rem] ${
                            l.amount === 0 ? "text-ivory/30" : "font-semibold text-ivory"
                          }`}
                        >
                          {l.amount === 0 ? "—" : inr(l.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <AnimatePresence initial={false}>
                    {registrationCharges && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-7 text-[0.72rem] uppercase tracking-[0.16em] text-ivory/50">
                          Payable before registration
                        </p>
                        <ul className="mt-3.5 space-y-3">
                          {registrationLines.map((l) => (
                            <li
                              key={l.label}
                              className="flex items-baseline justify-between gap-5"
                            >
                              <span className="min-w-0">
                                <span className="block text-[0.87rem] text-ivory/90">
                                  {l.label}
                                </span>
                                {l.detail && (
                                  <span className="mt-0.5 block text-[0.73rem] leading-snug text-ivory/50">
                                    {l.detail}
                                  </span>
                                )}
                              </span>
                              <span className="tnum shrink-0 text-[0.9rem] font-semibold text-ivory">
                                {inr(l.amount)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-7 border-t border-ivory/15 pt-5">
                    <div className="flex items-baseline justify-between gap-5">
                      <span className="text-[0.8rem] uppercase tracking-[0.1em] text-ivory/60">
                        Total before GST
                      </span>
                      <span className="tnum font-display text-[1.85rem] leading-none text-ivory">
                        {inr(totals.total)}
                      </span>
                    </div>
                    <p className="tnum mt-2 text-right text-[0.78rem] text-ivory/50">
                      ≈ {inr(effectiveRate)} per sq. ft. all-in
                    </p>
                  </div>

                  <dl className="mt-6 space-y-2.5 border-t border-ivory/12 pt-5 text-[0.8rem]">
                    <div className="flex items-baseline justify-between gap-5">
                      <dt className="text-ivory/60">GST</dt>
                      <dd className="text-right text-ivory/85">
                        {phase.id === "phase-1"
                          ? "Not applicable — Phase-1 is “No GST” on the price sheet"
                          : "Applicable — the price sheet does not state a rate"}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-5">
                      <dt className="text-ivory/60">
                        TDS @ 1% of sale consideration
                        <span className="block text-[0.72rem] text-ivory/40">
                          Buyer’s responsibility, per term 1
                        </span>
                      </dt>
                      <dd className="tnum shrink-0 font-semibold text-ivory">
                        {inr(totals.tds)}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-5">
                      <dt className="text-ivory/60">Stamp duty &amp; registration</dt>
                      <dd className="text-right text-ivory/85">
                        Not stated on the price sheet — as applicable
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

            </div>
          </Reveal>

          {/* Milestone payments */}
          <Reveal delay={0.2} className="h-full min-w-0">
            <div className="h-full rounded-2xl border border-charcoal/12 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="display-3 text-forest-dark">
                Milestone payments on this sale consideration
              </h3>
              <p className="mt-3 text-[0.78rem] leading-relaxed text-muted">
                Each step is a percentage of the sale consideration itemised above, plus
                applicable GST, exactly as the payment schedule is printed.
              </p>
              <ul className="mt-5 space-y-3">
                {paymentSchedule.map((step) => (
                  <li
                    key={step.milestone}
                    className="flex items-start justify-between gap-3 border-b border-charcoal/8 pb-3 text-[0.8rem] last:border-0"
                  >
                    <span className="min-w-0 text-charcoal/80">
                      {step.milestone}
                    </span>
                    <span className="tnum shrink-0 text-right">
                      <span className="block font-semibold text-forest-dark">
                        {inr((totals.considerationTotal * step.percent) / 100)}
                      </span>
                      <span className="text-muted">{step.percent}%</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 flex gap-2.5 rounded-xl border border-charcoal/10 bg-white/70 p-4 text-[0.78rem] leading-relaxed text-muted">
          <Info size={15} className="mt-0.5 shrink-0 text-terracotta" />
          <span>
            This estimator is an indicative calculation built only from the rates printed
            on the supplied price sheet. The sheet does not define which items form the
            “sale consideration”, so the convention used here is: base price plus the
            per-sft premiums; W.E.G. and the one-time amounts are listed separately.
            Figures require confirmation with the developer or authorized sales team.
          </span>
        </p>
      </div>
    </Section>
  );
}
