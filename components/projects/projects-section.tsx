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
      aria-label="Selected work"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
    >
      <SectionHeading label="Selected Work" />

      {/* Featured — large editorial treatment */}
      {featured.length > 0 && (
        <div className="mb-8">
          {featured.map((project) => (
            <FeaturedProject key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Standard — compact card grid */}
      {standard.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {standard.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
