const fmt = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

/** "2024-03" → "Mar 2024"; undefined → "Present". */
export function formatMonth(value?: string) {
  if (!value) return "Present";
  return fmt.format(new Date(`${value}-01T00:00:00Z`));
}
