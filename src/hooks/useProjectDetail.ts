import { useEffect, useSyncExternalStore } from "react";
import * as projectService from "../services/projectService";
import * as taskService from "../services/taskService";
import type { ProjectStatus } from "../types/project";
import type { TaskPriority } from "../types/task";
import { createKeyedLoader } from "./createKeyedLoader";

const loader = createKeyedLoader(projectService.getProjectDetail);

// The state is undefined when there is no project id in the address. Every action throws when it
// fails, so the screen that asked can show the message.
export function useProjectDetail(projectId: string | undefined) {
  const snapshot = useSyncExternalStore(loader.subscribe, loader.getSnapshot);

  useEffect(() => {
    if (projectId) void loader.load(projectId);
  }, [projectId]);

  async function refresh() {
    if (projectId) await loader.load(projectId);
  }

  return {
    state: loader.stateFor(snapshot, projectId),
    async createTask(title: string, priority: TaskPriority, dueDate: string) {
      if (!projectId) return;
      await taskService.createTask(projectId, title, priority, dueDate);
      await refresh();
    },
    async setTaskDone(taskId: string, done: boolean) {
      await taskService.setTaskDone(taskId, done);
      await refresh();
    },
    async deleteTask(taskId: string) {
      await taskService.deleteTask(taskId);
      await refresh();
    },
    async setProjectStatus(status: ProjectStatus) {
      if (!projectId) return;
      await projectService.setProjectStatus(projectId, status);
      await refresh();
    },
    // After this the project no longer exists, so the screen must leave its page.
    async deleteProject() {
      if (!projectId) return;
      await projectService.deleteProject(projectId);
    },
  };
}
