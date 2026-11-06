import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Lock, Mail, X } from "lucide-react";
import { project } from "../data/projectData";

/* ------------------------------------------------------------------ */
/* Shared enquiry modal and form state.                                 */
/* ------------------------------------------------------------------ */

const DRAFT_KEY = "rajapushpa-imperia-enquiry-draft";

export interface EnquiryRequest {
  type: "General Enquiry" | "Floor Plan Request" | "Price Sheet Request" | "Project Details Request";
  details?: string;
}

interface EnquiryContextValue {
  enquiryOpen: boolean;
  openEnquiry: (request?: EnquiryRequest) => void;
}

const EnquiryContext = createContext<EnquiryContextValue>({
  enquiryOpen: false,
  openEnquiry: () => {},
});

export const useEnquiry = () => useContext(EnquiryContext);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<EnquiryRequest>({
    type: "General Enquiry",
  });
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openEnquiry = useCallback((next?: EnquiryRequest) => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setRequest(next ?? { type: "General Enquiry" });
    setOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setOpen(false);
    if (triggerRef.current?.isConnected) {
      triggerRef.current.focus();
    } else {
      document
        .querySelector<HTMLButtonElement>('[aria-controls="mobile-nav"]')
        ?.focus();
    }
  }, []);

  // Lock body scroll while the modal is up (html keeps its scrollbar gutter,
  // so the layout behind does not shift).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const value = useMemo(
    () => ({ enquiryOpen: open, openEnquiry }),
    [open, openEnquiry]
  );

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal
        open={open}
        request={request}
        onClose={closeEnquiry}
      />
    </EnquiryContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Form — shared by the popup and the contact section.                 */
/* Submitting sends the enquiry to the server-side email endpoint.     */
/* ------------------------------------------------------------------ */

interface FormState {
  name: string;
  phone: string;
  email: string;
  configuration: string;
  facing: string;
  /** Honeypot — a real bot fills this, a human never sees it. */
  website: string;
}

const empty: FormState = {
  name: "",
  phone: "",
  email: "",
  configuration: "",
  facing: "",
  website: "",
};

const requirements = ["1350", "1550", "1720", "2045", "2550", "2880"];
const preferredFacings = ["East", "West", "North"];

/**
 * ---------------------------------------------------------------------
 * The endpoint sends mail through Hostinger SMTP. SMTP credentials remain
 * on the server and are never included in the frontend bundle.
 * ---------------------------------------------------------------------
 */
const ENDPOINT = "/api/enquiry.php";

async function postEnquiry(
  payload: Record<string, string | boolean | undefined>
): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await res.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null;
  if (!res.ok || result?.success !== true) {
    throw new Error(result?.message || "We couldn't send your enquiry. Please try again.");
  }
}

