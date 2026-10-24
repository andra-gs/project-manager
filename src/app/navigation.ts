import { matchPath } from "react-router";
import type { IconName } from "../components/icons/Icon";
import { pluralize } from "../lib/text";
import type { ProjectDetail } from "../types/project";
import type { WorkspaceDetail } from "../types/workspace";

// The single list of sidebar destinations. The sidebar and the top bar both read it.
export interface NavItem {
  path: string;
  label: string;
  subtitle: string;
  icon: IconName;
}

export const MAIN_NAV: NavItem[] = [
  { path: "/", label: "Dashboard", subtitle: "Your work, projects, and activity in one place", icon: "dashboard" },
  { path: "/my-tasks", label: "My Tasks", subtitle: "Tasks assigned to you", icon: "tasks" },
  { path: "/calendar", label: "Calendar", subtitle: "Deadlines and schedule", icon: "calendar" },
  { path: "/documents", label: "Documents", subtitle: "Notes and project documentation", icon: "documents" },
];

export const FOOTER_NAV: NavItem[] = [
  { path: "/settings", label: "Settings", subtitle: "Preferences", icon: "settings" },
  { path: "/help", label: "Help & feedback", subtitle: "Help and feedback", icon: "help" },
];

const WORKSPACE_PATH_PATTERN = "/workspaces/:workspaceId";
const PROJECT_PATH_PATTERN = "/projects/:projectId";

export function workspacePath(workspaceId: string): string {
  return `/workspaces/${workspaceId}`;
}

export function projectPath(projectId: string): string {
  return `/projects/${projectId}`;
}

// The workspace or project id in an address, or undefined when the address is another page.
export function getWorkspaceIdFromPath(pathname: string): string | undefined {
  return matchPath(WORKSPACE_PATH_PATTERN, pathname)?.params.workspaceId;
}

export function getProjectIdFromPath(pathname: string): string | undefined {
  return matchPath(PROJECT_PATH_PATTERN, pathname)?.params.projectId;
}

interface HeadingContext {
  workspace?: WorkspaceDetail;
  project?: ProjectDetail;
}

// Title and subtitle shown in the top bar for the current address.
export function getPageHeading(pathname: string, context: HeadingContext): { title: string; subtitle: string } {
  const item = [...MAIN_NAV, ...FOOTER_NAV].find((navItem) => navItem.path === pathname);
  if (item) {
    return { title: item.label, subtitle: item.subtitle };
  }
  const { workspace, project } = context;
  if (workspace && getWorkspaceIdFromPath(pathname)) {
    return {
      title: workspace.name,
      subtitle: `Workspace · ${pluralize(workspace.memberCount, "member")} · ${pluralize(workspace.projects.length, "project")}`,
    };
  }
  if (project && getProjectIdFromPath(pathname)) {
    return { title: "Project Overview", subtitle: `${project.name} · ${project.status}` };
  }
  return { title: "Page not found", subtitle: "" };
}
