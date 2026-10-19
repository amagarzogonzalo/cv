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

function monthsBetween(start: string, end: string): number | undefined {
  const s = /^(\d{4})-(\d{2})$/.exec(start);
  if (!s) return undefined;
  const now = new Date();
  const e = /^(\d{4})-(\d{2})$/.exec(end);
  const endYear = e ? Number(e[1]) : now.getFullYear();
  const endMonth = e ? Number(e[2]) : now.getMonth() + 1;
  // Inclusive month count: Jan–Dec is 12 months, not 11.
  return (endYear - Number(s[1])) * 12 + (endMonth - Number(s[2])) + 1;
}

/** Human-readable duration, e.g. "2 yrs 1 mo" or "8 mos". */
export function duration(start: string, end: string): string | undefined {
  const months = monthsBetween(start, end);
  if (months === undefined || months < 0) return undefined;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest > 0 || years === 0) parts.push(`${rest} mo${rest === 1 ? '' : 's'}`);
  return parts.join(' ');
}
