import { Button } from "./Button";
import { Dialog } from "./Dialog";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  // Shown under the message when the action failed.
  error?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// A confirmation window for actions that cannot be undone.
export function ConfirmDialog({ open, title, message, confirmLabel, error, busy, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Dialog open={open} title={title} onClose={onCancel} busy={busy}>
      <p className="mt-2 text-body text-ink-muted">{message}</p>
      {error && <p className="mt-3 text-caption text-danger">{error}</p>}
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={busy}>
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}
