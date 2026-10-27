// An error caused by input the user can fix (for example an empty name).
// Its message is written for the user and is safe to show as it is.
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// Text to show the user for any error. Validation messages are shown as written;
// anything else is a technical failure, so it gets a general sentence and the technical detail.
export function describeError(error: unknown): string {
  if (error instanceof ValidationError) return error.message;
  const detail = error instanceof Error ? error.message : String(error);
  return `Something went wrong while saving. (${detail})`;
}
