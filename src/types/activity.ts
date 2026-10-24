export interface ActivityEntry {
  id: string;
  actorName: string;
  action: string;
  // ISO date-time text.
  occurredAt: string;
  // Set when the entry is shown outside its project, for example in a workspace.
  projectName?: string;
}
