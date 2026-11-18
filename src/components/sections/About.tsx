import { Pill, PillList } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { about } from "@/content/site";
import { richText } from "@/lib/rich-text";

export function About() {
  return (
    <Section eyebrow="About">
      <p className="max-w-[34ch] text-[clamp(21px,2.8vw,32px)] leading-[1.35] font-medium tracking-[-.01em]">
        {richText(about.lead, "rounded-[5px] bg-sun px-[.14em] font-bold text-inherit")}
      </p>
      <PillList className="mt-6">
        {about.facts.map((fact) => (
          <Pill key={fact}>{fact}</Pill>
        ))}
      </PillList>
    </Section>
  );
}
