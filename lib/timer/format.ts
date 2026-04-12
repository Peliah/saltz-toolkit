/** Pad number to two digits (e.g. 7 → "07"). */
export function pad2(n: number): string {
  return Math.max(0, Math.floor(n)).toString().padStart(2, '0');
}

export function splitMinutesSeconds(totalSeconds: number): { mm: number; ss: number } {
  const s = Math.max(0, Math.floor(totalSeconds));
  return { mm: Math.floor(s / 60), ss: s % 60 };
}

/** Stopwatch main display: MM:SS.CS (centiseconds). */
export function formatStopwatchMain(elapsedMs: number): { mm: number; ss: number; cs: number } {
  const t = Math.max(0, elapsedMs);
  const totalSec = t / 1000;
  const mm = Math.floor(totalSec / 60);
  const ss = Math.floor(totalSec % 60);
  const cs = Math.floor((t % 1000) / 10);
  return { mm, ss, cs };
}

/** Lap row: MM:SS.CS from elapsed ms at lap time. */
export function formatLapDisplay(elapsedMs: number): string {
  const t = Math.max(0, elapsedMs);
  const s = t / 1000;
  const mm = Math.floor(s / 60);
  const secWhole = Math.floor(s % 60);
  const cs = Math.floor((t % 1000) / 10);
  return `${pad2(mm)}:${pad2(secWhole)}.${pad2(cs)}`;
}
