import { SectionHeading } from "@/components/home/section-heading";
import { FeaturedProject } from "./featured-project";
import { ProjectCard } from "./project-card";
import type { Project } from "@/lib/schemas";

interface ProjectsSectionProps {
  featured: Project[];
  standard: Project[];
}

export function ProjectsSection({ featured, standard }: ProjectsSectionProps) {
  return (
    <section
      id="work"
      aria-label="Projects"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
    >
      <SectionHeading label="Projects" />

      {/* ── Featured projects ─────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <div className="mb-10">
          {featured.map((project, i) => (
            <FeaturedProject key={project.id} project={project} index={i} />
          ))}
        </div>
      )}

      {/* ── Secondary projects ────────────────────────────────────────────── */}
      {standard.length > 0 && (
        <>
          {/* Sub-label distinguishing the two tiers */}
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              More projects
            </span>
            <div className="h-px flex-1 bg-border/40" aria-hidden="true" />
          </div>

          {/* Responsive grid: 1 col mobile → 2 col sm → 3 col lg */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {standard.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
