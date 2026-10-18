import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { footerDisclaimer, project, stats } from "../data/projectData";
import { offer, priceSheetContact } from "../data/pricing";
import { navItems } from "./Header";
import { useEnquiry } from "./Enquiry";
import BrandLockup from "./BrandLockup";

/**
 * Footer — brand lockup, section links, printed contact details, RERA line and
 * the required standing disclaimer.
 */
export default function Footer() {
  const { openEnquiry } = useEnquiry();
  const goTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <footer className="bg-forest-dark text-ivory">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          {/* Brand */}
          <div>
            <BrandLockup size="footer" />
            <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-ivory/85">
              {project.coverLocationLine} — {project.context}. {stats[0].value} acres,{" "}
              {stats[1].value} towers, {stats[2].value} floors.
            </p>

            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="tnum font-display text-[1.5rem] leading-none text-ivory">
                    {s.value}
                    <span className="ml-2 font-sans text-[0.7rem] font-normal uppercase tracking-[0.12em] text-ivory/85">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <p className="eyebrow text-rose-100">Explore</p>
            <ul className="mt-5 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => goTo(item.id)}
                    className="text-[0.9rem] text-ivory/70 transition hover:text-ivory"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => openEnquiry({ type: "General Enquiry" })}
                  className="text-[0.9rem] text-rose-100 transition hover:text-ivory"
                >
                  Enquire Now
                </button>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="eyebrow text-rose-100">Contact</p>
            <ul className="mt-5 space-y-4 text-[0.9rem]">
              <li className="flex gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-ivory/85" />
                <span>
                  <a
                    href={priceSheetContact.phoneHref}
                    className="tnum block font-medium text-ivory transition hover:text-rose-100"
                  >
                    {priceSheetContact.phone}
                  </a>
                  <span className="text-[0.76rem] text-ivory/85">Call or WhatsApp</span>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="mt-0.5 shrink-0 text-ivory/85" />
                <span>
                  <a
                    href={priceSheetContact.emailHref}
                    className="block break-all font-medium text-ivory transition hover:text-rose-100"
                  >
                    {priceSheetContact.email}
                  </a>
                  <a
                    href={priceSheetContact.websiteHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[0.76rem] text-ivory/85 underline-offset-4 hover:underline"
                  >
                    {priceSheetContact.website}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-ivory/85" />
                <span className="leading-relaxed text-ivory/90">
                  {project.siteOfficeAddress}
                </span>
              </li>
            </ul>

            <a
              href={offer.reraHref}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-block border-t border-ivory/12 pt-4 text-[0.78rem] leading-relaxed text-ivory/85 underline-offset-4 transition hover:text-ivory hover:underline"
            >
              {project.reraLabel}
              <br />
              {offer.reraSite}
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-14 border-t border-ivory/12 pt-8">
          <p className="max-w-6xl text-[0.78rem] leading-relaxed text-ivory/85">
            {footerDisclaimer}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.78rem] text-ivory/85">
              © {new Date().getFullYear()} {project.name} — an informational project page by{" "}
              {project.developer}. Not the official developer website.
            </p>
            <button
              type="button"
              onClick={goTop}
              className="group inline-flex items-center gap-2 self-start text-[0.78rem] uppercase tracking-[0.14em] text-ivory/85 transition hover:text-ivory"
            >
              Back to top
              <span className="grid h-8 w-8 place-items-center rounded-full border border-ivory/25 transition group-hover:border-ivory/60">
                <ArrowUp size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
