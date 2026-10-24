import { projectPath } from "../../app/navigation";
import { LinkCard } from "../../components/ui/LinkCard";
import { ProgressBar, type ProgressTone } from "../../components/ui/ProgressBar";
import type { ProjectSummary } from "../../types/project";

interface ProjectCardProps {
  project: ProjectSummary;
  tone?: ProgressTone;
}

// One project as a card: name, description, and progress. Opens the project overview when clicked.
export function ProjectCard({ project, tone = "accent" }: ProjectCardProps) {
  return (
    <LinkCard to={projectPath(project.id)}>
      <div className="flex min-h-32 flex-col justify-between gap-4">
        <div>
          <p className="truncate text-body-lg font-semibold">{project.name}</p>
          <p className="truncate text-caption text-ink-muted">{project.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-caption font-medium text-ink-muted">{project.progressPercent}% complete</p>
          <ProgressBar value={project.progressPercent} label={`${project.name} progress`} tone={tone} />
        </div>
      </div>
    </LinkCard>
  );
}
