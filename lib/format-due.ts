/**
 * Human-readable due labels for the scheduler UI (local timezone).
 */

function startOfLocalDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function sameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function timePart(d: Date): string {
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

const weekdayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * e.g. "Today · 3:00 PM", "Tomorrow · 9:00 AM", "Apr 12 · 2:30 PM"
 */
export function formatDueLabel(dueIso: string, now: Date = new Date()): string {
  const due = new Date(dueIso);
  if (Number.isNaN(due.getTime())) return 'Invalid date';
  const t = timePart(due);
  if (sameLocalDay(due, now)) {
    return `Today · ${t}`;
  }
  const tomorrow = addDays(startOfLocalDay(now), 1);
  if (sameLocalDay(due, tomorrow)) {
    return `Tomorrow · ${t}`;
  }
  const d0 = startOfLocalDay(now);
  const diffDays = Math.floor((startOfLocalDay(due).getTime() - d0.getTime()) / 86400000);
  if (diffDays >= 0 && diffDays < 7) {
    return `${weekdayShort[due.getDay()]} · ${t}`;
  }
  return `${monthShort[due.getMonth()]} ${due.getDate()} · ${t}`;
}

export function formatDueShort(dueIso: string, now: Date = new Date()): string {
  return formatDueLabel(dueIso, now);
}
