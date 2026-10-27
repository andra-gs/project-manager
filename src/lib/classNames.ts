// Joins class names, skipping empty values. Used by the shared base components.
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
