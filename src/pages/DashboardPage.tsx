import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { IconButton } from "../components/ui/IconButton";
import { PlaceholderNotice } from "../components/ui/PlaceholderNotice";
import { PriorityBadge } from "../components/ui/PriorityBadge";
import { ProgressBar } from "../components/ui/ProgressBar";
import { StatusBadge } from "../components/ui/StatusBadge";

// TEMPORARY: the section below shows every shared component once, so they can be checked by eye.
// The real dashboard replaces this page in Phase 1, step 5.
export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PlaceholderNotice message="The dashboard is built in Phase 1, step 5. Below: a temporary preview of the shared components." />

      <Card>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <Button icon="plus">New Project</Button>
            <Button variant="secondary">Cancel</Button>
            <Button disabled>Disabled</Button>
            <IconButton icon="settings" label="Example icon button" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PriorityBadge priority="low" />
            <PriorityBadge priority="medium" />
            <PriorityBadge priority="high" />
            <StatusBadge status="todo" />
            <StatusBadge status="in-progress" />
            <StatusBadge status="review" />
            <StatusBadge status="done" />
            <Badge tone="accent">Today</Badge>
            <Badge tone="danger">Overdue · Oct 2</Badge>
          </div>
          <div className="flex flex-col gap-3">
            <ProgressBar value={72} label="Example progress, 72 percent" tone="accent" />
            <ProgressBar value={46} label="Example progress, 46 percent" tone="info" />
            <ProgressBar value={28} label="Example progress, 28 percent" tone="success" />
          </div>
        </div>
      </Card>
    </div>
  );
}
