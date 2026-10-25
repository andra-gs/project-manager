import { getDatabase } from "../lib/database";

export interface DatabaseStatus {
  // Highest migration that was applied successfully, or undefined when none was.
  schemaVersion: number | undefined;
  // Tables created by the app (internal tables are not counted).
  tableCount: number;
  foreignKeysEnabled: boolean;
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
  const foreignKeys = await database.select<{ foreign_keys: number }[]>("PRAGMA foreign_keys");

  return {
    schemaVersion: versions[0]?.version ?? undefined,
    tableCount: tables[0]?.total ?? 0,
    foreignKeysEnabled: foreignKeys[0]?.foreign_keys === 1,
  };
}