export function EnquiryForm({
  idPrefix,
  variant,
  request,
}: {
  /** Unique id prefix so popup and section forms never collide. */
  idPrefix: string;
  variant: "modal" | "section";
  request: EnquiryRequest;
}) {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState | "consent", string>>
  >({});
  const [consent, setConsent] = useState(false);

  // Restore a saved draft once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<FormState> & {
          budget?: unknown;
          message?: unknown;
        };
        delete saved.budget;
        delete saved.message;
        if (saved.configuration && !requirements.includes(saved.configuration)) {
          saved.configuration = "";
        }
        if (saved.facing && !preferredFacings.includes(saved.facing)) {
          saved.facing = "";
        }
        setForm((f) => ({ ...f, ...saved }));
      }
    } catch {
      /* ignore malformed drafts */
    }
  }, []);

  // Persist the draft as the user types.
  useEffect(() => {
    try {
      const { website, ...rest } = form;
      void website;
      localStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
    } catch {
      /* storage unavailable */
    }
  }, [form]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): Partial<Record<keyof FormState | "consent", string>> => {
    const next: Partial<Record<keyof FormState | "consent", string>> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15)
      next.phone = "Enter a valid phone number (10–15 digits).";
    if (!form.email.trim())
      next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.configuration)
      next.configuration = "Please select a requirement.";
    else if (!requirements.includes(form.configuration))
      next.configuration = "Please select one of the listed unit sizes.";
    if (!form.facing)
      next.facing = "Please select your preferred facing.";
    else if (!preferredFacings.includes(form.facing))
      next.facing = "Please select one of the listed facings.";
    if (!consent) next.consent = "Please confirm we may contact you.";
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "success" || status === "sending") return;

    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});

    // Keep bot submissions quiet without reporting a successful submission.
    if (form.website.trim() !== "") {
      return;
    }

    setStatus("sending");
    try {
      await postEnquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        configuration: form.configuration,
        preferredFacing: form.facing,
        enquiryType: request.type,
        enquiryDetails: request.details,
        website: form.website,
        consent: true,
      });

      setStatus("success");
      setForm(empty);
      setConsent(false);
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore unavailable storage */
      }
    } catch {
      setStatus("error");
    }
  };

  const darkVariant = variant === "section" || variant === "modal";
  const field = (key: keyof FormState) =>
    errors[key] ? (
      <p className={`mt-1.5 flex items-center gap-1.5 text-[0.78rem] ${
        darkVariant ? "text-rose-200" : "text-[#b5462f]"
      }`}>
        <AlertCircle size={13} /> {errors[key]}
      </p>
    ) : null;

  const inputCls = (key: keyof FormState) =>
    `field ${errors[key] ? "field-error" : ""} ${
      darkVariant
        ? "!border-ivory/50 !bg-ivory !text-charcoal placeholder:!text-muted"
        : ""
    }`;
  const labelCls = `label ${
    darkVariant ? "!text-ivory/90" : ""
  }`;
  const subtleText = darkVariant ? "text-ivory/80" : "text-muted";
  const requiredMark = darkVariant ? "text-rose-100" : "text-terracotta";

  if (status === "success") {
    return (
      <div
        role="status"
        className={`flex min-h-[320px] flex-col items-center justify-center py-10 text-center ${
          darkVariant ? "text-ivory" : ""
        }`}
      >
        <span className={`grid h-14 w-14 place-items-center rounded-full ${
          darkVariant
            ? "bg-ivory/10 text-rose-100"
            : "bg-forest/10 text-forest"
        }`}>
          <CheckCircle2 size={26} />
        </span>
        <h3 className={`display-3 mt-6 ${
          darkVariant ? "text-ivory" : "text-forest-dark"
        }`}>
          Your enquiry was accepted for delivery.
        </h3>
        <p className={`mt-3 max-w-sm text-[0.9rem] leading-relaxed ${subtleText}`}>
          Your details have been sent to the project team. They can reply to the
          email address you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={`btn mt-7 ${
            darkVariant ? "btn-light" : "btn-ghost"
          }`}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Enquiry form">
      <div className={`${variant === "modal" ? "mt-6" : ""} space-y-4`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor={`${idPrefix}-name`}>
              Name <span className={requiredMark} aria-hidden="true">*</span>
            </label>
            <input
              id={`${idPrefix}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              className={inputCls("name")}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={Boolean(errors.name)}
            />
            {field("name")}
          </div>
          <div>
            <label className={labelCls} htmlFor={`${idPrefix}-phone`}>
              Number <span className={requiredMark} aria-hidden="true">*</span>
            </label>
            <input
              id={`${idPrefix}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
                className={`${inputCls("phone")} tnum`}
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
            />
            {field("phone")}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor={`${idPrefix}-email`}>
              Mail id <span className={requiredMark} aria-hidden="true">*</span>
            </label>
            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputCls("email")}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
            {field("email")}
          </div>
          <div>
            <label className={labelCls} htmlFor={`${idPrefix}-config`}>
              Requirement <span className={requiredMark} aria-hidden="true">*</span>
            </label>
            <select
              id={`${idPrefix}-config`}
              name="configuration"
              required
              className={inputCls("configuration")}
              value={form.configuration}
              onChange={(e) => set("configuration", e.target.value)}
              aria-invalid={Boolean(errors.configuration)}
            >
              <option value="">Select…</option>
              {requirements.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {field("configuration")}
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor={`${idPrefix}-facing`}>
            Preferred Facing <span className={requiredMark} aria-hidden="true">*</span>
          </label>
          <select
            id={`${idPrefix}-facing`}
            name="facing"
            required
            className={inputCls("facing")}
            value={form.facing}
            onChange={(e) => set("facing", e.target.value)}
            aria-invalid={Boolean(errors.facing)}
          >
            <option value="">Select…</option>
            {preferredFacings.map((facing) => (
              <option key={facing} value={facing}>
                {facing}
              </option>
            ))}
          </select>
          {field("facing")}
        </div>

        {request.details && (
          <p className={`rounded-lg px-3.5 py-2.5 text-[0.8rem] leading-relaxed ${
            darkVariant
              ? "bg-forest-dark/60 text-ivory/90"
              : "bg-ivory text-muted"
          }`}>
            <span className={`font-medium ${
              darkVariant ? "text-ivory" : "text-forest-dark"
            }`}>{request.type}:</span>{" "}
            {request.details}
          </p>
        )}

        {/* Honeypot — hidden from real users */}
        <div
          className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor={`${idPrefix}-website`}>Website</label>
          <input
            id={`${idPrefix}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </div>

        <label className={`flex cursor-pointer items-start gap-3 ${
          darkVariant ? "text-ivory/90" : ""
        }`}>
          <input
            type="checkbox"
            className={`mt-0.5 h-4 w-4 ${
              darkVariant ? "accent-terracotta" : "accent-forest"
            }`}
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setErrors(({ consent: _c, ...rest }) => rest);
            }}
          />
          <span className={`text-[0.82rem] leading-relaxed ${
            darkVariant ? "text-ivory/90" : "text-muted"
          }`}>
            I agree to be contacted about {project.name} by the developer or an
            authorized sales representative.
          </span>
        </label>
        {errors.consent && (
          <p           className={`flex items-center gap-1.5 text-[0.78rem] ${
            darkVariant ? "text-rose-200" : "text-[#b5462f]"
          }`}>
            <AlertCircle size={13} /> {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p
          role="alert"
          className={`mt-5 flex flex-wrap items-start gap-2 rounded-lg border p-3 text-[0.82rem] ${
            darkVariant
              ? "border-rose-200/40 bg-rose-200/10 text-rose-100"
              : "border-[#b5462f]/30 bg-[#b5462f]/5 text-[#b5462f]"
          }`}
        >
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          We couldn't send your enquiry. Please check your connection and try
          again. Your details are still here.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className={`btn btn-accent mt-6 w-full ${
          darkVariant ? "min-h-14 text-[0.95rem]" : ""
        } ${status === "sending" ? "cursor-wait opacity-70" : ""}`}
      >
        <Mail size={16} />
        {status === "sending" ? "Sending enquiry…" : "Send Enquiry"}
      </button>

      <p className={`mt-3.5 text-center text-[0.74rem] leading-relaxed ${subtleText}`}>
        Your details will be emailed to the project team. Drafts stay
        in your browser until submitted.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Modal shell                                                         */
/* ------------------------------------------------------------------ */

function EnquiryModal({
  open,
  request,
  onClose,
}: {
  open: boolean;
  request: EnquiryRequest;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    // Focus the first field once the panel has rendered.
    const t = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLInputElement>("input:not([type=checkbox])")
        ?.focus();
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-forest-dark/75 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative my-auto grid w-full max-w-6xl overflow-hidden border border-ivory/15 bg-forest-dark text-ivory shadow-2xl md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]"
          >
            <div className="relative flex min-h-52 flex-col justify-center bg-forest p-7 sm:p-10 md:min-h-[38rem] md:p-12">
              <p className="eyebrow flex items-center gap-3 text-ivory/75 before:h-px before:w-6 before:bg-terracotta">
                {project.name}
              </p>
              <h2
                id="enquiry-modal-title"
                className="display-1 mt-8 max-w-md text-ivory"
              >
                Request a{" "}
                <span className="italic text-ivory">conversation.</span>
              </h2>
              <p className="mt-5 max-w-sm text-[0.96rem] leading-relaxed text-ivory/90">
                Share a few details and send an enquiry to the Rajapushpa Imperia
                project team.
              </p>
              <p className="mt-8 text-[0.76rem] leading-relaxed text-ivory/80">
                {project.locationLine}
              </p>
            </div>

            <div className="relative bg-forest-dark p-6 sm:p-9 md:p-12">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close enquiry form"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-ivory/20 text-ivory/75 transition hover:border-terracotta hover:bg-forest hover:text-ivory sm:right-6 sm:top-6"
              >
                <X size={19} />
              </button>

              <p className="eyebrow pr-12 text-rose-100">Get in touch</p>
              <h3 className="display-3 mt-4 pr-10 text-ivory">
                Request a private callback
              </h3>
              <p className="mt-2 max-w-xl text-[0.86rem] leading-relaxed text-ivory/85">
                Complete the form to email your enquiry to the project team.
              </p>
              <p className="mt-4 inline-flex rounded-full border border-terracotta/35 bg-terracotta/10 px-3 py-1.5 text-[0.72rem] font-medium text-ivory/80">
                {request.type}
              </p>

              <div className="mt-1">
                <EnquiryForm
                  idPrefix="popup"
                  variant="modal"
                  request={request}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Locked preview — enquiry hand-off does not imply verified access.    */
/* ------------------------------------------------------------------ */

export function LockedPreview({
  label,
  buttonLabel,
  onUnlock,
  children,
}: {
  /** What is being unlocked, e.g. "floor plan" or "price sheet". */
  label: string;
  buttonLabel?: string;
  onUnlock: () => void;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none select-none blur-[7px]">
        {children}
      </div>

      <div className="absolute inset-0 grid place-items-center bg-forest-dark/25 p-5">
        <div className="w-full max-w-xs rounded-2xl bg-ivory/95 p-6 text-center shadow-xl ring-1 ring-charcoal/10">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-terracotta/12 text-terracotta">
            <Lock size={18} />
          </span>
          <strong className="display-3 mt-4 block text-forest-dark">
            {buttonLabel ?? `Unlock ${label}`}
          </strong>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
            Request the {label} from the sales team.
          </p>
          <button
            type="button"
            onClick={onUnlock}
            className="btn btn-accent mt-5 w-full !py-2.5 !text-[0.84rem]"
          >
            <Lock size={14} />
            Unlock to Preview
          </button>
        </div>
      </div>
    </div>
  );
}
