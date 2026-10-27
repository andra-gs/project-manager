import { useEffect, useSyncExternalStore } from "react";
import * as dashboardService from "../services/dashboardService";
import * as projectService from "../services/projectService";
import { createKeyedLoader } from "./createKeyedLoader";

const KEY = "dashboard";
const loader = createKeyedLoader(() => dashboardService.getDashboardData());

export function useDashboardData() {
  const snapshot = useSyncExternalStore(loader.subscribe, loader.getSnapshot);

  useEffect(() => {
    void loader.load(KEY);
  }, []);

  // Throws when it fails, so the dialog can show the message.
  async function createProject(workspaceId: string, name: string, description: string) {
    await projectService.createProject(workspaceId, name, description);
    await loader.load(KEY);
  }

  return { state: loader.stateFor(snapshot, KEY), createProject };
}
