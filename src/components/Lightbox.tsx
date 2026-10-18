import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Full-screen image viewer with keyboard navigation.
 *
 * Escape and the close button both dismiss; ← / → step through the set; the
 * viewport is scroll-locked while open and body scroll position is preserved.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
  label = "Image viewer",
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
  label?: string;
}) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);

  const prev = useCallback(() => {
    if (index === null || items.length === 0) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const next = useCallback(() => {
    if (index === null || items.length === 0) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, prev, next]);

  const item = index === null ? null : items[index];

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-dark/95 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory transition hover:bg-ivory/10 sm:right-6 sm:top-6"
          >
            <X size={20} />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory transition hover:bg-ivory/10 sm:left-6"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory transition hover:bg-ivory/10 sm:right-6"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <figure
            className="flex max-h-full w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className="max-h-[78vh] w-auto rounded-lg object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28 }}
            />
            <figcaption className="mt-4 flex items-center gap-4 text-sm text-ivory/75">
              {item.caption && <span>{item.caption}</span>}
              {items.length > 1 && (
                <span className="tnum text-ivory/85">
                  {index! + 1} / {items.length}
                </span>
              )}
            </figcaption>
          </figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
