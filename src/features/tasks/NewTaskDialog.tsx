import { useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { Dialog } from "../../components/ui/Dialog";
import { SelectField } from "../../components/ui/SelectField";
import { TextField } from "../../components/ui/TextField";
import { describeError } from "../../lib/errors";
import { TASK_TITLE_MAX_LENGTH } from "../../services/taskService";
import type { TaskPriority } from "../../types/task";

interface NewTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, priority: TaskPriority, dueDate: string) => Promise<void>;
}

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

function NewTaskForm({ onClose, onCreate }: Omit<NewTaskDialogProps, "open">) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(undefined);
    try {
      await onCreate(title, priority, dueDate);
      onClose();
    } catch (failure) {
      setError(describeError(failure));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      <TextField
        label="Task title"
        value={title}
        maxLength={TASK_TITLE_MAX_LENGTH}
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
      />
      <SelectField
        label="Priority"
        value={priority}
        options={PRIORITY_OPTIONS}
        onChange={(event) => setPriority(event.target.value as TaskPriority)}
      />
      <TextField label="Deadline (optional)" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      {error && <p className="text-caption text-danger">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose} disabled={busy}>
          Cancel
        </Button>
        <Button type="submit" disabled={busy}>
          Create task
        </Button>
      </div>
    </form>
  );
}

export function NewTaskDialog({ open, onClose, onCreate }: NewTaskDialogProps) {
  return (
    <Dialog open={open} title="New task" onClose={onClose}>
      {open && <NewTaskForm onClose={onClose} onCreate={onCreate} />}
    </Dialog>
  );
}
