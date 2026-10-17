import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { project, stats } from "../data/projectData";
import { offer } from "../data/pricing";
import { useEnquiry } from "./Enquiry";

/**
 * Full-bleed cinematic hero.
 *
 * Uses the strongest tower render from the brochure with a restrained bottom
 * scrim so the headline stays legible without flattening the image.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const { openEnquiry } = useEnquiry();

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({
      top: y,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section id="hero" className="relative isolate min-h-[100svh] overflow-hidden bg-forest-dark">
      <img
        src="/assets/hero/hero-towers.webp"
        alt="Architectural render of the Rajapushpa Imperia residential towers at dusk, within Rajapushpa Lifestyle City"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        decoding="async"
      />

      {/* Scrims: bottom-weighted for the headline, light top wash for the header. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,43,34,0.62)_0%,rgba(11,43,34,0.16)_28%,rgba(11,43,34,0.30)_58%,rgba(11,43,34,0.88)_100%)]"
      />

      <div className="container-x relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="max-w-4xl">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
            className="display-1 mt-5 #c77948"
          >
            Space to live.
            <br />
            <span className="italic text-ivory/90">Room to belong.</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-ivory/80 md:text-[1.1rem]"
          >
            {project.name} is a 24-acre development of 8 towers and 40 floors inside
            Rajapushpa Lifestyle City at Tellapur — where the brochure leaves more than
            82% of the ground open, and every home looks onto landscape.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button type="button" onClick={() => goTo("residences")} className="btn btn-accent">
              Explore Residences
            </button>
            <button
              type="button"
              onClick={() =>
                openEnquiry({ type: "Project Details Request" })
              }
              className="btn btn-light"
            >
              Request Project Details
            </button>
          </motion.div>
        </div>

        {/* Verified headline figures, straight from the brochure. */}
        <motion.dl
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-ivory/15 pt-8 sm:grid-cols-4 md:mt-16"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="tnum block font-display text-[2.1rem] leading-none text-ivory md:text-[2.6rem]">
                  {s.value}
                </span>
                <span className="mt-2 block text-[0.8rem] uppercase tracking-[0.14em] text-ivory/60">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="text-xs uppercase tracking-[0.16em] text-ivory/55">
            {project.reraLabel}
          </p>

          <button
            type="button"
            onClick={() => goTo("overview")}
            className="group hidden items-center gap-2 text-xs uppercase tracking-[0.16em] text-ivory/60 transition hover:text-ivory md:flex"
          >
            Scroll
            <span className="grid h-9 w-9 place-items-center rounded-full border border-ivory/25 transition group-hover:border-ivory/60">
              <ArrowDown size={15} className="animate-bounce" />
            </span>
          </button>

          <p className="text-xs uppercase tracking-[0.16em] text-ivory/55">
            {offer.configurations}
          </p>
        </div>
      </div>
    </section>
  );
}
