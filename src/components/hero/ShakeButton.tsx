"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MOTION_EVENT, SHAKE_EVENT } from "@/lib/events";

/** Throws the hero stickers. Relabels itself once the phone's accelerometer is live. */
export function ShakeButton() {
  const [label, setLabel] = useState("Shake the skills");

  useEffect(() => {
    const onMotion = () => {
      if (window.matchMedia("(pointer: coarse)").matches) setLabel("Shake your phone");
    };
    window.addEventListener(MOTION_EVENT, onMotion);
    return () => window.removeEventListener(MOTION_EVENT, onMotion);
  }, []);

  return <Button onClick={() => window.dispatchEvent(new CustomEvent(SHAKE_EVENT, { detail: 1 }))}>{label}</Button>;
}
