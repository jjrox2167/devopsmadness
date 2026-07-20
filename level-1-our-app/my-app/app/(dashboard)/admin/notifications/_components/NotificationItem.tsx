"use client";

import Link from "next/link";
import {
  BellIcon,
  CreditCardIcon,
  PackageIcon,
  ShieldIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { AppNotification, NotificationCategory } from "./notifications-types";
import { categoryLabel, formatRelativeTime } from "./notifications-utils";

const CATEGORY_ICON: Record<NotificationCategory, LucideIcon> = {
  security: ShieldIcon,
  billing: CreditCardIcon,
  account: UserIcon,
  system: BellIcon,
  product: PackageIcon,
};

type NotificationItemProps = {
  notification: AppNotification;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onDismiss: (id: string) => void;
  compact?: boolean;
};

export function NotificationItem({
  notification,
  onMarkRead,
  onMarkUnread,
  onDismiss,
  compact = false,
}: NotificationItemProps) {
  const Icon = CATEGORY_ICON[notification.category];
  const content = (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-3 transition-colors",
        !notification.read && "bg-muted/40 border-primary/15",
        compact && "p-2.5",
      )}
    >
      <div
        className={cn(
          "bg-muted flex size-9 shrink-0 items-center justify-center rounded-md border",
          !notification.read && "bg-primary/10 text-primary border-primary/20",
        )}
      >
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              {!notification.read ? (
                <span
                  className="bg-primary size-1.5 shrink-0 rounded-full"
                  aria-label="Unread"
                />
              ) : null}
              <p className="text-sm font-medium leading-snug">
                {notification.title}
              </p>
            </div>
            <p
              className={cn(
                "text-muted-foreground text-sm leading-relaxed",
                compact && "line-clamp-2",
              )}
            >
              {notification.body}
            </p>
          </div>
          <span className="text-muted-foreground shrink-0 text-xs whitespace-nowrap">
            {formatRelativeTime(notification.createdAt)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge variant="outline" className="font-normal">
            {categoryLabel(notification.category)}
          </Badge>

          {!compact ? (
            <div className="ml-auto flex flex-wrap gap-1">
              {notification.read ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onMarkUnread(notification.id);
                  }}
                >
                  Mark unread
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onMarkRead(notification.id);
                  }}
                >
                  Mark read
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDismiss(notification.id);
                }}
              >
                Dismiss
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (notification.href) {
    return (
      <Link
        href={notification.href}
        className="block outline-none focus-visible:ring-ring rounded-lg focus-visible:ring-2"
        onClick={() => {
          if (!notification.read) onMarkRead(notification.id);
        }}
      >
        {content}
      </Link>
    );
  }

  return content;
}
