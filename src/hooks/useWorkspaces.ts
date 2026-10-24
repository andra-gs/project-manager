import { MOCK_WORKSPACES } from "../mocks/workspaces";
import type { WorkspaceSummary } from "../types/workspace";

// Screens get workspaces through this hook only. In Phase 2 the body is replaced by a database
// call, and no screen needs to change.
export function useWorkspaces(): WorkspaceSummary[] {
  return MOCK_WORKSPACES;
}
