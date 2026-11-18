# agustinrujana.com

Personal portfolio of Agustin R. Basilico. Built with Next.js (App Router), React 19, TypeScript and Tailwind CSS v4, and exported as a fully static site.

## Scripts

| Command             | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Local dev server on http://localhost:3000       |
| `npm run build`     | Static export to `out/` (HTML, CSS, JS, images) |
| `npm start`         | Serves `out/` locally to check the real build   |
| `npm run lint`      | ESLint (Next core-web-vitals + TypeScript)      |
| `npm run typecheck` | `tsc --noEmit`                                  |

Node 22 (see `.nvmrc`).

## Where things live

```
src/
  content/site.ts        All copy: profile, projects, experience, skills, links. Edit text here only.
  app/
    layout.tsx           <html>, fonts, metadata (title, description, Open Graph, canonical)
    page.tsx             Composes the sections + JSON-LD Person schema
    og.png/route.tsx     Social preview image, rendered at build time to /og.png
    sitemap.ts, robots.ts, manifest.ts, icon.svg
  components/
    ui/                  Reusable primitives: Button/ButtonLink, Card, Tag, Pill, Section, Container, ExternalLink
    sections/            One component per page section (Hero, About, Work, Experience, Skills, Contact, Footer)
    hero/                Client islands: StickerPlayground (canvas physics) and ShakeButton
    ProjectCard.tsx, ExperienceItem.tsx, CopyEmail.tsx
  lib/
    physics.ts           Pure circle physics used by the playground
    rich-text.tsx        `**bold**` and `[highlight]` in plain content strings
  fonts/                 Self-hosted Unbounded + DM Sans (SIL OFL)
```

## Performance, SEO and accessibility notes

- Everything is pre-rendered at build time; only three small client islands hydrate (sticker canvas, shake button, copy-email).
- The physics loop sleeps when the stickers are at rest or off screen, so an idle page uses no CPU.
- Fonts are self-hosted through `next/font/local` with size-adjusted fallbacks: no third-party requests, no layout shift.
- Metadata: title, description, canonical URL, Open Graph + Twitter card (`/og.png`), `sitemap.xml`, `robots.txt`, web manifest and a schema.org `Person` JSON-LD block.
- Accessibility: skip link, labelled landmarks, real headings order, `<time>` for dates, focus-visible outlines, reduced-motion support, and a text description of the canvas.
- On phones the stickers react to shaking the device (`devicemotion`). iOS asks for permission on the first tap.

## Deploying

`npm run build` produces a static `out/` folder that any static host can serve: Vercel, Netlify, Cloudflare Pages, GitHub Pages or S3. Point the `agustinrujana.com` DNS at the host and use `out/` as the publish directory (on Vercel no setting is needed).
