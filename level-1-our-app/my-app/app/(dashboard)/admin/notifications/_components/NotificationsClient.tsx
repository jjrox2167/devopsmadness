"use client";

import { useMemo, useState } from "react";
import { CheckCheckIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { INITIAL_NOTIFICATIONS } from "./notifications-data";
import type { AppNotification, NotificationCategory } from "./notifications-types";
import { unreadCount } from "./notifications-utils";
import { NotificationItem } from "./NotificationItem";
import { NotificationsEmpty } from "./NotificationsEmpty";

type FilterTab = "all" | "unread" | NotificationCategory;

export function NotificationsClient({
  initialNotifications = INITIAL_NOTIFICATIONS,
}: {
  initialNotifications?: AppNotification[];
}) {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState<FilterTab>("all");

  const unread = unreadCount(items);

  const visible = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "unread") return items.filter((n) => !n.read);
    return items.filter((n) => n.category === filter);
  }, [items, filter]);

  function markRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function markUnread(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n)),
    );
  }

  function dismiss(id: string) {
    setItems((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification dismissed");
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  }

  function clearRead() {
    setItems((prev) => prev.filter((n) => !n.read));
    toast.success("Read notifications cleared");
  }

  return (
    <div className="space-y-6">
     

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
            disabled={unread === 0}
            onClick={markAllRead}
          >
            <CheckCheckIcon />
            Mark all read
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!items.some((n) => n.read)}
            onClick={clearRead}
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
              : "Nothing in this filter right now."
          }
        />
      ) : (
        <div className="space-y-3">
          {visible.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={markRead}
              onMarkUnread={markUnread}
              onDismiss={dismiss}
            />
          ))}
        </div>
      )}
    </div>
  );
}
