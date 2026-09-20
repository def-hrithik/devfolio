import {
  getSiteData,
  getExperience,
  getFeaturedProjects,
  getStandardProjects,
  getSkillGroups,
} from "@/lib/content";
import { Hero } from "@/components/home/hero";
import { ExperienceSection } from "@/components/experience/experience-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { SkillsSection } from "@/components/skills/skills-section";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  const site = getSiteData();
  const experience = getExperience();
  const featuredProjects = getFeaturedProjects();
  const standardProjects = getStandardProjects();
  const skillGroups = getSkillGroups();

  return (
    <div className="flex flex-col">
      <Hero site={site} />

      <div className="border-t border-border/50">
        <ExperienceSection experience={experience} />
      </div>

      <div className="border-t border-border/50">
        <ProjectsSection featured={featuredProjects} standard={standardProjects} />
      </div>

      <div className="border-t border-border/50">
        <SkillsSection groups={skillGroups} />
      </div>

      <div className="border-t border-border/50">
        <ContactSection site={site} />
      </div>
    </div>
  );
}
