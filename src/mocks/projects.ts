// TEMPORARY MOCK DATA for building the interface (Phase 1). Replaced by database data in Phase 2.
import type { ActivityEntry } from "../types/activity";
import type { ProjectStatus, ProjectSummary } from "../types/project";
import { calculateProgress } from "../lib/progress";
import { dateFromToday, minutesAgo } from "./helpers";

export interface MockProject {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  taskCount: number;
  completedTaskCount: number;
  // Deadlines of the tasks that are not finished yet.
  openTaskDueDates: string[];
  activity: ActivityEntry[];
}

export function createMockProjects(): MockProject[] {
  return [
    {
      id: "website-perpustakaan",
      workspaceId: "kelompok-informatika",
      name: "Website Perpustakaan",
      description: "A library management platform for campus students.",
      status: "active",
      taskCount: 25,
      completedTaskCount: 18,
      openTaskDueDates: [dateFromToday(-1), dateFromToday(0), dateFromToday(1), dateFromToday(3), dateFromToday(5), dateFromToday(9)],
      activity: [
        { id: "a1", actorName: "Sinta", action: "added a new task", occurredAt: minutesAgo(25) },
        { id: "a2", actorName: "Andra", action: "completed “Setup database”", occurredAt: minutesAgo(70) },
        { id: "a3", actorName: "Raka", action: "commented on the login task", occurredAt: minutesAgo(130) },
        { id: "a4", actorName: "Dimas", action: "updated the requirements notes", occurredAt: minutesAgo(60 * 26) },
      ],
    },
    {
      id: "mobile-task-manager",
      workspaceId: "kelompok-informatika",
      name: "Mobile Task Manager",
      description: "Cross-platform · Flutter · Firebase",
      status: "active",
      taskCount: 28,
      completedTaskCount: 13,
      openTaskDueDates: [dateFromToday(2), dateFromToday(4), dateFromToday(7)],
      activity: [{ id: "a5", actorName: "Raka", action: "completed a task", occurredAt: minutesAgo(300) }],
    },
    {
      id: "campus-game",
      workspaceId: "kelompok-informatika",
      name: "Campus Game",
      description: "2D game · Unity · C#",
      status: "active",
      taskCount: 25,
      completedTaskCount: 7,
      openTaskDueDates: [dateFromToday(-2), dateFromToday(6)],
      activity: [],
    },
    {
      id: "security-lab",
      workspaceId: "kelompok-informatika",
      name: "Security Lab",
      description: "Cybersecurity practice · Python · Linux",
      status: "active",
      taskCount: 25,
      completedTaskCount: 16,
      openTaskDueDates: [dateFromToday(8)],
      activity: [],
    },
    {
      id: "client-landing-page",
      workspaceId: "team-freelance",
      name: "Client Landing Page",
      description: "Marketing site · HTML · Tailwind",
      status: "active",
      taskCount: 10,
      completedTaskCount: 4,
      openTaskDueDates: [dateFromToday(3)],
      activity: [{ id: "a6", actorName: "Andra", action: "added a new task", occurredAt: minutesAgo(500) }],
    },
  ];
}

export function toProjectSummary(project: MockProject): ProjectSummary {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    status: project.status,
    progressPercent: calculateProgress(project.completedTaskCount, project.taskCount),
  };
}
