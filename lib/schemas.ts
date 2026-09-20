import { z } from "zod";

// ─── Site ───────────────────────────────────────────────────────────────────

export const SocialSchema = z.object({
  github: z.string().url(),
  linkedin: z.string().url(),
  email: z.string().email().nullable(),
});

export const CtaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const SiteSchema = z.object({
  name: z.string(),
  headline: z.string(),
  bio: z.string(),
  location: z.string(),
  college: z.string(),
  openToWork: z.boolean(),
  resumeUrl: z.string().url().nullable(),
  bookingUrl: z.string().url().nullable(),
  socials: SocialSchema,
  ctaPrimary: CtaSchema,
  ctaSecondary: CtaSchema,
  suggestedQuestions: z.array(z.string()),
});

export type Site = z.infer<typeof SiteSchema>;
export type Social = z.infer<typeof SocialSchema>;

// ─── Experience ──────────────────────────────────────────────────────────────

export const ExperienceEvidenceSchema = z.object({
  label: z.string(),
  type: z.enum(["letter", "certificate"]),
});

export const ExperienceItemSchema = z.object({
  id: z.string(),
  organization: z.string(),
  role: z.string(),
  type: z.enum(["internship", "community", "leadership"]),
  startDate: z.string(),
  endDate: z.string(),
  displayDuration: z.string(),
  location: z.string().optional(),
  description: z.string(),
  technologies: z.array(z.string()),
  evidence: ExperienceEvidenceSchema.optional(),
  repository: z.string().url().optional(),
  caseStudyHref: z.string().optional(),
});

export const ExperienceSchema = z.array(ExperienceItemSchema);
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;

// ─── Projects ────────────────────────────────────────────────────────────────

export const ProjectSchema = z.object({
  id: z.string(),
  featured: z.boolean(),
  name: z.string(),
  tagline: z.string(),
  category: z.string(),
  description: z.string(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  technologies: z.array(z.string()),
  github: z.string().url(),
  liveUrl: z.string().url().nullable(),
  caseStudyHref: z.string().optional(),
  labsHref: z.string().optional(),
  status: z.enum(["completed", "wip"]),
});

export const ProjectsSchema = z.array(ProjectSchema);
export type Project = z.infer<typeof ProjectSchema>;

// ─── Skills ──────────────────────────────────────────────────────────────────

export const SkillGroupSchema = z.object({
  id: z.string(),
  label: z.string(),
  skills: z.array(z.string()),
});

export const SkillsSchema = z.object({
  groups: z.array(SkillGroupSchema),
});

export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type Skills = z.infer<typeof SkillsSchema>;

// ─── Lab ─────────────────────────────────────────────────────────────────────

export const LabSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  metrics: z.array(z.string()).optional(),
  github: z.string().url(),
  liveUrl: z.string().url().nullable(),
  screenshot: z.string().nullable(),
  metric: z.string().optional(),
  technicalTakeaway: z.string(),
  disclaimer: z.string().optional(),
  status: z.enum(["completed", "wip"]),
});

export const LabsSchema = z.array(LabSchema);
export type Lab = z.infer<typeof LabSchema>;

// ─── Work (case study) ───────────────────────────────────────────────────────

export const WorkSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  company: z.string(),
  tagline: z.string(),
  dates: z.string(),
  role: z.string(),
  about: z.string(),
  technologies: z.array(z.string()),
  github: z.string().url(),
  liveUrl: z.string().url().nullable(),
  nextProject: z.object({ slug: z.string(), name: z.string() }).nullable(),
  sections: z.array(
    z.object({
      id: z.string(),
      heading: z.string(),
      body: z.string(),
      note: z.string().optional(),
    })
  ),
});

export type Work = z.infer<typeof WorkSchema>;
