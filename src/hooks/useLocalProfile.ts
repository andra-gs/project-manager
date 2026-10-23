import { MOCK_LOCAL_PROFILE_NAME } from "../mocks/localProfile";

export interface LocalProfile {
  displayName: string;
  initials: string;
}

// Temporary: returns mock data until the local profile is stored in the database (Phase 2).
export function useLocalProfile(): LocalProfile {
  return {
    displayName: MOCK_LOCAL_PROFILE_NAME,
    initials: MOCK_LOCAL_PROFILE_NAME.slice(0, 2).toUpperCase(),
  };
}
