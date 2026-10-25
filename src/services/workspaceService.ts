import { ValidationError } from "../lib/errors";
import * as repository from "../repositories/workspaceRepository";
import type { WorkspaceSummary } from "../types/workspace";
import { getLocalProfileId } from "./profileService";

export const WORKSPACE_NAME_MAX_LENGTH = 60;

// Business rules for a workspace name. Returns the cleaned name or throws a ValidationError.
function validateName(input: string): string {
  const name = input.trim();
  if (name.length === 0) throw new ValidationError("Enter a workspace name.");
  if (name.length > WORKSPACE_NAME_MAX_LENGTH) {
    throw new ValidationError(`The name can have at most ${WORKSPACE_NAME_MAX_LENGTH} characters.`);
  }
  return name;
}

export function listWorkspaces(): Promise<WorkspaceSummary[]> {
  return repository.listWorkspaces();
}

export async function createWorkspace(nameInput: string): Promise<void> {
  const name = validateName(nameInput);
  const ownerProfileId = await getLocalProfileId();
  await repository.insertWorkspace({ id: crypto.randomUUID(), name, ownerProfileId, now: new Date().toISOString() });
}

export async function renameWorkspace(id: string, nameInput: string): Promise<void> {
  const name = validateName(nameInput);
  const changed = await repository.updateWorkspaceName(id, name, new Date().toISOString());
  if (!changed) throw new ValidationError("This workspace no longer exists.");
}

export async function deleteWorkspace(id: string): Promise<void> {
  const deleted = await repository.deleteWorkspace(id);
  if (!deleted) throw new ValidationError("This workspace no longer exists.");
}
