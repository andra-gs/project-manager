import { useMemo } from "react";
import { countDeadlines } from "../lib/dueDate";
import { createMockProjects, toProjectSummary } from "../mocks/projects";
import { MOCK_WORKSPACES } from "../mocks/workspaces";
import type { WorkspaceDetail } from "../types/workspace";

// Returns undefined when the workspace does not exist. In Phase 2 the body is replaced by database
// calls, and no screen needs to change.
export function useWorkspaceDetail(workspaceId: string | undefined): WorkspaceDetail | undefined {
  return useMemo(() => {
    const workspace = MOCK_WORKSPACES.find((candidate) => candidate.id === workspaceId);
    if (!workspace) return undefined;

    const projects = createMockProjects().filter((project) => project.workspaceId === workspace.id);
    const deadlines = countDeadlines(projects.flatMap((project) => project.openTaskDueDates));
    const activity = projects
      .flatMap((project) => project.activity.map((entry) => ({ ...entry, projectName: project.name })))
      .sort((first, second) => second.occurredAt.localeCompare(first.occurredAt))
      .slice(0, 5);

    return {
      ...workspace,
      projects: projects.map(toProjectSummary),
      taskCount: projects.reduce((sum, project) => sum + project.taskCount, 0),
      completedTaskCount: projects.reduce((sum, project) => sum + project.completedTaskCount, 0),
      upcomingDeadlineCount: deadlines.upcoming,
      overdueTaskCount: deadlines.overdue,
      activity,
    };
  }, [workspaceId]);
}
