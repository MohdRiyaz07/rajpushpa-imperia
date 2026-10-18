import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "../data/projectData";
import { Reveal, Section, SectionHead } from "./ui";

/**
 * FAQ — accessible accordion. One panel open at a time, real <button> triggers
 * with aria-expanded / aria-controls, and the answer region animated open.
 */
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section id="faq" tone="ivory" className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHead
            eyebrow="FAQ"
            title="Questions the materials actually answer."
            lede="Answers are drawn only from the supplied brochure, offer and price sheet. Where those documents are silent, the answer says so."
          />

          <div>
            <Reveal delay={0.1}>
              <ul className="border-t border-charcoal/12">
                {faqs.map((f, i) => {
                  const isOpen = open === i;
                  const panelId = `${baseId}-panel-${i}`;
                  const buttonId = `${baseId}-button-${i}`;
                  return (
                    <li key={f.q} className="border-b border-charcoal/12">
                      <h3>
                        <button
                          type="button"
                          id={buttonId}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="flex w-full items-start justify-between gap-6 py-5 text-left transition hover:text-forest-dark"
                        >
                          <span className="text-[1rem] font-medium leading-snug text-forest-dark">
                            {f.q}
                          </span>
                          <span
                            className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition ${
                              isOpen
                                ? "rotate-45 border-terracotta bg-terracotta text-white"
                                : "border-charcoal/20 text-charcoal/60"
                            }`}
                            aria-hidden="true"
                          >
                            <Plus size={15} />
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 pr-10 text-[0.92rem] leading-relaxed text-muted">
                              {f.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
