import { Card } from "../components/ui/Card";
import { ListRow } from "../components/ui/ListRow";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useDatabaseStatus, type DatabaseStatusState } from "../hooks/useDatabaseStatus";
import { useLocalProfile } from "../hooks/useLocalProfile";
import { pluralize } from "../lib/text";

function describeDatabase(state: DatabaseStatusState): string {
  if (state.kind === "loading") return "Checking the database…";
  if (state.kind === "error") return `Not available: ${state.message}`;
  const { schemaVersion, tableCount, foreignKeysEnabled } = state.status;
  return `Connected · schema version ${schemaVersion ?? "none"} · ${pluralize(tableCount, "table")} · foreign keys ${foreignKeysEnabled ? "on" : "off"}`;
}

// Read-only for now: nothing here can be changed until the database exists (Phase 2).
export function SettingsPage() {
  const profile = useLocalProfile();
  const database = useDatabaseStatus();

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <SectionHeading>Local profile</SectionHeading>
        <Card>
          <div className="flex flex-col gap-3">
            <ListRow title="Display name" subtitle="Editing the profile arrives in Phase 2." trailing={<span className="text-body font-semibold">{profile.displayName}</span>} />
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Appearance</SectionHeading>
        <Card>
          <div className="flex flex-col gap-3">
            <ListRow title="Theme" subtitle="Light theme only for now." trailing={<span className="text-body font-semibold">Light</span>} />
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Data</SectionHeading>
        <Card>
          <div className="flex flex-col gap-3">
            <ListRow
              title="Storage"
              subtitle="Your data will be kept in a database file on this computer. The screens still show sample data until saving is built (Phase 2)."
            />
            <ListRow title="Database" subtitle={describeDatabase(database)} />
            <ListRow title="Backup and restore" subtitle="Planned for Phase 4." />
          </div>
        </Card>
      </section>
    </div>
  );
}
