import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { project } from "../data/projectData";
import { priceSheetContact } from "../data/pricing";
import { useEnquiry } from "./Enquiry";
import BrandLockup from "./BrandLockup";

export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "offer", label: "Offers" },
  { id: "residences", label: "Residences" },
  { id: "amenities", label: "Amenities" },
  { id: "floor-plans", label: "Floor Plans" },
  { id: "pricing", label: "Pricing" },
  { id: "location", label: "Location" },
  { id: "gallery", label: "Gallery" },
];

/** Pixels of clearance left above a scroll target so headings clear the header. */
export const SCROLL_OFFSET = 84;

/**
 * Sticky site header.
 *
 * Transparent over the hero, then solid ivory with a hairline once the page is
 * scrolled. Tracks the section currently in view so the nav highlights the
 * active one. Mobile collapses to a right-hand drawer.
 */
export default function Header() {
  const { openEnquiry } = useEnquiry();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({
      top: y,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const light = !scrolled && !open;

  return (
    <>
      <a
        href="#overview"
        onClick={(e) => {
          e.preventDefault();
          goTo("overview");
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-ivory/95 shadow-[0_1px_0_rgba(34,39,34,0.08)] backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-4 md:h-[84px]">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 text-left"
            aria-label={`${project.name} — back to top`}
          >
            <BrandLockup light={light} />
          </button>

          <nav className="hidden items-center gap-0 xl:flex" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-2 py-2 text-[0.86rem] font-medium transition-colors ${
                    light
                      ? isActive
                        ? "text-ivory"
                        : "text-ivory/75 hover:text-ivory"
                      : isActive
                        ? "text-forest-dark"
                        : "text-charcoal/70 hover:text-forest-dark"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute inset-x-3.5 -bottom-0.5 h-px bg-terracotta"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={priceSheetContact.phoneHref}
              className={`hidden items-center gap-1.5 text-[0.76rem] font-medium 2xl:flex ${
                light ? "text-ivory/85 hover:text-ivory" : "text-charcoal/75 hover:text-forest-dark"
              } transition`}
            >
              <Phone size={15} />
              <span className="tnum">{priceSheetContact.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => openEnquiry({ type: "General Enquiry" })}
              className="btn btn-accent hidden !px-4 !py-2.5 !text-[0.78rem] xl:inline-flex"
            >
              Enquire Now
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`grid h-11 w-11 place-items-center rounded-full border transition xl:hidden ${
                light
                  ? "border-ivory/35 text-ivory"
                  : "border-charcoal/15 text-forest-dark"
              }`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ivory pt-[68px] xl:hidden"
          >
            <motion.nav
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
              aria-label="Mobile"
              className="container-x flex h-full flex-col overflow-y-auto pb-10 pt-6"
            >
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => goTo(item.id)}
                      className="flex w-full items-center justify-between border-b border-charcoal/10 py-4 text-left"
                    >
                      <span className="display-3 text-forest-dark">{item.label}</span>
                      <span className="eyebrow text-terracotta">
                        {String(navItems.indexOf(item) + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openEnquiry({ type: "General Enquiry" });
                  }}
                  className="btn btn-accent w-full"
                >
                  Enquire Now
                </button>
                <a href={priceSheetContact.phoneHref} className="btn btn-ghost w-full">
                  <Phone size={15} />
                  <span className="tnum">{priceSheetContact.phone}</span>
                </a>
              </div>

              <p className="mt-8 text-xs leading-relaxed text-muted">
                {project.reraLabel}
              </p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
