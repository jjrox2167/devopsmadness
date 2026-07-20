"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BellIcon, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { AppNotification } from "@/app/(dashboard)/admin/notifications/_components/notifications-types";
import { NotificationItem } from "@/app/(dashboard)/admin/notifications/_components/NotificationItem";
import { unreadCount } from "@/app/(dashboard)/admin/notifications/_components/notifications-utils";
import { NotificationsEmpty } from "@/app/(dashboard)/admin/notifications/_components/NotificationsEmpty";
import {
  dismissNotificationAction,
  markNotificationReadAction,
  markNotificationUnreadAction,
} from "@/app/(dashboard)/admin/notifications/_components/notification-actions";

const PREVIEW_LIMIT = 4;

export default function NotificationsIcon() {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const unread = unreadCount(items);
  const preview = useMemo(
    () =>
      [...items]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, PREVIEW_LIMIT),
    [items],
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications?limit=20", {
        credentials: "include",
      });
      if (!res.ok) {
        setItems([]);
        return;
      }
      const data = (await res.json()) as { notifications: AppNotification[] };
      setItems(data.notifications ?? []);
      setLoaded(true);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Unread badge on first mount
  useEffect(() => {
    void load();
  }, [load]);

  // Refresh when opening the popover
  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) void load();
  }

  async function markRead(id: string) {
    const previous = items;
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    try {
      await markNotificationReadAction(id);
    } catch {
      setItems(previous);
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
    }
  }

  async function dismiss(id: string) {
    const previous = items;
    setItems((prev) => prev.filter((n) => n.id !== id));
    try {
      await dismissNotificationAction(id);
    } catch {
      setItems(previous);
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label={
            unread > 0
              ? `Notifications, ${unread} unread`
              : "Notifications"
          }
        >
          <BellIcon className="size-[1.2rem]" />
          {unread > 0 ? (
            <span className="bg-destructive text-destructive-foreground absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium">
              {unread > 9 ? "9+" : unread}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Notifications</p>
            <p className="text-muted-foreground text-xs">
              {loading && !loaded
                ? "Loading…"
                : unread > 0
                  ? `${unread} unread`
                  : "You’re all caught up"}
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/notifications" onClick={() => setOpen(false)}>
              View all
            </Link>
          </Button>
        </div>
        <Separator />

        <div className="max-h-96 space-y-2 overflow-y-auto p-3">
          {loading && !loaded ? (
            <div className="text-muted-foreground flex items-center justify-center gap-2 py-8 text-sm">
              <Loader2Icon className="size-4 animate-spin" />
              Loading…
            </div>
          ) : preview.length === 0 ? (
            <NotificationsEmpty description="No recent alerts." />
          ) : (
            preview.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={(id) => void markRead(id)}
                onMarkUnread={(id) => void markUnread(id)}
                onDismiss={(id) => void dismiss(id)}
                compact
              />
            ))
          )}
        </div>

        <Separator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/admin/notifications" onClick={() => setOpen(false)}>
              Open notification center
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
