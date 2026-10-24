import type { TaskPriority } from "../../types/task";
import { Badge, type BadgeTone } from "./Badge";

const PRIORITIES: Record<TaskPriority, { label: string; tone: BadgeTone }> = {
  low: { label: "Low", tone: "success" },
  medium: { label: "Medium", tone: "info" },
  high: { label: "High", tone: "danger" },
};

// Knows which color and wording each priority gets, so no screen has to decide it.
export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const { label, tone } = PRIORITIES[priority];
  return (
    <Badge tone={tone} uppercase>
      {label}
    </Badge>
  );
}
