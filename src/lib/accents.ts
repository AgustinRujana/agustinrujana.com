import type { Accent } from "@/content/site";

/** Background + text colour for each accent, shared by tags and hero stickers. */
export const accentHex: Record<Accent, { fill: string; text: string }> = {
  tomato: { fill: "#ff5532", text: "#ffffff" },
  blue: { fill: "#3d6bff", text: "#ffffff" },
  mint: { fill: "#7fe0bf", text: "#17130f" },
  ink: { fill: "#17130f", text: "#ffe14d" },
  white: { fill: "#ffffff", text: "#17130f" },
};

export const accentClass: Record<Accent, string> = {
  tomato: "bg-tomato text-paper",
  blue: "bg-blue text-paper",
  mint: "bg-mint text-ink",
  ink: "bg-ink text-sun",
  white: "bg-paper text-ink",
};
