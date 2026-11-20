import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
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
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[13px]">
        <p className="text-dim">{project.stack.join(" · ")}</p>
        {project.link ? (
          <ExternalLink
            href={project.link.href}
            className="ml-auto font-bold underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            {project.link.label} <span aria-hidden="true">↗</span>
          </ExternalLink>
        ) : null}
      </div>
    </Card>
  );
}
