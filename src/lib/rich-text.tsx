import { Fragment, type ReactNode } from "react";

/**
 * Tiny inline formatter for copy kept in plain strings:
 * `**bold**` → <strong>, `[word]` → <mark>. Nothing else is parsed, so content stays safe.
 */
export function richText(text: string, markClassName?: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("[") && part.endsWith("]"))
      return (
        <mark key={i} className={markClassName}>
          {part.slice(1, -1)}
        </mark>
      );
    return <Fragment key={i}>{part}</Fragment>;
  });
}
