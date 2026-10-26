import { useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { EmptyMessage } from "../../components/ui/EmptyMessage";
import { TextField } from "../../components/ui/TextField";
import { useLocalProfile } from "../../hooks/useLocalProfile";
import { describeError } from "../../lib/errors";
import { PROFILE_NAME_MAX_LENGTH } from "../../services/profileService";

function ProfileForm({ initialName, onSave }: { initialName: string; onSave: (name: string) => Promise<void> }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string>();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(undefined);
    setSaved(false);
    try {
      await onSave(name);
      setSaved(true);
    } catch (failure) {
      setError(describeError(failure));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-3">
      <div className="flex-1">
        <TextField
          label="Display name"
          value={name}
          maxLength={PROFILE_NAME_MAX_LENGTH}
          error={error}
          onChange={(event) => {
            setName(event.target.value);
            setSaved(false);
          }}
        />
      </div>
      <div className="flex items-center gap-3 pt-6">
        <Button type="submit" disabled={busy}>
          Save
        </Button>
        {saved && <span className="text-caption text-success-strong">Saved.</span>}
      </div>
    </form>
  );
}

export function ProfileEditor() {
  const { profile, loaded, renameProfile } = useLocalProfile();
  return <Card>{loaded ? <ProfileForm initialName={profile.displayName} onSave={renameProfile} /> : <EmptyMessage>Loading profile…</EmptyMessage>}</Card>;
}
