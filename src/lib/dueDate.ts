// Turns a deadline into the label and color the interface shows.
// A deadline is a calendar date written "YYYY-MM-DD". The final storage format is decided in Phase 2.
export type DueTone = "danger" | "accent" | "success" | "neutral";

export interface DueInfo {
  label: string;
  tone: DueTone;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseLocalDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getDueInfo(dueDate: string, now: Date = new Date()): DueInfo {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = parseLocalDate(dueDate);
  const days = Math.round((due.getTime() - today.getTime()) / MS_PER_DAY);

  if (days < 0) return { label: `Overdue · ${formatShortDate(due)}`, tone: "danger" };
  if (days === 0) return { label: "Today", tone: "accent" };
  if (days === 1) return { label: "Tomorrow", tone: "success" };
  return { label: formatShortDate(due), tone: "neutral" };
}
