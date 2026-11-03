import {
  BadgeIndianRupee,
  BriefcaseBusiness,
  Building2,
  CarFront,
  House,
  KeyRound,
  LandPlot,
  MoveVertical,
  PanelsTopLeft,
  Sun,
  Trees,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { project, projectHighlights } from "../data/projectData";

const highlightIcons: Record<(typeof projectHighlights)[number]["icon"], LucideIcon> = {
  home: House,
  land: LandPlot,
  towers: Building2,
  clubhouse: PanelsTopLeft,
  "open-space": Trees,
  pool: Waves,
  work: BriefcaseBusiness,
  sundeck: Sun,
  price: BadgeIndianRupee,
  height: MoveVertical,
  possession: KeyRound,
  charging: CarFront,
};

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-20 bg-ivory">
      <div className="bg-sage px-5 py-10 text-center text-forest-dark sm:px-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-[1.55rem] leading-snug sm:text-2xl md:text-[2rem]">
            {project.name}
            <span className="mx-2 text-terracotta">—</span>
            <span className="text-terracotta">Ready to Move 3 BHK Apartments</span>{" "}
            in Tellapur, Hyderabad
          </h2>
          <p className="mt-4 text-[0.78rem] font-medium uppercase leading-relaxed tracking-[0.08em] text-charcoal/80 sm:text-sm">
            Premium lifestyle apartments near Gachibowli, Financial District &amp; Osman Nagar
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.08em] text-muted sm:text-sm">
            {project.reraLabel}
          </p>
        </div>
      </div>

      <div
        className="px-5 py-10 sm:px-8 md:py-12"
        style={{
          backgroundColor: "#fff7f6",
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 7px, rgba(200,117,125,0.035) 7px, rgba(200,117,125,0.035) 8px), repeating-linear-gradient(-45deg, transparent, transparent 7px, rgba(200,117,125,0.035) 7px, rgba(200,117,125,0.035) 8px)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h3 className="text-center font-display text-xl uppercase leading-snug text-forest-dark sm:text-2xl">
            Rajapushpa Imperia Project Highlights
          </h3>

          <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-5 md:mt-9 md:grid-cols-4 md:gap-x-8 md:gap-y-7">
            {projectHighlights.map((item) => {
              const Icon = highlightIcons[item.icon];
              return (
                <article
                  key={item.value}
                  className="flex min-h-32 flex-col items-center justify-start px-1 text-center sm:min-h-36"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-lg border-2 border-terracotta text-terracotta sm:h-14 sm:w-14">
                    <Icon size={27} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h4 className="mt-2 text-[0.9rem] font-medium leading-tight text-charcoal sm:text-base">
                    {item.value}
                  </h4>
                  <p className="mt-1 text-[0.72rem] leading-snug text-muted sm:text-sm">
                    {item.detail}
                  </p>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
