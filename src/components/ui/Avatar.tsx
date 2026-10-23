interface AvatarProps {
  initials: string;
}

// Shared base component: a round badge with initials. Its look comes from tokens only.
export function Avatar({ initials }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-pill bg-accent text-caption font-bold text-on-accent"
    >
      {initials}
    </span>
  );
}
