"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  clearReadNotifications,
  deleteNotification,
  markAllNotificationsRead,
  setNotificationRead,
} from "@/lib/notifications";

async function requireUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}

export async function markNotificationReadAction(id: string) {
  const userId = await requireUserId();
  await setNotificationRead({ userId, id, read: true });
}

export async function markNotificationUnreadAction(id: string) {
  const userId = await requireUserId();
  await setNotificationRead({ userId, id, read: false });
}

export async function dismissNotificationAction(id: string) {
  const userId = await requireUserId();
  await deleteNotification({ userId, id });
}

export async function markAllNotificationsReadAction() {
  const userId = await requireUserId();
  await markAllNotificationsRead(userId);
}

export async function clearReadNotificationsAction() {
  const userId = await requireUserId();
  await clearReadNotifications(userId);
}
