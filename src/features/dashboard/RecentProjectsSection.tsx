import { Card } from "../../components/ui/Card";
import { EmptyMessage } from "../../components/ui/EmptyMessage";
import { ProgressBar, type ProgressTone } from "../../components/ui/ProgressBar";
import { SectionHeading } from "../../components/ui/SectionHeading";
import type { RecentProject } from "../../types/dashboard";

// Projects take these bar colors in turn. Whether a project stores its own color is decided in Phase 2.
const BAR_TONES: ProgressTone[] = ["accent", "info", "success"];

export function RecentProjectsSection({ projects }: { projects: RecentProject[] }) {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeading>Recent Projects</SectionHeading>
      {projects.length === 0 ? (
        <EmptyMessage>No projects yet.</EmptyMessage>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <Card key={project.id}>
              <div className="flex min-h-32 flex-col justify-between gap-4">
                <div>
                  <p className="truncate text-body-lg font-semibold">{project.name}</p>
                  <p className="truncate text-caption text-ink-muted">{project.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-caption font-medium text-ink-muted">{project.progressPercent}% complete</p>
                  <ProgressBar
                    value={project.progressPercent}
                    label={`${project.name} progress`}
                    tone={BAR_TONES[index % BAR_TONES.length]}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
