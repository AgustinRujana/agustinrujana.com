/**
 * All copy for the site lives here, so text changes never touch components.
 * Components only receive typed data and decide how it looks.
 */

export type Accent = "tomato" | "blue" | "mint" | "ink" | "white";

export const site = {
  url: "https://agustinrujana.com",
  name: "Agustin R. Basilico",
  shortName: "agustin.",
  role: "Frontend engineer",
  locale: "en_US",
  location: "Turin, Italy",
  email: "agustinrujanacontact@gmail.com",
  title: "Agustin R. Basilico · Frontend engineer",
  description:
    "Frontend engineer in Turin building fast, reliable software people enjoy: performance, developer platforms and AI tooling. Currently at Arduino, a Qualcomm company.",
  headline: ["Building software", "people enjoy."],
  intro: "Frontend engineer for performance, developer platforms and AI tooling. Turin, Italy.",
  /** Served from public/; links to it download the file. */
  resumeUrl: "/Agustin-R-Basilico-CV.pdf",
  social: {
    github: "https://github.com/agustinrujana",
    linkedin: "https://www.linkedin.com/in/agustinrujana",
    repo: "https://github.com/AgustinRujana/agustinrujana.com",
  },
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const about = {
  /** Words wrapped in [brackets] are highlighted. */
  lead: "I make large apps [faster], [sturdier] and [easier to build on]. Today that means two IDEs at Arduino, a Qualcomm company: a browser editor used by 9K+ people a day, and a desktop app shipped with 270K+ devices.",
  facts: ["Turin, Italy", "EU citizen", "Spanish · English · Italian"],
};

export type Project = {
  name: string;
  tag: { label: string; accent: Accent };
  goal: string;
  approach: string;
  result: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "Arduino Cloud Editor",
    tag: { label: "Reliability", accent: "tomato" },
    goal: "Keep a browser IDE that 9K+ people use every day fast and stable, even in long coding sessions.",
    approach: "Led performance and memory optimizations across the editor.",
    result: "A smoother editor for 9K+ daily users",
    stack: ["Arduino", "Frontend performance"],
  },
  {
    name: "Arduino App Lab",
    tag: { label: "Performance", accent: "tomato" },
    goal: "Make the desktop IDE for the UNO Q lighter to download and install.",
    approach:
      "Trimmed the bundled language servers: removed files the app never loads and stripped debug information from native binaries.",
    result: "103 MB less on disk: 439 → 336 MB (−23%)",
    stack: ["Arduino", "Build pipeline", "Wails", "Go"],
  },
  {
    name: "Farmacia Central",
    tag: { label: "Ownership", accent: "ink" },
    goal: "Take my family's pharmacy in Argentina online, with a complete store for payments and orders.",
    approach:
      "Designed, built and run it on my own: card payments, orders and invoicing, catalog import from spreadsheets, email and staff push notifications.",
    result: "Live in production, built solo",
    stack: ["Freelance", "Next.js", "Google Cloud Run"],
  },
];

export type Job = {
  role: string;
  company: string;
  start: string; // ISO yyyy-mm
  end?: string; // omitted = present
  place: string;
  /** Text wrapped in **double asterisks** renders bold. */
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Software Engineer",
    company: "Arduino, a Qualcomm company",
    start: "2024-03",
    place: "Turin, Italy",
    points: [
      "Maintain the **Arduino Cloud Editor**, a browser IDE used by 9K+ people a day.",
      "Developer on **Arduino App Lab**, the IDE for the UNO Q (270K+ boards in year one). Cut its install size by 103 MB (−23%).",
      "Built **over-the-air compile and upload** with the firmware and backend teams.",
      "Wrote **LLM evaluation** suites in Promptfoo for the Arduino AI Assistant.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Across",
    start: "2022-06",
    end: "2024-03",
    place: "Turin, Italy",
    points: [
      "Data-heavy management apps with Vue 3, Vue 2, Vite and Tailwind, in an Agile team.",
      "Shared widget library used across 5 concurrent client projects.",
      "Profiled and optimized rendering and state management.",
    ],
  },
  {
    role: "Fullstack Engineer",
    company: "Loesen SA",
    start: "2021-06",
    end: "2022-06",
    place: "Buenos Aires",
    points: [
      "E-commerce, data and management apps for large automotive companies with React, Tailwind, Fastify and AWS.",
    ],
  },
  {
    role: "Software Engineer & UX/UI Designer",
    company: "Freelance",
    start: "2020-06",
    place: "Remote",
    points: [
      "Built and run the online store of Farmacia Central, my family's pharmacy in Argentina: Next.js and TypeScript on Google Cloud Run.",
    ],
  },
];

export const skillGroups = [
  { title: "Frontend", items: ["TypeScript", "React", "Next.js", "Vue", "Tailwind", "Electron", "Wails"] },
  { title: "Backend & cloud", items: ["Node.js", "Go", "SQL", "Docker", "Google Cloud", "AWS", "E2E testing"] },
  { title: "AI", items: ["LLM APIs", "AI agents", "MCP servers", "Promptfoo", "RAG"] },
] as const;

export const education = "B.Sc. in Management, University of Turin (103/110).";

export const contact = {
  title: "Let's talk",
  text: "I'm looking for frontend, developer-platform and AI-tooling roles. The fastest way to reach me is email.",
};

/**
 * Stickers in the hero playground: label, base radius in px, colour.
 * `spoken` replaces a short label in the canvas description read by screen readers.
 */
export const stickers: { label: string; spoken?: string; size: number; accent: Accent }[] = [
  { label: "Performance", size: 66, accent: "tomato" },
  { label: "Reliability", size: 60, accent: "tomato" },
  { label: "Platforms", size: 58, accent: "tomato" },
  { label: "TypeScript", size: 54, accent: "white" },
  { label: "React", size: 48, accent: "white" },
  { label: "Next.js", size: 46, accent: "white" },
  { label: "Vue", size: 40, accent: "white" },
  { label: "Go", size: 36, accent: "ink" },
  { label: "Node.js", size: 44, accent: "ink" },
  { label: "Electron", size: 42, accent: "white" },
  { label: "Wails", size: 36, accent: "ink" },
  { label: "Tailwind", size: 40, accent: "white" },
  { label: "SQL", size: 34, accent: "blue" },
  { label: "Docker", size: 40, accent: "blue" },
  { label: "GCP", spoken: "Google Cloud", size: 36, accent: "blue" },
  { label: "AWS", size: 36, accent: "blue" },
  { label: "LLMs", size: 46, accent: "mint" },
  { label: "RAG", size: 38, accent: "mint" },
  { label: "MCP", size: 38, accent: "mint" },
  { label: "Promptfoo", size: 48, accent: "mint" },
  { label: "ES · EN · IT", spoken: "and Spanish, English, Italian", size: 50, accent: "ink" },
];
