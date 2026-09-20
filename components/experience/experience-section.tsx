import type { ExperienceItem } from "@/lib/schemas";
import { SectionHeading } from "@/components/home/section-heading";
import { ExperienceItemComponent } from "./experience-item";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
    >
      <SectionHeading label="Experience" />

      <ol aria-label="Experience list">
        {experience.map((item, index) => (
          <li key={item.id}>
            <ExperienceItemComponent
              item={item}
              isLast={index === experience.length - 1}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
