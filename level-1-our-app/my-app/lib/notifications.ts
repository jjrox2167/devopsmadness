import "server-only";

import prisma from "@/lib/prisma";
import type {
  AppNotification,
  NotificationCategory,
} from "@/app/(dashboard)/admin/notifications/_components/notifications-types";

const CATEGORIES: NotificationCategory[] = [
  "security",
  "billing",
  "account",
  "system",
  "product",
];

function toCategory(value: string): NotificationCategory {
  return CATEGORIES.includes(value as NotificationCategory)
    ? (value as NotificationCategory)
    : "system";
}

export function mapNotification(row: {
  id: string;
  title: string;
  body: string;
  category: string;
  href: string | null;
  read: boolean;
  createdAt: Date;
}): AppNotification {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    category: toCategory(row.category),
    href: row.href ?? undefined,
    read: row.read,
    createdAt: row.createdAt.toISOString(),
  };
}

/**
 * Server-only helper. Call from Server Components, Route Handlers,
 * Server Actions, or better-auth hooks — never from "use client" files.
 */
export async function createNotification(input: {
  userId: string;
  title: string;
  body: string;
  category: string;
  href?: string;
}) {
  return prisma.notification.create({
    data: {
      userId: input.userId,
      title: input.title,
      body: input.body,
      category: input.category,
      href: input.href,
    },
  });
}

export async function listNotificationsForUser(
  userId: string,
  options?: { take?: number },
): Promise<AppNotification[]> {
  const rows = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: options?.take ?? 50,
  });

  return rows.map(mapNotification);
}

export async function setNotificationRead(input: {
  userId: string;
  id: string;
  read: boolean;
}) {
  // updateMany so we never touch another user's row
  const result = await prisma.notification.updateMany({
    where: { id: input.id, userId: input.userId },
    data: { read: input.read },
  });
  return result.count > 0;
}

export async function deleteNotification(input: {
  userId: string;
  id: string;
}) {
  const result = await prisma.notification.deleteMany({
    where: { id: input.id, userId: input.userId },
  });
  return result.count > 0;
}

export async function markAllNotificationsRead(userId: string) {
  await prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
}

export async function clearReadNotifications(userId: string) {
  await prisma.notification.deleteMany({
    where: { userId, read: true },
  });
}
