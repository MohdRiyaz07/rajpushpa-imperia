interface BrandLockupProps {
  size?: "header" | "footer";
  light?: boolean;
}

export default function BrandLockup({
  size = "header",
  light = false,
}: BrandLockupProps) {
  const isFooter = size === "footer";

  return (
    <span className="inline-flex min-w-0 items-center gap-2.5 md:gap-3.5" aria-label="Rajapushpa authorised sales partner — Rajapushpa Imperia">
      <span
        className={`inline-flex shrink-0 items-center overflow-hidden border border-charcoal/20 bg-white text-charcoal ${
          isFooter ? "h-[3.5rem] rounded-sm" : "h-11 rounded-sm md:h-12"
        }`}
      >
        <span className="flex h-full shrink-0 items-center justify-center border-r border-charcoal/15 px-1.5">
          <img
            src="/assets/logo/rajpushpalogo.svg"
            alt=""
            width={108}
            height={78}
            className={`shrink-0 object-contain ${isFooter ? "h-10 w-10" : "h-9 w-9 md:h-10 md:w-10"}`}
          />
        </span>
        <span
          className={`flex h-full flex-col justify-center px-2 ${
            isFooter ? "sm:px-3" : "px-2 md:px-2.5"
          }`}
        >
          <span
            className={`whitespace-nowrap font-extrabold leading-none tracking-[0.12em] ${
              isFooter ? "text-[0.7rem] sm:text-[0.78rem]" : "text-[0.61rem] md:text-[0.7rem]"
            }`}
          >
            AUTHORISED
          </span>
          <span
            className={`mt-1 whitespace-nowrap font-bold leading-none tracking-[0.2em] text-charcoal/75 ${
              isFooter ? "text-[0.52rem] sm:text-[0.58rem]" : "text-[0.46rem] md:text-[0.52rem]"
            }`}
          >
            SALES PARTNER
          </span>
        </span>
      </span>
      <span
        className={`flex min-w-0 flex-col justify-center leading-none ${
          isFooter || light ? "text-ivory" : "text-forest-dark"
        }`}
      >
        <span
          className={`whitespace-nowrap font-semibold uppercase tracking-[0.2em] ${
            isFooter
              ? "text-[0.56rem] text-terracotta"
              : light
                ? "text-[0.55rem] text-ivory/80 md:text-[0.62rem]"
                : "text-[0.55rem] text-terracotta md:text-[0.62rem]"
          }`}
        >
          RAJAPUSHPA
        </span>
        <span
          className={`mt-1 whitespace-nowrap font-display ${
            isFooter ? "text-[1.35rem]" : "text-[1.35rem] md:text-[1.65rem]"
          }`}
        >
          Imperia
        </span>
      </span>
    </span>
  );
}
