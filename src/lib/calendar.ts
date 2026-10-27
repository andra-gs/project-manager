// Date helpers for the calendar. A day is always written "YYYY-MM-DD" using the user's own (local)
// calendar, the same format as a stored deadline. Months are counted from 0 (January) like JavaScript dates.

export interface CalendarDay {
  // "YYYY-MM-DD"
  date: string;
  dayOfMonth: number;
  // False for the days of the previous or next month that fill the first and last week.
  inMonth: boolean;
}

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function toDateText(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

// The weeks (Monday first) that show one month. Only the weeks that contain days of the month are returned.
export function buildMonthGrid(year: number, month: number): CalendarDay[][] {
  const first = new Date(year, month, 1);
  // getDay(): Sunday is 0. Shift so that Monday is 0 and Sunday is 6.
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekCount = Math.ceil((offset + daysInMonth) / 7);

  const weeks: CalendarDay[][] = [];
  for (let week = 0; week < weekCount; week++) {
    const days: CalendarDay[] = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      // Date() accepts day numbers below 1 or above the month length and moves into the neighbouring month.
      const date = new Date(year, month, 1 - offset + week * 7 + dayIndex);
      days.push({
        date: toDateText(date),
        dayOfMonth: date.getDate(),
        inMonth: date.getMonth() === month && date.getFullYear() === year,
      });
    }
    weeks.push(days);
  }
  return weeks;
}

// Moves a month forward or back (negative delta), crossing year ends correctly.
export function addMonths(year: number, month: number, delta: number): { year: number; month: number } {
  const moved = new Date(year, month + delta, 1);
  return { year: moved.getFullYear(), month: moved.getMonth() };
}

export function formatMonthTitle(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
