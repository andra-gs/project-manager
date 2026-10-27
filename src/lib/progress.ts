// Progress is always calculated from real counts, never typed in by hand.
export function calculateProgress(completed: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((completed / total) * 100);
}
