import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type Props<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

/** Centered page column with safe-area aware side gutters. */
export function Container<T extends ElementType = "div">({ as, className, ...rest }: Props<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1160px] pr-[max(16px,env(safe-area-inset-right))] pl-[max(16px,env(safe-area-inset-left))] md:pr-[max(32px,env(safe-area-inset-right))] md:pl-[max(32px,env(safe-area-inset-left))]",
        className,
      )}
      {...rest}
    />
  );
}
