import { Container } from "@/components/ui/Container";
import { nav, site } from "@/content/site";

export function Header() {
  return (
    <Container className="flex flex-wrap items-center justify-between gap-3 pt-[max(18px,env(safe-area-inset-top))]">
      <a href="#top" className="font-display text-lg font-black tracking-[-.02em] no-underline">
        {site.shortName}
      </a>
      <nav aria-label="Sections" className="flex flex-wrap items-center gap-x-[18px] gap-y-1 text-sm font-bold">
        {nav.map((item) => (
          <a key={item.href} href={item.href} className="hidden underline-offset-4 hover:underline sm:inline">
            {item.label}
          </a>
        ))}
        <a
          href={site.resumeUrl}
          download
          className="rounded-[10px] border-2 border-ink bg-paper px-3 py-1.5 shadow-hard-sm"
        >
          Résumé <span aria-hidden="true">↓</span>
          <span className="sr-only"> (PDF download)</span>
        </a>
      </nav>
    </Container>
  );
}
