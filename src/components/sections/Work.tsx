import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/ui/Section";
import { projects } from "@/content/site";

export function Work() {
  return (
    <Section id="work" eyebrow="Selected work" title="A few things I'm proud of">
      <div className="grid gap-[22px] lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}
