import { DEFAULT_PROFILE_NAME } from "../lib/appInfo";
import { ensureLocalProfile } from "../repositories/profileRepository";

// The id of the local profile. The profile is created on first use.
export function getLocalProfileId(): Promise<string> {
  return ensureLocalProfile(crypto.randomUUID(), DEFAULT_PROFILE_NAME, new Date().toISOString());
}
