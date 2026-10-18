import { Mail, MapPin, Phone } from "lucide-react";
import { priceSheetContact } from "../data/pricing";
import { project } from "../data/projectData";
import { EnquiryForm } from "./Enquiry";
import { Reveal, Section, SectionHead } from "./ui";

export default function Contact() {
  const contacts = [
    {
      icon: Phone,
      label: priceSheetContact.phone,
      href: priceSheetContact.phoneHref,
      note: "Call or WhatsApp",
    },
    {
      icon: Mail,
      label: priceSheetContact.email,
      href: priceSheetContact.emailHref,
      note: "For project enquiries",
    },
    {
      icon: MapPin,
      label: project.siteOfficeAddress,
      href: undefined,
      note: project.siteOfficeAddressSource,
    },
  ];

  return (
    <Section id="contact" tone="dark" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="min-w-0">
            <SectionHead
              eyebrow="Enquire"
              title="Your new beginning starts here."
              lede="Connect with our project team to explore residences, floor plans, pricing and the details that matter to you."
              tone="light"
            />
            <Reveal delay={0.1}>
              <ul className="mt-9 space-y-4">
                {contacts.map((contact) => (
                  <li
                    key={contact.label}
                    className="flex gap-4 border-b border-ivory/10 pb-4"
                  >
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-terracotta/15 text-rose-100">
                      <contact.icon size={16} />
                    </span>
                    <span className="min-w-0">
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className={`block text-[0.98rem] font-medium text-ivory transition hover:text-rose-100 ${
                            contact.icon === Mail ? "break-all" : "break-words"
                          }`}
                        >
                          {contact.label}
                        </a>
                      ) : (
                        <span className="block break-words text-[0.98rem] font-medium text-ivory">
                          {contact.label}
                        </span>
                      )}
                      <span className="mt-0.5 block text-[0.76rem] leading-relaxed text-ivory/85">
                        {contact.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="min-w-0">
            <div className="rounded-2xl border border-ivory/12 bg-forest/55 p-6 shadow-xl sm:p-8 md:p-9">
              <p className="eyebrow text-rose-100">Get in touch</p>
              <h3 className="display-2 mt-4 text-ivory">Request a private callback.</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ivory/85">
                Complete the form to prepare a WhatsApp enquiry for the project contact.
              </p>
              <div className="mt-7">
                <EnquiryForm
                  idPrefix="contact"
                  variant="section"
                  request={{ type: "Project Details Request" }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
