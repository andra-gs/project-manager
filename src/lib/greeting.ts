// "Good morning", "Good afternoon", or "Good evening" for an hour of the day (0 to 23).
export function getGreeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
