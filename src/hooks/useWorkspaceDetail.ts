import { useEffect, useSyncExternalStore } from "react";
import * as projectService from "../services/projectService";
import * as workspaceService from "../services/workspaceService";
import { createKeyedLoader } from "./createKeyedLoader";

const loader = createKeyedLoader(workspaceService.getWorkspaceDetail);

// The state is undefined when there is no workspace id in the address.
export function useWorkspaceDetail(workspaceId: string | undefined) {
  const snapshot = useSyncExternalStore(loader.subscribe, loader.getSnapshot);

  useEffect(() => {
    if (workspaceId) void loader.load(workspaceId);
  }, [workspaceId]);

  // Throws when it fails, so the dialog can show the message.
  async function createProject(name: string, description: string) {
    if (!workspaceId) return;
    await projectService.createProject(workspaceId, name, description);
    await loader.load(workspaceId);
  }

  return { state: loader.stateFor(snapshot, workspaceId), createProject };
}
