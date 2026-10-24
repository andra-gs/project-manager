import { useMemo } from "react";
import { createMockProjects, toProjectSummary } from "../mocks/projects";
import { MOCK_WORKSPACES } from "../mocks/workspaces";
import type { ProjectDetail } from "../types/project";

// Returns undefined when the project does not exist. In Phase 2 the body is replaced by database calls.
export function useProjectDetail(projectId: string | undefined): ProjectDetail | undefined {
  return useMemo(() => {
    const project = createMockProjects().find((candidate) => candidate.id === projectId);
    if (!project) return undefined;
    const workspace = MOCK_WORKSPACES.find((candidate) => candidate.id === project.workspaceId);
    return {
      ...toProjectSummary(project),
      workspaceId: project.workspaceId,
      workspaceName: workspace?.name ?? "",
      taskCount: project.taskCount,
      completedTaskCount: project.completedTaskCount,
      activity: project.activity,
    };
  }, [projectId]);
}
