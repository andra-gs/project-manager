import type { ReactNode } from "react";
import { cx } from "../../lib/classNames";

export type BadgeTone = "neutral" | "accent" | "success" | "danger" | "info" | "warning";

interface BadgeProps {
  tone?: BadgeTone;
  uppercase?: boolean;
  children: ReactNode;
}

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-track text-ink-muted",
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success-strong",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info-strong",
  warning: "bg-warning-soft text-warning-strong",
};

// The small rounded label used for statuses, priorities, tags, and dates.
export function Badge({ tone = "neutral", uppercase = false, children }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex h-7 items-center rounded-pill px-2.5 text-caption font-medium whitespace-nowrap",
        TONES[tone],
        uppercase && "uppercase",
      )}
    >
      {children}
    </span>
  );
}
