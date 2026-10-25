import { useEffect, useSyncExternalStore } from "react";
import { describeError } from "../lib/errors";
import * as projectService from "../services/projectService";
import * as workspaceService from "../services/workspaceService";
import type { WorkspaceDetail } from "../types/workspace";

export type WorkspaceDetailState =
  | { kind: "loading" }
  | { kind: "notFound" }
  | { kind: "ready"; workspace: WorkspaceDetail }
  | { kind: "error"; message: string };

// The last loaded detail of each workspace lives here, outside any one screen, so the page and the
// top bar show the same data. The detail is read again every time a page asks for it.
let details: Record<string, WorkspaceDetailState> = {};
const loading = new Set<string>();
const listeners = new Set<() => void>();
const LOADING: WorkspaceDetailState = { kind: "loading" };

function setDetail(id: string, state: WorkspaceDetailState) {
  details = { ...details, [id]: state };
  listeners.forEach((listener) => listener());
}

async function load(id: string) {
  if (loading.has(id)) return;
  loading.add(id);
  try {
    const workspace = await workspaceService.getWorkspaceDetail(id);
    setDetail(id, workspace ? { kind: "ready", workspace } : { kind: "notFound" });
  } catch (error) {
    setDetail(id, { kind: "error", message: describeError(error) });
  } finally {
    loading.delete(id);
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Returns undefined as the state when there is no workspace id in the address.
export function useWorkspaceDetail(workspaceId: string | undefined) {
  const all = useSyncExternalStore(subscribe, () => details);

  useEffect(() => {
    if (workspaceId) void load(workspaceId);
  }, [workspaceId]);

  // Throws when it fails, so the dialog can show the message.
  async function createProject(name: string, description: string) {
    if (!workspaceId) return;
    await projectService.createProject(workspaceId, name, description);
    await load(workspaceId);
  }

  const state = workspaceId ? (all[workspaceId] ?? LOADING) : undefined;
  return { state, createProject };
}
