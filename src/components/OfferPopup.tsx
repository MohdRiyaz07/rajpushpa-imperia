import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { offer } from "../data/pricing";
import { project } from "../data/projectData";
import { useEnquiry } from "./Enquiry";

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { enquiryOpen, openEnquiry } = useEnquiry();
  const enquiryOpenRef = useRef(enquiryOpen);

  useEffect(() => {
    enquiryOpenRef.current = enquiryOpen;
  }, [enquiryOpen]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!enquiryOpenRef.current) setOpen(true);
    }, 3500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current
      ?.querySelector<HTMLButtonElement>("[data-offer-close]")
      ?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const requestDetails = () => {
    setOpen(false);
    openEnquiry({
      type: "Project Details Request",
      details: `${offer.headline} · ${offer.options.map((option) => option.phase).join(" and ")}`,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-forest-dark/80 p-4 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <motion.section
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-popup-title"
            className="relative my-auto grid w-full max-w-6xl overflow-hidden rounded-2xl bg-ivory shadow-2xl md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="relative min-h-52 bg-forest-dark md:min-h-[38rem]">
              <img
                src={offer.image}
                alt={offer.imageAlt}
                width={1254}
                height={1254}
                className="absolute inset-0 h-full w-full object-contain"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/75 via-transparent to-forest-dark/10" />
              <p className="eyebrow absolute bottom-5 left-5 text-ivory">
                {project.name} · Tellapur
              </p>
            </div>

            <div className="relative p-6 sm:p-8 md:p-10">
              <button
                type="button"
                data-offer-close
                onClick={() => setOpen(false)}
                aria-label="Close offer"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-charcoal/10 text-muted transition hover:bg-white hover:text-forest-dark sm:right-6 sm:top-6"
              >
                <X size={18} />
              </button>
              <p className="eyebrow pr-12 text-terracotta">{offer.eyebrow}</p>
              <h2
                id="offer-popup-title"
                className="display-2 mt-4 max-w-xl text-forest-dark"
              >
                {offer.headline}
              </h2>
              <p className="mt-3 text-sm font-medium text-forest">
                {offer.locationLine}
              </p>
              <p className="mt-1 text-sm text-muted">{offer.configurations}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {offer.options.map((option) => (
                  <div
                    key={option.id}
                    className="rounded-xl border border-charcoal/10 bg-white p-4"
                  >
                    <span className="eyebrow text-terracotta">{option.phase}</span>
                    <h3 className="mt-2 text-sm font-semibold leading-snug text-forest-dark">
                      {option.title}
                    </h3>
                    <p className="mt-2 text-[0.74rem] leading-relaxed text-muted">
                      {option.lines[0]}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={requestDetails}
                className="btn btn-accent mt-6 w-full sm:w-auto"
              >
                Enquire about this offer <ArrowRight size={15} />
              </button>
              <p className="mt-4 text-[0.72rem] leading-relaxed text-muted">
                {offer.caveat}
              </p>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
