import { Badge } from "../../components/ui/Badge";
import { EmptyMessage } from "../../components/ui/EmptyMessage";
import type { TaskItem, TaskStatus } from "../../types/task";
import { BoardCard } from "./BoardCard";

interface BoardColumnProps {
  title: string;
  tasks: TaskItem[];
  disabled: boolean;
  onMove: (taskId: string, status: TaskStatus) => void;
}

// One status column: its name, how many tasks it holds, and the task cards.
export function BoardColumn({ title, tasks, disabled, onMove }: BoardColumnProps) {
  return (
    <section aria-label={title} className="flex flex-col gap-3 rounded-card bg-surface-muted p-3">
      <div className="flex items-center justify-between gap-2 px-1">
        <h3 className="text-caption font-bold tracking-wide text-ink-muted uppercase">{title}</h3>
        <Badge>{tasks.length}</Badge>
      </div>
      {tasks.length === 0 ? (
        <EmptyMessage>No tasks</EmptyMessage>
      ) : (
        tasks.map((task) => <BoardCard key={task.id} task={task} disabled={disabled} onMove={onMove} />)
      )}
    </section>
  );
}
