export function splitFullName(name: string | null | undefined): {
  firstName: string;
  lastName: string;
} {
  const trimmed = name?.trim() ?? "";
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export function displayValue(value: string | null | undefined): string {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : "Not set";
}

export function toDateInputValue(
  value: string | Date | null | undefined,
): string {
  if (value == null || value === "") return "";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getInitials(name: string | null | undefined): string {
  const trimmed = name?.trim() ?? "";
  if (!trimmed) return "?";

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export function formatDisplayDate(
  value: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions,
): string {
  if (value == null || value === "") return "Not set";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(date);
}

export function formatDisplayDateTime(
  value: string | Date | null | undefined,
): string {
  if (value == null || value === "") return "Not set";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatLanguage(code: string | null | undefined): string {
  if (!code) return "Not set";

  try {
    const display = new Intl.DisplayNames(["en"], { type: "language" });
    return display.of(code) ?? code;
  } catch {
    return code;
  }
}

export function formatCountry(code: string | null | undefined): string {
  if (!code) return "Not set";

  // Prefer ISO region codes (US, GB); fall back to the raw value.
  if (/^[A-Za-z]{2}$/.test(code)) {
    try {
      const display = new Intl.DisplayNames(["en"], { type: "region" });
      return display.of(code.toUpperCase()) ?? code;
    } catch {
      return code;
    }
  }

  return code;
}

export function formatGender(value: string | null | undefined): string {
  if (!value) return "Not set";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
