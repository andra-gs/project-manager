import { Card } from "../../components/ui/Card";
import { EmptyMessage } from "../../components/ui/EmptyMessage";
import { ListRow } from "../../components/ui/ListRow";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { formatRelativeTime } from "../../lib/relativeTime";
import type { ActivityEntry } from "../../types/activity";

export function WorkspaceActivitySection({ entries }: { entries: ActivityEntry[] }) {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeading>Workspace Activity</SectionHeading>
      <Card>
        {entries.length === 0 ? (
          <EmptyMessage>No activity yet.</EmptyMessage>
        ) : (
          <div className="flex flex-col gap-3">
            {entries.map((entry) => (
              <ListRow
                key={entry.id}
                tinted={false}
                title={`${entry.actorName} ${entry.action}${entry.projectName ? ` in ${entry.projectName}` : ""}`}
                trailing={<span className="text-caption text-ink-muted">{formatRelativeTime(entry.occurredAt)}</span>}
              />
            ))}
          </div>
        )}
      </Card>
    </section>
  );
}
