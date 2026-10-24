import { useParams } from "react-router";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PlaceholderNotice } from "../components/ui/PlaceholderNotice";
import { ProgressBar } from "../components/ui/ProgressBar";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ActivitySection } from "../features/activity/ActivitySection";
import { useProjectDetail } from "../hooks/useProjectDetail";

export function ProjectPage() {
  const { projectId } = useParams();
  const project = useProjectDetail(projectId);

  if (!project) {
    return <PlaceholderNotice message="This project does not exist." />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <Card>
          <h2 className="text-title font-bold">{project.name}</h2>
          <p className="mt-1 text-caption text-ink-muted">{project.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge tone="accent">{project.progressPercent}% complete</Badge>
            <Badge tone={project.status === "active" ? "success" : "neutral"}>
              {project.status === "active" ? "Active" : "Archived"}
            </Badge>
          </div>
        </Card>
        {/* Project settings arrive in Phase 2, so the button is shown but disabled. */}
        <Button variant="secondary" disabled title="Project settings are not available yet">
          Project Settings
        </Button>
      </div>

      <section className="flex flex-col gap-3">
        <SectionHeading>Progress</SectionHeading>
        <Card>
          <p className="text-caption text-ink-muted">Overall progress</p>
          <p className="mt-1 text-display font-bold">{project.progressPercent}%</p>
          <div className="mt-4">
            <ProgressBar value={project.progressPercent} label={`${project.name} overall progress`} size="lg" />
          </div>
          <p className="mt-3 text-caption text-ink-muted">
            {project.completedTaskCount} of {project.taskCount} tasks completed
          </p>
        </Card>
      </section>

      <ActivitySection entries={project.activity} />
    </div>
  );
}
