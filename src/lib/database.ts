import Database from "@tauri-apps/plugin-sql";

// The one place that knows how to reach the database. Only files in src/repositories/ may import it.
// The file name must match "preload" in src-tauri/tauri.conf.json and the migrations in src-tauri/src/lib.rs.
const DATABASE_URL = "sqlite:avenqor.db";

let connection: Promise<Database> | undefined;

export function getDatabase(): Promise<Database> {
  if (!connection) {
    connection = Database.load(DATABASE_URL).catch((error: unknown) => {
      // Forget the failed attempt so the next call can try again.
      connection = undefined;
      throw error;
    });
  }
  return connection;
}
