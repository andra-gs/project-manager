import { Card } from "./Card";

interface PlaceholderNoticeProps {
  message: string;
}

// TEMPORARY: marks a screen that is not built yet. Replaced by real screens in later Phase 1 steps.
export function PlaceholderNotice({ message }: PlaceholderNoticeProps) {
  return (
    <Card>
      <p className="text-body text-ink-muted">{message}</p>
    </Card>
  );
}
