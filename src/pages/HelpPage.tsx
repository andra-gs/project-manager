import { Card } from "../components/ui/Card";
import { ListRow } from "../components/ui/ListRow";
import { SectionHeading } from "../components/ui/SectionHeading";
import { APP_NAME, APP_NAME_NOTE } from "../lib/appInfo";

export function HelpPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <SectionHeading>About</SectionHeading>
        <Card>
          <div className="flex flex-col gap-3">
            <ListRow title={APP_NAME} subtitle={APP_NAME_NOTE} />
            <ListRow
              title="What this app is"
              subtitle="A local-first project manager for Windows. It is built to work without internet or an account."
            />
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Current state</SectionHeading>
        <Card>
          <div className="flex flex-col gap-3">
            <ListRow title="Sample data" subtitle="The workspaces, projects, and tasks you see are sample data used while the interface is built." />
            <ListRow title="Not available yet" subtitle="Creating and editing items, Kanban board, calendar, documents, backup, and online features." />
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Feedback</SectionHeading>
        <Card>
          <ListRow title="No feedback channel yet" subtitle="For now, send feedback directly to the developer." />
        </Card>
      </section>
    </div>
  );
}
