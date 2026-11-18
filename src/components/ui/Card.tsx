import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Sticker-style card with a hard offset shadow that lifts on hover. */
export function Card({ className, ...rest }: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-[18px] border-2 border-ink bg-paper p-[22px] shadow-hard transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-hard-lg",
        className,
      )}
      {...rest}
    />
  );
}
