import { EmptyMessage } from "../../components/ui/EmptyMessage";
import type { ProgressTone } from "../../components/ui/ProgressBar";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { ProjectCard } from "../projects/ProjectCard";
import type { ProjectSummary } from "../../types/project";

// Projects take these bar colors in turn. Whether a project stores its own color is decided in Phase 2.
const BAR_TONES: ProgressTone[] = ["accent", "info", "success"];

export function RecentProjectsSection({ projects }: { projects: ProjectSummary[] }) {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeading>Recent Projects</SectionHeading>
      {projects.length === 0 ? (
        <EmptyMessage>No projects yet. Create a workspace in Settings, then add a project.</EmptyMessage>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} tone={BAR_TONES[index % BAR_TONES.length]} />
          ))}
        </div>
      )}
    </section>
  );
}
