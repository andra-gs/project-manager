import { useState } from "react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { EmptyMessage } from "../../components/ui/EmptyMessage";
import { ListRow } from "../../components/ui/ListRow";
import { PriorityBadge } from "../../components/ui/PriorityBadge";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { getDueInfo } from "../../lib/dueDate";
import { describeError } from "../../lib/errors";
import type { TaskItem, TaskPriority } from "../../types/task";
import { TaskFormDialog } from "./TaskFormDialog";

interface TaskListProps {
  tasks: TaskItem[];
  onSetDone: (taskId: string, done: boolean) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
  onUpdate: (taskId: string, title: string, priority: TaskPriority, dueDate: string) => Promise<void>;
}

export function TaskList({ tasks, onSetDone, onDelete, onUpdate }: TaskListProps) {
  const [editing, setEditing] = useState<TaskItem>();
  const [deleting, setDeleting] = useState<TaskItem>();
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function run(action: () => Promise<void>, onSuccess?: () => void) {
    setBusy(true);
    setError(undefined);
    try {
      await action();
      onSuccess?.();
    } catch (failure) {
      setError(describeError(failure));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      {tasks.length === 0 ? (
        <EmptyMessage>No tasks yet.</EmptyMessage>
      ) : (
        <div className="flex flex-col gap-2">
          {tasks.map((task) => {
            const done = task.status === "done";
            const due = task.dueDate && !done ? getDueInfo(task.dueDate) : undefined;
            return (
              <ListRow
                key={task.id}
                title={task.title}
                subtitle={due ? <Badge tone={due.tone}>{due.label}</Badge> : undefined}
                trailing={
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={task.priority} />
                    <StatusBadge status={task.status} />
                    <Button variant="secondary" disabled={busy} onClick={() => setEditing(task)}>
                      Edit
                    </Button>
                    <Button variant="secondary" disabled={busy} onClick={() => void run(() => onSetDone(task.id, !done))}>
                      {done ? "Reopen" : "Mark done"}
                    </Button>
                    <Button
                      variant="danger"
                      disabled={busy}
                      onClick={() => {
                        setDeleting(task);
                        setError(undefined);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                }
              />
            );
          })}
        </div>
      )}
      {error && !deleting && <p className="mt-3 text-caption text-danger">{error}</p>}

      <TaskFormDialog
        open={editing !== undefined}
        title="Edit task"
        submitLabel="Save"
        initial={editing ? { title: editing.title, priority: editing.priority, dueDate: editing.dueDate } : undefined}
        onClose={() => setEditing(undefined)}
        onSubmit={(title, priority, dueDate) => (editing ? onUpdate(editing.id, title, priority, dueDate) : Promise.resolve())}
      />
      <ConfirmDialog
        open={deleting !== undefined}
        title="Delete this task?"
        message={`“${deleting?.title ?? ""}” will be deleted. This cannot be undone.`}
        confirmLabel="Delete task"
        error={error}
        busy={busy}
        onConfirm={() => deleting && void run(() => onDelete(deleting.id), () => setDeleting(undefined))}
        onCancel={() => setDeleting(undefined)}
      />
    </Card>
  );
}
