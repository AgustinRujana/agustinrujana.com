import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <Container as="footer" className="flex flex-wrap justify-between gap-2 pt-7 pb-10 text-[13px] text-dim">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <a href="#top" className="hover:underline">
        Back to the playground ↑
      </a>
    </Container>
  );
}
