import { motion, useReducedMotion } from "framer-motion";
import { project, residenceSummary } from "../data/projectData";

/**
 * Full-bleed cinematic hero.
 *
 * Uses the strongest tower render from the brochure with a restrained bottom
 * scrim so the headline stays legible without flattening the image.
 */
export default function Hero() {
  const reduced = useReducedMotion();

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
    <section id="hero" className="relative isolate min-h-[78svh] overflow-hidden bg-forest-dark md:min-h-[82svh]">
      <img
        src="/assets/hero/hero-towers.webp"
        srcSet="/assets/hero/hero-towers-640.webp 640w, /assets/hero/hero-towers-768.webp 768w, /assets/hero/hero-towers-960.webp 960w, /assets/hero/hero-towers-1280.webp 1280w, /assets/hero/hero-towers-1600.webp 1600w, /assets/hero/hero-towers.webp 2200w"
        sizes="100vw"
        width={2200}
        height={1557}
        alt="Architectural render of the Rajapushpa Imperia residential towers at dusk, within Rajapushpa Lifestyle City"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        decoding="async"
      />

      {/* Scrims: bottom-weighted for the headline, light top wash for the header. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(52,17,23,0.72)_0%,rgba(52,17,23,0.36)_32%,rgba(52,17,23,0.52)_62%,rgba(52,17,23,0.92)_100%)]"
      />

      <div className="container-x relative flex min-h-[78svh] flex-col justify-end pb-12 pt-28 md:min-h-[82svh] md:pb-14 md:pt-32">
        <div className="max-w-4xl">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
            className="display-1 mt-5 !text-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
          >
            {project.name}
          </motion.h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 flex max-w-4xl flex-col gap-2 text-[0.94rem] font-medium text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 md:text-base"
          >
            <span>From {residenceSummary.startingPrice}</span>
            <span>{residenceSummary.types} · {residenceSummary.sizeRange}</span>
            <span>{project.locationLine}</span>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <button type="button" onClick={() => goTo("contact")} className="btn btn-accent">
              Enquire Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
