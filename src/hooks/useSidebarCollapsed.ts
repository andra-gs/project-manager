import { useCallback, useEffect, useState } from "react";
import { SIDEBAR_AUTO_COLLAPSE_BELOW_PX } from "../lib/layout";

const NARROW_WINDOW_QUERY = `(max-width: ${SIDEBAR_AUTO_COLLAPSE_BELOW_PX - 1}px)`;

// Sidebar state: expanded when the app opens (collapsed only if the window is narrow).
// It collapses by itself when the window becomes narrow and expands again when it becomes wide.
// The user can toggle it at any time. The choice is not saved between sessions.
export function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(() => window.matchMedia(NARROW_WINDOW_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(NARROW_WINDOW_QUERY);
    const onChange = (event: MediaQueryListEvent) => setCollapsed(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => setCollapsed((current) => !current), []);
  return { collapsed, setCollapsed, toggle };
}
