import { useEffect, useRef } from "react";
import { Button } from "./Button";

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

// A confirmation window for actions that cannot be undone. It uses the browser's built-in <dialog>,
// which traps keyboard focus and closes with the Escape key.
export function ConfirmDialog({ open, title, message, confirmLabel, error, busy, onConfirm, onCancel }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onCancel();
      }}
      className="m-auto w-full max-w-md rounded-card border border-border bg-surface p-6 text-ink backdrop:bg-ink/40"
    >
      <h2 className="text-heading font-bold">{title}</h2>
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
    </dialog>
  );
}
