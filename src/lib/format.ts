const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Turn "2022-03" into "Mar 2022". Non-ISO values (e.g. "Present") pass through. */
export function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const [, year, month] = match;
  const monthIndex = Number(month) - 1;
  return `${MONTHS[monthIndex] ?? ''} ${year}`.trim();
}

/** Human-readable range, e.g. "Jun 2019 — Feb 2022". */
export function formatRange(start: string, end: string): string {
  return `${formatDate(start)} — ${formatDate(end)}`;
}

/** Stable value for the <time> element's datetime attribute. */
export function isoDate(value: string): string | undefined {
  return /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : undefined;
}
