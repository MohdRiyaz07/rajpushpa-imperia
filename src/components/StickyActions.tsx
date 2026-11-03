import { Download, MessageCircle, Send } from "lucide-react";
import { priceSheetContact } from "../data/pricing";
import { useEnquiry } from "./Enquiry";

const whatsappHref = `${priceSheetContact.whatsappHref}?text=${encodeURIComponent(
  "Hi, I would like to know more about Rajapushpa Imperia. Can you assist me?"
)}`;

export default function StickyActions() {
  const { openEnquiry } = useEnquiry();

  const enquire = () => openEnquiry({ type: "General Enquiry" });
  const requestBrochure = () =>
    openEnquiry({
      type: "Project Details Request",
      details: "Please share the Rajapushpa Imperia brochure.",
    });

  const actions = [
    { label: "Enquire", icon: Send, onClick: enquire },
    { label: "Brochure", icon: Download, onClick: requestBrochure },
  ];

  return (
    <>
      <aside
        aria-label="Quick contact actions"
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
      >
        {actions.map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className="flex min-h-[4.25rem] w-[5.25rem] flex-col items-center justify-center gap-1.5 rounded-xl border border-ivory/15 bg-forest-dark px-2 py-2 text-[0.7rem] font-medium text-ivory shadow-lg transition hover:bg-forest"
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </button>
        ))}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Chat with us on WhatsApp"
          className="flex min-h-[4.25rem] w-[5.25rem] flex-col items-center justify-center gap-1.5 rounded-xl border border-ivory/15 bg-[#168c55] px-2 py-2 text-[0.7rem] font-medium text-white shadow-lg transition hover:bg-[#117748]"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Chat
        </a>
      </aside>

      <nav
        aria-label="Quick contact actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-charcoal/10 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_18px_rgba(34,39,34,0.12)] backdrop-blur lg:hidden"
      >
        {actions.map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className="flex min-h-14 flex-col items-center justify-center gap-1 px-2 py-2 text-[0.68rem] font-semibold text-forest-dark transition hover:bg-ivory"
          >
            <Icon size={18} aria-hidden="true" />
            {label === "Brochure" ? "Download Brochure" : label}
          </button>
        ))}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Chat with us on WhatsApp"
          className="flex min-h-14 flex-col items-center justify-center gap-1 bg-[#168c55] px-2 py-2 text-[0.68rem] font-semibold text-white transition hover:bg-[#117748]"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Chat on WhatsApp
        </a>
      </nav>
    </>
  );
}
