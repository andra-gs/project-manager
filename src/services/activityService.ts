import { describeActivity, isProjectContentAction } from "../lib/activityText";
import * as repository from "../repositories/activityRepository";
import type { ActivityRow } from "../repositories/activityRepository";
import type { ActivityEntry } from "../types/activity";

// How many entries a screen shows.
export const ACTIVITY_LIMIT = 20;

function toEntry(row: ActivityRow): ActivityEntry {
  return {
    id: row.id,
    actorName: row.actorName ?? "Someone",
    action: describeActivity(row.action, row.subjectTitle, row.oldValue, row.newValue),
    occurredAt: row.createdAt,
    projectName: isProjectContentAction(row.action) ? (row.projectName ?? undefined) : undefined,
  };
}

export async function getRecentActivity(): Promise<ActivityEntry[]> {
  return (await repository.listRecentActivity(ACTIVITY_LIMIT)).map(toEntry);
}

export async function getWorkspaceActivity(workspaceId: string): Promise<ActivityEntry[]> {
  return (await repository.listWorkspaceActivity(workspaceId, ACTIVITY_LIMIT)).map(toEntry);
}

export async function getProjectActivity(projectId: string): Promise<ActivityEntry[]> {
  return (await repository.listProjectActivity(projectId, ACTIVITY_LIMIT)).map(toEntry);
}
