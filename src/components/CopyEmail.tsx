"use client";

import { useRef, useState } from "react";

/** Shows the address as a mailto link with a copy button that falls back to selecting the text. */
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "selected">("idle");
  const textRef = useRef<HTMLAnchorElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      const range = document.createRange();
      if (textRef.current) range.selectNodeContents(textRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      setStatus("selected");
    }
    window.setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border-2 border-paper px-4 py-3">
      <a ref={textRef} href={`mailto:${email}`} className="font-medium [overflow-wrap:anywhere] hover:underline">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="flex-none cursor-pointer rounded-lg bg-sun px-2.5 py-1.5 text-[13px] font-bold text-ink"
      >
        <span aria-live="polite">{status === "copied" ? "Copied" : status === "selected" ? "Selected" : "Copy"}</span>
      </button>
    </div>
  );
}
