import { useId, type InputHTMLAttributes } from "react";

// className is not accepted on purpose: the look lives here and in the tokens.
interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id" | "type"> {
  label: string;
  error?: string;
}

export function TextField({ label, error, ...rest }: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-medium">
        {label}
      </label>
      <input
        id={id}
        type="text"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="h-9 rounded-control border border-border bg-surface px-3 text-body outline-offset-2 placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-accent aria-invalid:border-danger"
        {...rest}
      />
      {error && (
        <p id={errorId} className="text-caption text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
