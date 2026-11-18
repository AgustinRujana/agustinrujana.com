import type { ComponentPropsWithoutRef } from "react";

/** Link that opens in a new tab safely and tells screen readers it does. */
export function ExternalLink({ children, ...rest }: ComponentPropsWithoutRef<"a">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
