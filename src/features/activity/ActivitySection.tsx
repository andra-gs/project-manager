import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { EmptyMessage } from "../../components/ui/EmptyMessage";
import { ListRow } from "../../components/ui/ListRow";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { formatRelativeTime } from "../../lib/relativeTime";
import { getInitials } from "../../lib/text";
import type { ActivityEntry } from "../../types/activity";

const AVATAR_TONES = ["accent", "info", "success"] as const;

export function ActivitySection({ entries }: { entries: ActivityEntry[] }) {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeading>Activity</SectionHeading>
      <Card>
        {entries.length === 0 ? (
          <EmptyMessage>No activity yet.</EmptyMessage>
        ) : (
          <div className="flex flex-col gap-4">
            {entries.map((entry, index) => (
              <ListRow
                key={entry.id}
                tinted={false}
                leading={<Avatar size="sm" tone={AVATAR_TONES[index % AVATAR_TONES.length]} initials={getInitials(entry.actorName)} />}
                title={entry.actorName}
                subtitle={
                  <>
                    <span className="block">{entry.action}</span>
                    <span className="block">{formatRelativeTime(entry.occurredAt)}</span>
                  </>
                }
              />
            ))}
          </div>
        )}
      </Card>
    </section>
  );
}
