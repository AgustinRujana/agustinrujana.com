import { Pill, PillList } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { education, skillGroups } from "@/content/site";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <div className="grid gap-4 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="rounded-2xl border-2 border-ink bg-sun px-5 py-[18px]">
            <h3 className="mb-2.5 font-bold">{group.title}</h3>
            <PillList className="gap-1.5">
              {group.items.map((item) => (
                <Pill key={item} size="sm">
                  {item}
                </Pill>
              ))}
            </PillList>
          </div>
        ))}
      </div>
      <p className="mt-[22px] text-[15px] text-dim">{education}</p>
    </Section>
  );
}
