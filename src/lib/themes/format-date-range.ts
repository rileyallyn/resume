const MONTHS: Record<string, string> = {
  january: "01",
  jan: "01",
  february: "02",
  feb: "02",
  march: "03",
  mar: "03",
  april: "04",
  apr: "04",
  may: "05",
  june: "06",
  jun: "06",
  july: "07",
  jul: "07",
  august: "08",
  aug: "08",
  september: "09",
  sept: "09",
  sep: "09",
  october: "10",
  oct: "10",
  november: "11",
  nov: "11",
  december: "12",
  dec: "12"
};

function formatDatePart(part: string): string {
  const trimmed = part.trim();
  if (!trimmed) return "";
  if (/^present$/i.test(trimmed)) return "Present";
  if (/^\d{2}\/\d{4}$/.test(trimmed)) return trimmed;

  const monthYear = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYear) {
    const month = MONTHS[monthYear[1].toLowerCase()];
    if (month) return `${month}/${monthYear[2]}`;
  }

  const yearOnly = trimmed.match(/^(\d{4})$/);
  if (yearOnly) return yearOnly[1];

  return trimmed;
}

/** Converts text dates like "June 2025 - Sept 2025" to "06/2025 - 09/2025". */
export function formatDateRange(dateRange: string | null | undefined): string {
  if (!dateRange) return "";
  const parts = dateRange.split(/\s*[-–—]\s*|\s+to\s+/i);
  if (parts.length === 1) return formatDatePart(parts[0]);
  return parts.map(formatDatePart).join(" - ");
}
