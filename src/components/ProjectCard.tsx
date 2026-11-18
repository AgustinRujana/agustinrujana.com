import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/content/site";

/** A case study: goal → what I did → result. */
export function ProjectCard({ project }: { project: Project }) {
  const steps = [
    ["Goal", project.goal],
    ["What I did", project.approach],
  ] as const;

  return (
    <Card>
      <Tag accent={project.tag.accent}>{project.tag.label}</Tag>
      <h3 className="text-lg font-bold">{project.name}</h3>
      <dl className="grid flex-1 content-start gap-3">
        {steps.map(([term, detail]) => (
          <div key={term}>
            <dt className="text-xs font-bold tracking-[.1em] text-dim uppercase">{term}</dt>
            <dd className="mt-0.5 text-[15px]">{detail}</dd>
          </div>
        ))}
      </dl>
      <p className="rounded-xl border-2 border-ink bg-sun px-3.5 py-2.5 font-display text-xl leading-[1.2] font-black tracking-[-.02em] text-balance">
        {project.result}
      </p>
      <p className="text-[13px] text-dim">{project.stack.join(" · ")}</p>
    </Card>
  );
}
