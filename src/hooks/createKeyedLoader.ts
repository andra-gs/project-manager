import { describeError } from "../lib/errors";

export type LoadState<T> =
  | { kind: "loading" }
  | { kind: "notFound" }
  | { kind: "ready"; data: T }
  | { kind: "error"; message: string };

// Keeps the last loaded item for each id (for example each workspace) outside any one screen, so a
// page and the top bar show the same data. `load` reads the item again; the screens call it whenever
// they are shown, so the data is never older than the visit. Used with React's useSyncExternalStore.
export function createKeyedLoader<T>(fetchItem: (key: string) => Promise<T | undefined>) {
  let states: Record<string, LoadState<T>> = {};
  const loading = new Set<string>();
  const listeners = new Set<() => void>();
  const LOADING: LoadState<T> = { kind: "loading" };

  function setState(key: string, state: LoadState<T>) {
    states = { ...states, [key]: state };
    listeners.forEach((listener) => listener());
  }

  async function load(key: string) {
    if (loading.has(key)) return;
    loading.add(key);
    try {
      const data = await fetchItem(key);
      setState(key, data === undefined ? { kind: "notFound" } : { kind: "ready", data });
    } catch (error) {
      setState(key, { kind: "error", message: describeError(error) });
    } finally {
      loading.delete(key);
    }
  }

  return {
    load,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: () => states,
    // The state of one key, or undefined when there is no key (for example the address has no id).
    stateFor(snapshot: Record<string, LoadState<T>>, key: string | undefined): LoadState<T> | undefined {
      return key ? (snapshot[key] ?? LOADING) : undefined;
    },
  };
}
