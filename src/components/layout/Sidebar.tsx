import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { FOOTER_NAV, MAIN_NAV, workspacePath } from "../../app/navigation";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import { APP_NAME, APP_NAME_NOTE } from "../../lib/appInfo";
import { Icon, type IconName } from "../icons/Icon";

interface SidebarLinkProps {
  to: string;
  icon: IconName;
  children: ReactNode;
}

const LINK_BASE =
  "flex h-10 items-center gap-3 rounded-control px-3 text-body outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent";
const LINK_ACTIVE = "bg-accent-soft font-medium text-accent";
const LINK_IDLE = "text-ink-muted hover:bg-surface-muted hover:text-ink";

function SidebarLink({ to, icon, children }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `${LINK_BASE} ${isActive ? LINK_ACTIVE : LINK_IDLE}`}
    >
      <Icon name={icon} className="size-5 shrink-0" />
      <span className="truncate">{children}</span>
    </NavLink>
  );
}

export function Sidebar() {
  const workspaces = useWorkspaces();

  return (
    <aside className="flex w-(--layout-sidebar-width) shrink-0 flex-col border-r border-border bg-surface">
      <div className="px-6 pt-5 pb-4">
        <p className="text-body-lg font-bold text-accent">{APP_NAME}</p>
        <p className="mt-1 text-micro font-medium uppercase text-ink-muted">{APP_NAME_NOTE}</p>
      </div>

      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3.5 pb-4">
        <div className="flex flex-col gap-1">
          {MAIN_NAV.map((item) => (
            <SidebarLink key={item.path} to={item.path} icon={item.icon}>
              {item.label}
            </SidebarLink>
          ))}
        </div>

        <p className="mt-6 mb-2 px-3 text-micro font-bold uppercase text-ink-muted">Workspaces</p>
        <div className="flex flex-col gap-1">
          {workspaces.map((workspace) => (
            <SidebarLink key={workspace.id} to={workspacePath(workspace.id)} icon="workspace">
              {workspace.name}
            </SidebarLink>
          ))}
        </div>
      </nav>

      <nav aria-label="Secondary" className="flex flex-col gap-1 px-3.5 pb-4">
        {FOOTER_NAV.map((item) => (
          <SidebarLink key={item.path} to={item.path} icon={item.icon}>
            {item.label}
          </SidebarLink>
        ))}
      </nav>
    </aside>
  );
}
