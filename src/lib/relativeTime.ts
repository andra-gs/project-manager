// "8 min ago", "3 hr ago", "Yesterday", "5 days ago" for a moment in the past.
// The moment is an ISO date-time text such as "2026-10-24T07:12:00.000Z".
export function formatRelativeTime(isoTime: string, now: Date = new Date()): string {
  const minutes = Math.floor((now.getTime() - new Date(isoTime).getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Yesterday" : `${days} days ago`;
}
