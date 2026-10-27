import type { TaskStatus } from "../../types/task";
import { Badge, type BadgeTone } from "./Badge";

const STATUSES: Record<TaskStatus, { label: string; tone: BadgeTone }> = {
  todo: { label: "To Do", tone: "neutral" },
  in_progress: { label: "In Progress", tone: "info" },
  review: { label: "Review", tone: "warning" },
  done: { label: "Done", tone: "success" },
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  const { label, tone } = STATUSES[status];
  return <Badge tone={tone}>{label}</Badge>;
}
