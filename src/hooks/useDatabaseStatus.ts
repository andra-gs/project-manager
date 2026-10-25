import { useEffect, useState } from "react";
import { readDatabaseStatus, type DatabaseStatus } from "../repositories/databaseStatusRepository";

export type DatabaseStatusState =
  | { kind: "loading" }
  | { kind: "ready"; status: DatabaseStatus }
  | { kind: "error"; message: string };

export function useDatabaseStatus(): DatabaseStatusState {
  const [state, setState] = useState<DatabaseStatusState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    readDatabaseStatus()
      .then((status) => {
        if (!cancelled) setState({ kind: "ready", status });
      })
      .catch((error: unknown) => {
        if (!cancelled) setState({ kind: "error", message: error instanceof Error ? error.message : String(error) });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
