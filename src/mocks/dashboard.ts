// TEMPORARY MOCK DATA for building the interface (Phase 1). Replaced by database data in Phase 2.
// Dates are computed from today, so the overdue, today, and tomorrow labels always make sense.
import type { DashboardData } from "../types/dashboard";

function dateFromToday(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60000).toISOString();
}

export function createMockDashboardData(): DashboardData {
  return {
    workspaces: [
      { id: "kelompok-informatika", name: "Kelompok Informatika", memberCount: 4, activeProjectCount: 4, status: "active" },
    ],
    recentProjects: [
      { id: "website-perpustakaan", name: "Website Perpustakaan", description: "Web application · React + Node.js", progressPercent: 72 },
      { id: "mobile-task-manager", name: "Mobile Task Manager", description: "Android / iOS · Flutter", progressPercent: 46 },
      { id: "campus-game", name: "Campus Game", description: "2D game · Unity", progressPercent: 28 },
    ],
    myTasks: [
      { id: "task-1", title: "Write game design document", projectName: "Campus Game", dueDate: dateFromToday(-2) },
      { id: "task-2", title: "Implement login API", projectName: "Website Perpustakaan", dueDate: dateFromToday(0) },
      { id: "task-3", title: "Review project requirements", projectName: "Website Perpustakaan", dueDate: dateFromToday(1) },
    ],
    activity: [
      { id: "activity-1", actorName: "Raka", action: "created a task", occurredAt: minutesAgo(8) },
      { id: "activity-2", actorName: "Sinta", action: "completed a task", occurredAt: minutesAgo(65) },
      { id: "activity-3", actorName: "Andra", action: "updated the project notes", occurredAt: minutesAgo(190) },
    ],
  };
}
