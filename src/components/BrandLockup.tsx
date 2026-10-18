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
    <span className="inline-flex min-w-0 items-center" aria-label="Rajapushpa Imperia">
      <span
        className={`flex min-w-0 flex-col justify-center leading-none ${
          isFooter || light ? "text-ivory" : "text-forest-dark"
        }`}
      >
        <span
          className={`whitespace-nowrap font-semibold uppercase tracking-[0.2em] ${
            isFooter
              ? "text-[0.56rem] text-rose-100"
              : light
                ? "text-[0.55rem] text-ivory/80 md:text-[0.62rem]"
                : "text-[0.55rem] text-forest-dark md:text-[0.62rem]"
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
