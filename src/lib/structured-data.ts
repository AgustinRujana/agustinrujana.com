import { experience, site, skillGroups } from "@/content/site";

/** schema.org Person, so search engines can show a rich profile result. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: experience[0]?.role,
  worksFor: { "@type": "Organization", name: "Arduino" },
  address: { "@type": "PostalAddress", addressLocality: "Turin", addressCountry: "IT" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Turin" },
  knowsLanguage: ["es", "en", "it"],
  knowsAbout: skillGroups.flatMap((g) => g.items),
  sameAs: [site.social.github, site.social.linkedin],
};
