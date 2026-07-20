import type { AppNotification, NotificationCategory } from "./notifications-types";

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function categoryLabel(category: NotificationCategory): string {
  switch (category) {
    case "security":
      return "Security";
    case "billing":
      return "Billing";
    case "account":
      return "Account";
    case "system":
      return "System";
    case "product":
      return "Product";
    default:
      return category;
  }
}

export function unreadCount(items: AppNotification[]): number {
  return items.filter((n) => !n.read).length;
}
