import { useEffect, useSyncExternalStore } from "react";
import { describeError } from "../lib/errors";
import * as service from "../services/workspaceService";
import type { WorkspaceSummary } from "../types/workspace";

export type WorkspacesState =
  | { kind: "loading" }
  | { kind: "ready"; workspaces: WorkspaceSummary[] }
  | { kind: "error"; message: string };

// The list lives here, outside any one screen, so the sidebar and the Settings page always show the
// same workspaces. After every change the list is read from the database again.
let snapshot: WorkspacesState = { kind: "loading" };
let loadStarted = false;
const listeners = new Set<() => void>();

function setSnapshot(next: WorkspacesState) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

async function reload() {
  try {
    setSnapshot({ kind: "ready", workspaces: await service.listWorkspaces() });
  } catch (error) {
    setSnapshot({ kind: "error", message: describeError(error) });
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Each action throws when it fails, so the screen that asked can show the message next to the form.
async function createWorkspace(name: string) {
  await service.createWorkspace(name);
  await reload();
}

async function renameWorkspace(id: string, name: string) {
  await service.renameWorkspace(id, name);
  await reload();
}

async function deleteWorkspace(id: string) {
  await service.deleteWorkspace(id);
  await reload();
}

export function useWorkspaces() {
  const state = useSyncExternalStore(subscribe, () => snapshot);

  useEffect(() => {
    if (!loadStarted) {
      loadStarted = true;
      void reload();
    }
  }, []);

  return { state, createWorkspace, renameWorkspace, deleteWorkspace };
}
