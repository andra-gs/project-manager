import { useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { Dialog } from "../../components/ui/Dialog";
import { SelectField } from "../../components/ui/SelectField";
import { TextArea } from "../../components/ui/TextArea";
import { TextField } from "../../components/ui/TextField";
import { describeError } from "../../lib/errors";
import { PROJECT_DESCRIPTION_MAX_LENGTH, PROJECT_NAME_MAX_LENGTH } from "../../services/projectService";

interface NewProjectDialogProps {
  open: boolean;
  onClose: () => void;
  // Pass the list when the user must choose the workspace (for example on the Dashboard).
  // Leave it out when the workspace is already known (the workspace page).
  workspaces?: { id: string; name: string }[];
  onCreate: (name: string, description: string, workspaceId?: string) => Promise<void>;
}

function NewProjectForm({ onClose, workspaces, onCreate }: Omit<NewProjectDialogProps, "open">) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workspaceId, setWorkspaceId] = useState(workspaces?.[0]?.id);
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(undefined);
    try {
      await onCreate(name, description, workspaceId);
      onClose();
    } catch (failure) {
      setError(describeError(failure));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      {workspaces && (
        <SelectField
          label="Workspace"
          value={workspaceId}
          options={workspaces.map((workspace) => ({ value: workspace.id, label: workspace.name }))}
          onChange={(event) => setWorkspaceId(event.target.value)}
        />
      )}
      <TextField
        label="Project name"
        value={name}
        maxLength={PROJECT_NAME_MAX_LENGTH}
        autoFocus
        onChange={(event) => setName(event.target.value)}
      />
      <TextArea
        label="Description (optional)"
        value={description}
        maxLength={PROJECT_DESCRIPTION_MAX_LENGTH}
        onChange={(event) => setDescription(event.target.value)}
      />
      {error && <p className="text-caption text-danger">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose} disabled={busy}>
          Cancel
        </Button>
        <Button type="submit" disabled={busy}>
          Create project
        </Button>
      </div>
    </form>
  );
}

export function NewProjectDialog({ open, onClose, workspaces, onCreate }: NewProjectDialogProps) {
  return (
    <Dialog open={open} title="New project" onClose={onClose}>
      {open && <NewProjectForm onClose={onClose} workspaces={workspaces} onCreate={onCreate} />}
    </Dialog>
  );
}
