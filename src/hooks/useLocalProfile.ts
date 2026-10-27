import { useEffect, useSyncExternalStore } from "react";
import * as profileService from "../services/profileService";
import type { LocalProfile } from "../types/profile";
import { createKeyedLoader } from "./createKeyedLoader";

const KEY = "local";
const loader = createKeyedLoader(() => profileService.getLocalProfile());
const NOT_LOADED: LocalProfile = { displayName: "", initials: "" };

export function useLocalProfile() {
  const snapshot = useSyncExternalStore(loader.subscribe, loader.getSnapshot);

  useEffect(() => {
    void loader.load(KEY);
  }, []);

  const state = loader.stateFor(snapshot, KEY);

  // Throws when it fails, so the form can show the message.
  async function renameProfile(name: string) {
    await profileService.renameLocalProfile(name);
    await loader.load(KEY);
  }

  return {
    // Empty strings until the profile is read from the database.
    profile: state?.kind === "ready" ? state.data : NOT_LOADED,
    loaded: state?.kind === "ready",
    renameProfile,
  };
}
