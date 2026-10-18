import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-reveal wrapper. Content fades and rises once, on first intersection.
 * Honours prefers-reduced-motion by rendering children immediately with no
 * animation at all.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Consistent eyebrow + title + lede block used at the top of every section. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "start",
  tone = "dark",
  id,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "start" | "center";
  tone?: "dark" | "light";
  id?: string;
}) {
  const muted = tone === "light" ? "text-ivory/70" : "text-muted";
  const heading = tone === "light" ? "text-ivory" : "text-forest-dark";
  const accent = tone === "light" ? "text-rose-100" : "text-forest-dark";

  return (
    <div
      id={id}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <Reveal>
        <p className={`eyebrow ${accent}`}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className={`display-2 mt-4 ${heading}`}>{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.12}>
          <p className={`mt-5 text-[1.02rem] leading-relaxed ${muted}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Thin decorative rule used between blocks. */
export function Rule({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <hr
      className={`my-0 border-0 h-px ${
        tone === "light" ? "bg-ivory/15" : "bg-charcoal/10"
      }`}
    />
  );
}

/** Section wrapper: id target, background and vertical rhythm. */
export function Section({
  id,
  children,
  className = "",
  tone = "light",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "white" | "ivory" | "dark";
}) {
  const bg =
    tone === "dark"
      ? "bg-forest-dark text-ivory"
      : tone === "ivory"
        ? "bg-ivory"
        : "bg-white";

  return (
    <section id={id} className={`${bg} ${className}`}>
      {children}
    </section>
  );
}
