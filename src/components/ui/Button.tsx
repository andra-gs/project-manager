import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/classNames";
import { Icon, type IconName } from "../icons/Icon";

type ButtonVariant = "primary" | "secondary";

// className is not accepted on purpose: the look of a button lives here and in the tokens.
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: ButtonVariant;
  icon?: IconName;
}

const BASE =
  "inline-flex h-9 items-center justify-center gap-2 rounded-control px-4 text-body font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:opacity-90",
  secondary: "border border-border bg-surface text-ink hover:bg-surface-muted",
};

export function Button({ variant = "primary", icon, type = "button", children, ...rest }: ButtonProps) {
  return (
    <button type={type} className={cx(BASE, VARIANTS[variant])} {...rest}>
      {icon && <Icon name={icon} className="size-4 shrink-0" />}
      {children}
    </button>
  );
}
