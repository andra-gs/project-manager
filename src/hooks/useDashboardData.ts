import { useMemo } from "react";
import { createMockDashboardData } from "../mocks/dashboard";
import type { DashboardData } from "../types/dashboard";

// The dashboard gets its data only through this hook. In Phase 2 the body is replaced by database
// calls, and no screen needs to change.
export function useDashboardData(): DashboardData {
  return useMemo(() => createMockDashboardData(), []);
}
