import { ExperienceItem } from "@/components/ExperienceItem";
import { Section } from "@/components/ui/Section";
import { experience } from "@/content/site";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol className="border-t-[3px] border-ink">
        {experience.map((job) => (
          <ExperienceItem key={`${job.company}-${job.start}`} job={job} />
        ))}
      </ol>
    </Section>
  );
}
