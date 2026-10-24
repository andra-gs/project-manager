import { Card } from "../components/ui/Card";
import { ListRow } from "../components/ui/ListRow";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useLocalProfile } from "../hooks/useLocalProfile";

// Read-only for now: nothing here can be changed until the database exists (Phase 2).
export function SettingsPage() {
  const profile = useLocalProfile();

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
              subtitle="The app is built to keep your data on this computer. Saving data arrives in Phase 2, so nothing is stored yet; the screens show sample data."
            />
            <ListRow title="Backup and restore" subtitle="Planned for Phase 4." />
          </div>
        </Card>
      </section>
    </div>
  );
}
