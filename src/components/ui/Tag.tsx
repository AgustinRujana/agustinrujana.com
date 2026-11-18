import type { Accent } from "@/content/site";
import { accentClass } from "@/lib/accents";
import { cn } from "@/lib/cn";

/** Small coloured pill used to categorise a card. */
export function Tag({ accent, children }: { accent: Accent; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "self-start rounded-full border-2 border-ink px-3 py-0.5 text-xs font-bold",
        accentClass[accent],
      )}
    >
      {children}
    </span>
  );
}
