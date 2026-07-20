export type NotificationCategory =
  | "security"
  | "billing"
  | "account"
  | "system"
  | "product";

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  category: NotificationCategory;
  createdAt: string; // ISO
  read: boolean;
  href?: string;
};
