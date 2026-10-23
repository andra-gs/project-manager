import { matchPath } from "react-router";
import type { IconName } from "../components/icons/Icon";
import type { WorkspaceSummary } from "../types/workspace";

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

export function workspacePath(workspaceId: string): string {
  return `/workspaces/${workspaceId}`;
}

// Title and subtitle shown in the top bar for the current address.
export function getPageHeading(
  pathname: string,
  workspaces: WorkspaceSummary[],
): { title: string; subtitle: string } {
  const item = [...MAIN_NAV, ...FOOTER_NAV].find((navItem) => navItem.path === pathname);
  if (item) {
    return { title: item.label, subtitle: item.subtitle };
  }
  const match = matchPath(WORKSPACE_PATH_PATTERN, pathname);
  const workspace = workspaces.find((candidate) => candidate.id === match?.params.workspaceId);
  if (workspace) {
    return { title: workspace.name, subtitle: "Workspace" };
  }
  return { title: "Page not found", subtitle: "" };
}
