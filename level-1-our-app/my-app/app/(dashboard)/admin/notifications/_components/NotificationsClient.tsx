"use client";

import { useMemo, useState } from "react";
import { CheckCheckIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  clearReadNotificationsAction,
  dismissNotificationAction,
  markAllNotificationsReadAction,
  markNotificationReadAction,
  markNotificationUnreadAction,
} from "./notification-actions";
import type {
  AppNotification,
  NotificationCategory,
} from "./notifications-types";
import { unreadCount } from "./notifications-utils";
import { NotificationItem } from "./NotificationItem";
import { NotificationsEmpty } from "./NotificationsEmpty";

type FilterTab = "all" | "unread" | NotificationCategory;

export function NotificationsClient({
  initialNotifications,
}: {
  /** Required — loaded from Prisma on the server page. */
  initialNotifications: AppNotification[];
}) {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [pending, setPending] = useState(false);

  const unread = unreadCount(items);

  const visible = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "unread") return items.filter((n) => !n.read);
    return items.filter((n) => n.category === filter);
  }, [items, filter]);

  async function markRead(id: string) {
    const previous = items;
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    try {
      await markNotificationReadAction(id);
    } catch {
      setItems(previous);
      toast.error("Could not mark as read");
    }
  }

  async function markUnread(id: string) {
    const previous = items;
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n)),
    );
    try {
      await markNotificationUnreadAction(id);
    } catch {
      setItems(previous);
      toast.error("Could not mark as unread");
    }
  }

  async function dismiss(id: string) {
    const previous = items;
    setItems((prev) => prev.filter((n) => n.id !== id));
    try {
      await dismissNotificationAction(id);
      toast.success("Notification dismissed");
    } catch {
      setItems(previous);
      toast.error("Could not dismiss notification");
    }
  }

  async function markAllRead() {
    const previous = items;
    setPending(true);
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await markAllNotificationsReadAction();
      toast.success("All notifications marked as read");
    } catch {
      setItems(previous);
      toast.error("Could not mark all as read");
    } finally {
      setPending(false);
    }
  }

  async function clearRead() {
    const previous = items;
    setPending(true);
    setItems((prev) => prev.filter((n) => !n.read));
    try {
      await clearReadNotificationsAction();
      toast.success("Read notifications cleared");
    } catch {
      setItems(previous);
      toast.error("Could not clear read notifications");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-bold">Notifications</h3>
          {unread > 0 ? (
            <Badge variant="default" className="font-normal">
              {unread} unread
            </Badge>
          ) : (
            <Badge variant="secondary" className="font-normal">
              All caught up
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          Security alerts, billing updates, and account activity in one place.
        </p>
        <Separator className="my-4" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter((v as FilterTab) ?? "all")}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={unread === 0 || pending}
            onClick={() => void markAllRead()}
          >
            <CheckCheckIcon />
            Mark all read
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!items.some((n) => n.read) || pending}
            onClick={() => void clearRead()}
          >
            <Trash2Icon />
            Clear read
          </Button>
        </div>
      </div>

      {visible.length === 0 ? (
        <NotificationsEmpty
          title={
            filter === "unread"
              ? "No unread notifications"
              : filter === "all"
                ? "No notifications"
                : `No ${filter} notifications`
          }
          description={
            filter === "unread"
              ? "You’re up to date. New alerts will appear here."
              : filter === "all"
                ? "When something happens (like a password change), it will show up here."
                : "Nothing in this filter right now."
          }
        />
      ) : (
        <div className="space-y-3">
          {visible.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={(id) => void markRead(id)}
              onMarkUnread={(id) => void markUnread(id)}
              onDismiss={(id) => void dismiss(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
