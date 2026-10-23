import { useParams } from "react-router";
import { PlaceholderNotice } from "../components/ui/PlaceholderNotice";
import { useWorkspaces } from "../hooks/useWorkspaces";

export function WorkspacePage() {
  const { workspaceId } = useParams();
  const workspace = useWorkspaces().find((candidate) => candidate.id === workspaceId);

  if (!workspace) {
    return <PlaceholderNotice message="This workspace does not exist." />;
  }
  return <PlaceholderNotice message={`Workspace "${workspace.name}": its projects are shown here in Phase 1, step 6.`} />;
}
