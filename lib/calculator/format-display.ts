export function trimCalculatorDisplay(s: string): string {
  if (s.includes('e')) return s;
  const n = parseFloat(s);
  if (!Number.isFinite(n)) return s;
  return String(Number(n.toPrecision(12)));
}
