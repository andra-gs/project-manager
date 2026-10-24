import { workspacePath } from "../../app/navigation";
import { Badge } from "../../components/ui/Badge";
import { EmptyMessage } from "../../components/ui/EmptyMessage";
import { LinkCard } from "../../components/ui/LinkCard";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { pluralize } from "../../lib/text";
import type { WorkspaceOverview } from "../../types/dashboard";

export function WorkspacesSection({ workspaces }: { workspaces: WorkspaceOverview[] }) {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeading>Your Workspaces</SectionHeading>
      {workspaces.length === 0 ? (
        <EmptyMessage>No workspaces yet.</EmptyMessage>
      ) : (
        <div className="flex flex-col gap-3">
          {workspaces.map((workspace) => (
            <LinkCard key={workspace.id} to={workspacePath(workspace.id)}>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-body-lg font-semibold">{workspace.name}</p>
                  <p className="text-caption text-ink-muted">
                    {pluralize(workspace.memberCount, "member")} · {pluralize(workspace.activeProjectCount, "active project")}
                  </p>
                </div>
                <Badge tone={workspace.status === "active" ? "success" : "neutral"} uppercase>
                  {workspace.status}
                </Badge>
              </div>
            </LinkCard>
          ))}
        </div>
      )}
    </section>
  );
}
