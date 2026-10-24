import type { ReactNode } from "react";
import { cx } from "../../lib/classNames";

interface CardProps {
  children: ReactNode;
  // "none" lets the content touch the edges, for example a list with its own row spacing.
  padding?: "md" | "none";
}

export function Card({ children, padding = "md" }: CardProps) {
  return (
    <div className={cx("rounded-card border border-border bg-surface", padding === "md" && "p-5")}>
      {children}
    </div>
  );
}
