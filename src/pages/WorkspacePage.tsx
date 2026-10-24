import { useParams } from "react-router";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { EmptyMessage } from "../components/ui/EmptyMessage";
import { PlaceholderNotice } from "../components/ui/PlaceholderNotice";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Stat } from "../components/ui/Stat";
import { ProjectCard } from "../features/projects/ProjectCard";
import { WorkspaceActivitySection } from "../features/workspaces/WorkspaceActivitySection";
import { useWorkspaceDetail } from "../hooks/useWorkspaceDetail";
import { pluralize } from "../lib/text";
import type { ProgressTone } from "../components/ui/ProgressBar";

const BAR_TONES: ProgressTone[] = ["accent", "info", "success"];

export function WorkspacePage() {
  const { workspaceId } = useParams();
  const workspace = useWorkspaceDetail(workspaceId);

  if (!workspace) {
    return <PlaceholderNotice message="This workspace does not exist." />;
  }

  const activeProjects = workspace.projects.filter((project) => project.status === "active").length;
  const deadlineNote = workspace.overdueTaskCount > 0 ? `upcoming · ${workspace.overdueTaskCount} overdue` : "upcoming";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-title font-bold">Workspace Overview</h2>
        {/* Editing arrives in Phase 2, so the button is shown but disabled. */}
        <Button variant="secondary" disabled title="Editing workspaces is not available yet">
          Edit Workspace
        </Button>
      </div>

      <Card>
        <div className="grid grid-cols-4 gap-6">
          <Stat label="Projects" value={activeProjects} note="active projects" noteTone="accent" />
          <Stat
            label="Tasks"
            value={workspace.taskCount}
            note={`${workspace.completedTaskCount} completed`}
            noteTone="info"
          />
          <Stat label="Members" value={workspace.memberCount} note="local member records" />
          <Stat
            label="Deadlines"
            value={workspace.upcomingDeadlineCount}
            note={deadlineNote}
            noteTone={workspace.overdueTaskCount > 0 ? "danger" : "muted"}
          />
        </div>
      </Card>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <SectionHeading>Projects</SectionHeading>
          <Badge tone="accent">{pluralize(workspace.projects.length, "project")}</Badge>
        </div>
        {workspace.projects.length === 0 ? (
          <EmptyMessage>No projects in this workspace yet.</EmptyMessage>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {workspace.projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} tone={BAR_TONES[index % BAR_TONES.length]} />
            ))}
          </div>
        )}
      </section>

      <WorkspaceActivitySection entries={workspace.activity} />
    </div>
  );
}
