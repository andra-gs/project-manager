import { cx } from "../../lib/classNames";

type AvatarTone = "accent" | "info" | "success";
type AvatarSize = "md" | "sm";

interface AvatarProps {
  initials: string;
  tone?: AvatarTone;
  size?: AvatarSize;
}

const TONES: Record<AvatarTone, string> = {
  accent: "bg-accent",
  info: "bg-info",
  success: "bg-success",
};

const SIZES: Record<AvatarSize, string> = {
  md: "size-9",
  sm: "size-8",
};

// Shared base component: a round badge with initials. Its look comes from tokens only.
export function Avatar({ initials, tone = "accent", size = "md" }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-pill text-caption font-bold text-on-accent",
        TONES[tone],
        SIZES[size],
      )}
    >
      {initials}
    </span>
  );
}
