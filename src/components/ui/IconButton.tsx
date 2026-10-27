import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "../icons/Icon";

// A button that shows only an icon. The label is required so screen readers and tooltips have a name.
interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  icon: IconName;
  label: string;
}

export function IconButton({ icon, label, type = "button", ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-control text-ink-muted outline-offset-2 hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
      {...rest}
    >
      <Icon name={icon} className="size-5" />
    </button>
  );
}
