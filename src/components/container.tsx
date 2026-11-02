import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-7xl px-5 md:px-8 ${className}`}>{children}</div>;
}

export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-[0.72rem] font-medium uppercase tracking-[0.22em] ${light ? "text-brass" : "text-gold"}`}>
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  children,
  light = false,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <Kicker light={light}>{kicker}</Kicker>
      <h2 className={`mt-3 font-display text-4xl leading-[1.05] font-medium md:text-5xl ${light ? "text-ivory" : "text-ink"}`}>
        {title}
      </h2>
      {children ? (
        <p className={`mt-4 text-base leading-7 ${light ? "text-ivory/75" : "text-muted"}`}>{children}</p>
      ) : null}
    </div>
  );
}

export const fieldClass =
  "w-full border border-line bg-paper px-3 py-3 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-gold";

export const labelClass = "mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted";

export const buttonClass =
  "inline-flex items-center justify-center bg-forest px-5 py-3 text-sm text-ivory transition hover:bg-pine";

export const buttonLight =
  "inline-flex items-center justify-center bg-brass px-5 py-3 text-sm text-forest transition hover:bg-ivory";

export const buttonGhost =
  "inline-flex items-center justify-center border border-current px-5 py-3 text-sm transition hover:bg-forest hover:text-ivory";
