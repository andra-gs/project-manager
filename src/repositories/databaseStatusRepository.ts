import { getDatabase } from "../lib/database";

export interface DatabaseStatus {
  // Highest migration that was applied successfully, or undefined when none was.
  schemaVersion: number | undefined;
  // Tables created by the app (internal tables are not counted).
  tableCount: number;
  foreignKeysEnabled: boolean;
  // Number of rows in the main tables. Shown in Settings to check that deleting cascades.
  rowCounts: { workspaces: number; projects: number; tasks: number };
}

// Read-only check that the database is reachable and has the expected shape.
export async function readDatabaseStatus(): Promise<DatabaseStatus> {
  const database = await getDatabase();

  const versions = await database.select<{ version: number | null }[]>(
    "SELECT MAX(version) AS version FROM _sqlx_migrations WHERE success = 1",
  );
  const tables = await database.select<{ total: number }[]>(
    "SELECT COUNT(*) AS total FROM sqlite_master WHERE type = 'table' AND substr(name, 1, 7) <> 'sqlite_' AND name <> '_sqlx_migrations'",
  );
  const counts = await database.select<{ workspaces: number; projects: number; tasks: number }[]>(
    "SELECT (SELECT COUNT(*) FROM workspaces) AS workspaces, (SELECT COUNT(*) FROM projects) AS projects, (SELECT COUNT(*) FROM tasks) AS tasks",
  );
  const foreignKeys = await database.select<{ foreign_keys: number }[]>("PRAGMA foreign_keys");

  return {
    schemaVersion: versions[0]?.version ?? undefined,
    tableCount: tables[0]?.total ?? 0,
    foreignKeysEnabled: foreignKeys[0]?.foreign_keys === 1,
    rowCounts: counts[0] ?? { workspaces: 0, projects: 0, tasks: 0 },
  };
}
