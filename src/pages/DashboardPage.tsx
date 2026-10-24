import { Button } from "../components/ui/Button";
import { ActivitySection } from "../features/activity/ActivitySection";
import { MyTasksSection } from "../features/dashboard/MyTasksSection";
import { RecentProjectsSection } from "../features/dashboard/RecentProjectsSection";
import { WorkspacesSection } from "../features/dashboard/WorkspacesSection";
import { useDashboardData } from "../hooks/useDashboardData";
import { useLocalProfile } from "../hooks/useLocalProfile";
import { getGreeting } from "../lib/greeting";

// The page only arranges sections. Data comes from a hook; the look comes from shared components.
export function DashboardPage() {
  const data = useDashboardData();
  const profile = useLocalProfile();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-display font-bold">
            {getGreeting(new Date().getHours())}, {profile.displayName}
          </h2>
          <p className="text-body text-ink-muted">Here’s what needs your attention today.</p>
        </div>
        {/* Creating projects arrives in Phase 2, so the button is shown but disabled. */}
        <Button icon="plus" disabled title="Creating projects is not available yet">
          New Project
        </Button>
      </div>

      <WorkspacesSection workspaces={data.workspaces} />
      <RecentProjectsSection projects={data.recentProjects} />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <MyTasksSection tasks={data.myTasks} />
        </div>
        <ActivitySection entries={data.activity} />
      </div>
    </div>
  );
}
