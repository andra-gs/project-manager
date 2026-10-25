import { useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { EmptyMessage } from "../../components/ui/EmptyMessage";
import { ListRow } from "../../components/ui/ListRow";
import { TextField } from "../../components/ui/TextField";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import { describeError } from "../../lib/errors";
import { pluralize } from "../../lib/text";
import { WORKSPACE_NAME_MAX_LENGTH } from "../../services/workspaceService";
import type { WorkspaceSummary } from "../../types/workspace";

// Create, rename, and delete workspaces. The page only arranges this; the rules live in the service.
export function WorkspaceManager() {
  const { state, createWorkspace, renameWorkspace, deleteWorkspace } = useWorkspaces();

  const [newName, setNewName] = useState("");
  const [createError, setCreateError] = useState<string>();
  const [editingId, setEditingId] = useState<string>();
  const [editName, setEditName] = useState("");
  const [editError, setEditError] = useState<string>();
  const [deleting, setDeleting] = useState<WorkspaceSummary>();
  const [deleteError, setDeleteError] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setCreateError(undefined);
    try {
      await createWorkspace(newName);
      setNewName("");
    } catch (error) {
      setCreateError(describeError(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleRename(event: FormEvent) {
    event.preventDefault();
    if (!editingId) return;
    setBusy(true);
    setEditError(undefined);
    try {
      await renameWorkspace(editingId, editName);
      setEditingId(undefined);
    } catch (error) {
      setEditError(describeError(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    setDeleteError(undefined);
    try {
      await deleteWorkspace(deleting.id);
      setDeleting(undefined);
    } catch (error) {
      setDeleteError(describeError(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <div className="flex flex-col gap-5">
        <form onSubmit={handleCreate} className="flex items-start gap-3">
          <div className="flex-1">
            <TextField
              label="New workspace"
              placeholder="For example: Informatics Group"
              value={newName}
              maxLength={WORKSPACE_NAME_MAX_LENGTH}
              error={createError}
              onChange={(event) => setNewName(event.target.value)}
            />
          </div>
          <div className="pt-6">
            <Button type="submit" icon="plus" disabled={busy}>
              Create
            </Button>
          </div>
        </form>

        {state.kind === "loading" && <EmptyMessage>Loading workspaces…</EmptyMessage>}
        {state.kind === "error" && <p className="text-body text-danger">{state.message}</p>}
        {state.kind === "ready" && state.workspaces.length === 0 && <EmptyMessage>No workspaces yet.</EmptyMessage>}
        {state.kind === "ready" && state.workspaces.length > 0 && (
          <div className="flex flex-col gap-3">
            {state.workspaces.map((workspace) =>
              editingId === workspace.id ? (
                <form key={workspace.id} onSubmit={handleRename} className="flex items-start gap-3">
                  <div className="flex-1">
                    <TextField
                      label="Workspace name"
                      value={editName}
                      maxLength={WORKSPACE_NAME_MAX_LENGTH}
                      error={editError}
                      autoFocus
                      onChange={(event) => setEditName(event.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 pt-6">
                    <Button type="submit" disabled={busy}>
                      Save
                    </Button>
                    <Button variant="secondary" disabled={busy} onClick={() => setEditingId(undefined)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <ListRow
                  key={workspace.id}
                  title={workspace.name}
                  subtitle={pluralize(workspace.memberCount, "member")}
                  trailing={
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setEditingId(workspace.id);
                          setEditName(workspace.name);
                          setEditError(undefined);
                        }}
                      >
                        Rename
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setDeleting(workspace);
                          setDeleteError(undefined);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  }
                />
              ),
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleting !== undefined}
        title="Delete this workspace?"
        message={`“${deleting?.name ?? ""}” and every project and task inside it will be deleted. This cannot be undone.`}
        confirmLabel="Delete workspace"
        error={deleteError}
        busy={busy}
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeleting(undefined)}
      />
    </Card>
  );
}
