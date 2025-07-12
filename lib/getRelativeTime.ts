/**
 * Returns a human-friendly relative time label for a given ISO timestamp.
 *
 * Examples:
 *   getRelativeTime("2025-07-11T07:12:35.382Z")  → "5 hours ago"
 *   getRelativeTime("2025-07-10T20:00:00.000Z")  → "yesterday"
 */
export function getRelativeTimes(isoDate?: string) {
  if (!isoDate) return null;
  const then = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - then.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  return {
    seconds: diffSec,
    min: diffMin,
    hour: diffHrs,
    days: diffDays,
    weeks: diffWeeks,
    months: diffMonths,
    years: diffYears,
    yesterday: diffDays === 1,
  };
}

export function getRelativeTime(isoDate?: string) {
  if (!isoDate) return null;
  const relatives = getRelativeTimes(isoDate);
  if (!relatives) return null;

  const { days, hour, min, months, seconds, weeks, years, yesterday } =
    relatives;
  if (seconds < 5) {
    return "just now";
  }
  if (seconds < 60) {
    return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
  }
  if (min < 60) {
    return `${min} min${min !== 1 ? "s" : ""} ago`;
  }
  if (hour < 24) {
    return `${hour} hour${hour !== 1 ? "s" : ""} ago`;
  }
  if (yesterday) {
    return "yesterday";
  }
  if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
  if (weeks < 5) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }
  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
