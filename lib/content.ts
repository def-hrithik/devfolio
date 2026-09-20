import { cache } from "react";
import type { Site, ExperienceItem, Project, SkillGroup, Lab, Work } from "./schemas";
import {
  SiteSchema,
  ExperienceSchema,
  ProjectsSchema,
  SkillsSchema,
  LabSchema,
  WorkSchema,
} from "./schemas";

import siteJson from "@/content/site.json";
import experienceJson from "@/content/experience.json";
import projectsJson from "@/content/projects.json";
import skillsJson from "@/content/skills.json";
import facemeshJson from "@/content/labs/facemesh-ai.json";
import pneumoJson from "@/content/labs/pneumo-ai.json";
import churnJson from "@/content/labs/customer-churn.json";
import permafrostJson from "@/content/labs/permafrost-ml.json";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function validate<T>(schema: { parse: (data: unknown) => T }, data: unknown, label: string): T {
  try {
    return schema.parse(data);
  } catch (err) {
    throw new Error(`[content] Invalid ${label} data: ${String(err)}`);
  }
}

// ─── Site ────────────────────────────────────────────────────────────────────

export const getSiteData = cache((): Site => {
  return validate(SiteSchema, siteJson, "site.json");
});

// ─── Experience ──────────────────────────────────────────────────────────────

export const getExperience = cache((): ExperienceItem[] => {
  return validate(ExperienceSchema, experienceJson, "experience.json");
});

// ─── Projects ────────────────────────────────────────────────────────────────

export const getProjects = cache((): Project[] => {
  return validate(ProjectsSchema, projectsJson, "projects.json");
});

export const getFeaturedProjects = cache((): Project[] => {
  return getProjects().filter((p) => p.featured);
});

export const getStandardProjects = cache((): Project[] => {
  return getProjects().filter((p) => !p.featured);
});

// ─── Skills ──────────────────────────────────────────────────────────────────

export const getSkillGroups = cache((): SkillGroup[] => {
  const parsed = validate(SkillsSchema, skillsJson, "skills.json");
  return parsed.groups;
});

// ─── Labs ────────────────────────────────────────────────────────────────────

const LAB_DATA = [facemeshJson, pneumoJson, churnJson, permafrostJson];

export const getLabs = cache((): Lab[] => {
  return LAB_DATA.map((lab, i) =>
    validate(LabSchema, lab, `labs[${i}]`)
  );
});

export const getLabBySlug = cache((slug: string): Lab | null => {
  const lab = LAB_DATA.find((l) => l.id === slug);
  if (!lab) return null;
  return validate(LabSchema, lab, `labs/${slug}`);
});

export const getAllLabSlugs = cache((): string[] => {
  return LAB_DATA.map((l) => l.id);
});

// ─── Work (case studies) ─────────────────────────────────────────────────────

// Dynamic imports so we don't break at build time if a file is missing
async function loadWork(slug: string): Promise<Work | null> {
  try {
    const mod = await import(`@/content/work/${slug}.json`);
    return validate(WorkSchema, mod.default ?? mod, `work/${slug}.json`);
  } catch {
    return null;
  }
}

const WORK_SLUGS = ["certchain", "brevitus", "facemesh-ai", "pneumo-ai", "customer-churn", "permafrost-ml"] as const;
export type WorkSlug = (typeof WORK_SLUGS)[number];

export function getAllWorkSlugs(): string[] {
  return [...WORK_SLUGS];
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  if (!(WORK_SLUGS as readonly string[]).includes(slug)) return null;
  return loadWork(slug);
}
