import { getDatabase } from "../lib/database";

async function findFirstProfileId(): Promise<string | undefined> {
  const database = await getDatabase();
  const rows = await database.select<{ id: string }[]>("SELECT id FROM profiles ORDER BY created_at LIMIT 1");
  return rows[0]?.id;
}

// Returns the id of the local profile, creating it if the table is empty.
// The insert is one statement that only adds a row when no profile exists, so two calls at the same
// moment cannot create two profiles.
export async function ensureLocalProfile(id: string, displayName: string, now: string): Promise<string> {
  const existing = await findFirstProfileId();
  if (existing) return existing;

  const database = await getDatabase();
  await database.execute(
    "INSERT INTO profiles (id, display_name, created_at) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT 1 FROM profiles)",
    [id, displayName, now],
  );
  const created = await findFirstProfileId();
  if (!created) throw new Error("The local profile could not be created.");
  return created;
}
