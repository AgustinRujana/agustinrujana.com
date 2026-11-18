import { CopyEmail } from "@/components/CopyEmail";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { contact, site } from "@/content/site";
import { cn } from "@/lib/cn";

const linkClass = "flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 font-bold";

const links = [
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Source code", href: site.social.repo },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-4 border-t border-ink/15 py-16">
      <Container>
        <div className="grid gap-[18px] rounded-3xl bg-ink px-7 py-9 text-paper md:grid-cols-[1.2fr_1fr] md:items-end md:gap-8 md:p-12">
          <div>
            <h2
              id="contact-title"
              className="mb-3 font-display text-[clamp(24px,3.6vw,34px)] leading-[1.1] font-black tracking-[-.02em] text-sun"
            >
              {contact.title}
            </h2>
            <p className="max-w-[42ch]">{contact.text}</p>
          </div>
          <div className="grid gap-2.5">
            <a href={site.resumeUrl} download className={cn(linkClass, "border-tomato bg-tomato text-paper")}>
              Résumé (PDF) <span aria-hidden="true">↓</span>
            </a>
            {links.map((link) => (
              <ExternalLink
                key={link.label}
                href={link.href}
                className={cn(linkClass, "border-paper hover:bg-paper hover:text-ink")}
              >
                {link.label} <span aria-hidden="true">↗</span>
              </ExternalLink>
            ))}
            <CopyEmail email={site.email} />
          </div>
        </div>
      </Container>
    </section>
  );
}
