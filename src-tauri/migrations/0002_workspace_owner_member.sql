-- Migration 2: every new workspace automatically gets its owner as a member with the role "owner".
-- A trigger runs inside the same statement that creates the workspace, so the two rows are saved
-- together or not at all, without a manual transaction.
CREATE TRIGGER trg_workspaces_add_owner_member
AFTER INSERT ON workspaces
BEGIN
    INSERT INTO workspace_members (workspace_id, profile_id, role)
    VALUES (NEW.id, NEW.owner_profile_id, 'owner');
END;
