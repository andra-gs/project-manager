import { useId, type TextareaHTMLAttributes } from "react";

// className is not accepted on purpose: the look lives here and in the tokens.
interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "id"> {
  label: string;
  error?: string;
}

export function TextArea({ label, error, ...rest }: TextAreaProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-medium">
        {label}
      </label>
      <textarea
        id={id}
        rows={3}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="resize-none rounded-control border border-border bg-surface px-3 py-2 text-body outline-offset-2 placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-accent aria-invalid:border-danger"
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
