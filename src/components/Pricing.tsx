import { Globe, Mail, Phone } from "lucide-react";
import { priceSheetContact, pricingIntro } from "../data/pricing";
import { useEnquiry, LockedPreview } from "./Enquiry";
import { Reveal, Section, SectionHead } from "./ui";

export default function Pricing() {
  const { openEnquiry } = useEnquiry();

  return (
    <Section id="pricing" tone="ivory" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow={pricingIntro.eyebrow}
          title={pricingIntro.title}
          lede="Request the supplied price sheet for the current listed rates, charges and terms. Prices and availability require confirmation with the sales team."
        />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-8">
          <Reveal className="h-full min-w-0">
            <figure className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-charcoal/8">
              <div className="flex min-h-[30rem] flex-1 items-center justify-center bg-forest-dark/[0.03] p-4 sm:min-h-[36rem] lg:min-h-0">
                <div className="w-full max-w-[42rem]">
                  <LockedPreview
                    label="price sheet"
                    buttonLabel="Unlock Price Sheet"
                    onUnlock={() =>
                      openEnquiry({ type: "Price Sheet Request" })
                    }
                  >
                    <img
                      src="/assets/pricing/price-sheet.webp"
                      alt="The supplied Rajapushpa Imperia price sheet, including prices, charges, payment schedule and terms"
                      width={1058}
                      height={1487}
                      loading="lazy"
                      decoding="async"
                      className="block max-h-[42rem] w-full object-contain"
                    />
                  </LockedPreview>
                </div>
              </div>
              <figcaption className="border-t border-charcoal/8 px-5 py-4 text-[0.78rem] leading-relaxed text-muted sm:px-7">
                The original supplied price sheet is shown at its natural aspect ratio. Its
                rates are subject to change and must be confirmed before purchase.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1} className="h-full min-w-0">
            <div className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-charcoal/8 sm:p-6 lg:p-7">
              <div className="flex flex-1 flex-col justify-center">
                <p className="eyebrow text-forest-dark">Price Sheet Request</p>
                <h3 className="display-2 mt-4 text-forest-dark">
                  Ask for the latest details.
                </h3>
                <p className="mt-4 leading-relaxed text-muted">
                  The price sheet contains the project’s listed rates and conditions. Submit
                  the request to open a pre-filled WhatsApp message for you to review and send.
                </p>
                <button
                  type="button"
                  onClick={() => openEnquiry({ type: "Price Sheet Request" })}
                  className="btn btn-accent mt-7 w-full sm:w-auto"
                >
                  Request Price Sheet
                </button>
              </div>

              <div className="mt-8 space-y-4 border-t border-charcoal/10 pt-6">
                <a
                  href={priceSheetContact.phoneHref}
                  className="flex items-center gap-3 text-sm font-medium text-forest-dark transition hover:text-forest"
                >
                  <Phone size={15} className="shrink-0 text-terracotta" />
                  <span className="tnum">{priceSheetContact.phone}</span>
                </a>
                <a
                  href={priceSheetContact.emailHref}
                  className="flex items-center gap-3 break-all text-sm font-medium text-forest-dark transition hover:text-forest"
                >
                  <Mail size={15} className="shrink-0 text-terracotta" />
                  {priceSheetContact.email}
                </a>
                <a
                  href={priceSheetContact.websiteHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 text-sm font-medium text-forest-dark transition hover:text-forest"
                >
                  <Globe size={15} className="shrink-0 text-terracotta" />
                  {priceSheetContact.website}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 border-t border-charcoal/10 pt-6 text-[0.82rem] leading-relaxed text-muted">
            {pricingIntro.disclaimer}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
