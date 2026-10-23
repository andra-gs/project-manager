import { useLocation } from "react-router";
import { getPageHeading } from "../../app/navigation";
import { useLocalProfile } from "../../hooks/useLocalProfile";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import { Avatar } from "../ui/Avatar";

export function TopBar() {
  const { pathname } = useLocation();
  const workspaces = useWorkspaces();
  const profile = useLocalProfile();
  const heading = getPageHeading(pathname, workspaces);

  return (
    <header className="flex h-(--layout-topbar-height) shrink-0 items-center justify-between gap-4 border-b border-border bg-surface px-9">
      <div className="min-w-0">
        <h1 className="truncate text-title font-bold">{heading.title}</h1>
        <p className="truncate text-small text-ink-muted">{heading.subtitle}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <Avatar initials={profile.initials} />
        <div>
          <p className="text-body font-semibold">{profile.displayName}</p>
          <p className="text-caption text-ink-muted">Local profile</p>
        </div>
      </div>
    </header>
  );
}
