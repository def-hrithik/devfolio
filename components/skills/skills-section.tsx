import { SectionHeading } from "@/components/home/section-heading";
import type { SkillGroup } from "@/lib/schemas";

interface SkillsSectionProps {
  groups: SkillGroup[];
}

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      aria-label="Technical skills"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
    >
      <SectionHeading label="Skills" />

      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.id}>
            <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
