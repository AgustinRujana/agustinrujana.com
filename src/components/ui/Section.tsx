import { useId } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  eyebrow: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Page section with an eyebrow label and an optional h2.
 * The section is labelled by its heading (or eyebrow) so screen-reader landmarks have names.
 */
export function Section({ id, eyebrow, title, className, children }: Props) {
  const headingId = useId();
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-4 py-16 [&+&]:border-t [&+&]:border-ink/15", className)}
    >
      <Container>
        {title ? (
          <>
            <p className="mb-2.5 text-xs font-bold tracking-[.12em] text-dim uppercase">{eyebrow}</p>
            <h2 id={headingId} className="mb-[26px] font-display text-[clamp(24px,3.6vw,34px)] leading-[1.1] font-black tracking-[-.02em]">
              {title}
            </h2>
          </>
        ) : (
          <h2 id={headingId} className="mb-2.5 text-xs font-bold tracking-[.12em] text-dim uppercase">
            {eyebrow}
          </h2>
        )}
        {children}
      </Container>
    </section>
  );
}
