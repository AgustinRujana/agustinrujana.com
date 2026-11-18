import type { Job } from "@/content/site";
import { formatMonth } from "@/lib/dates";
import { richText } from "@/lib/rich-text";

export function ExperienceItem({ job }: { job: Job }) {
  return (
    <li className="grid gap-x-7 gap-y-1 border-b border-ink/18 py-5 last:border-b-0 last:pb-0 min-[700px]:grid-cols-[200px_1fr]">
      <p className="pt-0.5 text-sm text-dim tabular-nums">
        <time dateTime={job.start}>{formatMonth(job.start)}</time> –{" "}
        {job.end ? <time dateTime={job.end}>{formatMonth(job.end)}</time> : "Present"}
        <br />
        {job.place}
      </p>
      <div>
        <h3 className="text-lg font-bold">
          {job.role} <span className="font-normal">· {job.company}</span>
        </h3>
        <ul className="mt-2 grid max-w-[70ch] list-disc gap-1 pl-[18px] text-[15px] marker:text-dim">
          {job.points.map((point) => (
            <li key={point}>{richText(point)}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}
