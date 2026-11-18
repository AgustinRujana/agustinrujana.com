import { cn } from "@/lib/cn";

type Size = "md" | "sm";

/** Outlined label: facts in About (md) and skill chips (sm). */
export function Pill({ size = "md", children }: { size?: Size; children: React.ReactNode }) {
  return (
    <li
      className={cn(
        "border-ink",
        size === "md" && "rounded-full border-2 px-3.5 py-1 text-sm font-bold",
        size === "sm" && "rounded-lg border-[1.5px] bg-paper px-2.5 py-0.5 text-[13.5px] font-medium",
      )}
    >
      {children}
    </li>
  );
}

export function PillList({ className, children }: { className?: string; children: React.ReactNode }) {
  return <ul className={cn("flex flex-wrap gap-2", className)}>{children}</ul>;
}
