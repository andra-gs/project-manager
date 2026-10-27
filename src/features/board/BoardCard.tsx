import { Badge } from "../../components/ui/Badge";
import { IconButton } from "../../components/ui/IconButton";
import { PriorityBadge } from "../../components/ui/PriorityBadge";
import { getDueInfo } from "../../lib/dueDate";
import { TASK_STATUSES, type TaskItem, type TaskStatus } from "../../types/task";

interface BoardCardProps {
  task: TaskItem;
  disabled: boolean;
  onMove: (taskId: string, status: TaskStatus) => void;
}

// One task on the board: title, priority, deadline, and two buttons that move it one column left or right.
export function BoardCard({ task, disabled, onMove }: BoardCardProps) {
  const index = TASK_STATUSES.indexOf(task.status);
  const previous = index > 0 ? TASK_STATUSES[index - 1] : undefined;
  const next = index < TASK_STATUSES.length - 1 ? TASK_STATUSES[index + 1] : undefined;
  const due = task.dueDate && task.status !== "done" ? getDueInfo(task.dueDate) : undefined;

  return (
    <div className="flex flex-col gap-2 rounded-control border border-border bg-surface p-3">
      <p className="text-small font-semibold break-words">{task.title}</p>
      <div className="flex flex-wrap items-center gap-2">
        <PriorityBadge priority={task.priority} />
        {due && <Badge tone={due.tone}>{due.label}</Badge>}
      </div>
      <div className="flex justify-end gap-1">
        <IconButton
          icon="arrowLeft"
          label="Move to the previous column"
          disabled={disabled || !previous}
          onClick={() => previous && onMove(task.id, previous)}
        />
        <IconButton
          icon="arrowRight"
          label="Move to the next column"
          disabled={disabled || !next}
          onClick={() => next && onMove(task.id, next)}
        />
      </div>
    </div>
  );
}
