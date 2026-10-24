// TEMPORARY MOCK DATA for building the interface (Phase 1).
// It is replaced by real database data in Phase 2. Nothing outside src/hooks imports this folder.
import type { WorkspaceSummary } from "../types/workspace";

export const MOCK_WORKSPACES: WorkspaceSummary[] = [
  { id: "kelompok-informatika", name: "Kelompok Informatika", memberCount: 4 },
  { id: "team-freelance", name: "Team Freelance", memberCount: 2 },
  // This workspace has no projects on purpose, so the empty state can be seen.
  { id: "content-creator", name: "Content Creator", memberCount: 1 },
];
