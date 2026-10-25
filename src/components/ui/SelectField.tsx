import { useId, type SelectHTMLAttributes } from "react";

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "id" | "children"> {
  label: string;
  options: { value: string; label: string }[];
}

export function SelectField({ label, options, ...rest }: SelectFieldProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-medium">
        {label}
      </label>
      <select
        id={id}
        className="h-9 rounded-control border border-border bg-surface px-3 text-body outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
