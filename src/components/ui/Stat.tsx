import { cx } from "../../lib/classNames";

type StatNoteTone = "muted" | "accent" | "info" | "danger";

interface StatProps {
  label: string;
  value: number | string;
  note: string;
  noteTone?: StatNoteTone;
}

const NOTE_TONES: Record<StatNoteTone, string> = {
  muted: "text-ink-muted",
  accent: "text-accent",
  info: "text-info-strong",
  danger: "text-danger",
};

// A label, a large number, and a short note under it.
export function Stat({ label, value, note, noteTone = "muted" }: StatProps) {
  return (
    <div>
      <p className="text-caption text-ink-muted">{label}</p>
      <p className="mt-1 text-title font-bold">{value}</p>
      <p className={cx("mt-1 text-caption font-medium", NOTE_TONES[noteTone])}>{note}</p>
    </div>
  );
}
