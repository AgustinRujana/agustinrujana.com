import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "light" | "dark";

const base =
  "inline-flex items-center gap-1.5 rounded-xl border-2 border-ink px-4 py-2 text-sm font-bold shadow-hard-sm transition-transform select-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_var(--color-ink)]";
const variants: Record<Variant, string> = {
  light: "bg-paper text-ink",
  dark: "bg-ink text-sun",
};

export function Button({
  variant = "light",
  className,
  type = "button",
  ...rest
}: ComponentPropsWithoutRef<"button"> & { variant?: Variant }) {
  return <button type={type} className={cn(base, variants[variant], "cursor-pointer", className)} {...rest} />;
}

export function ButtonLink({
  variant = "light",
  className,
  ...rest
}: ComponentPropsWithoutRef<"a"> & { variant?: Variant }) {
  return <a className={cn(base, variants[variant], className)} {...rest} />;
}
