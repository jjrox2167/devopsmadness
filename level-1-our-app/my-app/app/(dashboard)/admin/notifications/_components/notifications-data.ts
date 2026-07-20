import type { AppNotification } from "./notifications-types";

/**
 * @deprecated Demo only. The page loads from Prisma via
 * `listNotificationsForUser` — do not use this as the page default.
 */
export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "New sign-in from macOS",
    body: "A new session was created on Chrome · Chicago, IL. If this wasn’t you, secure your account.",
    category: "security",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    read: false,
    href: "/admin/settings/security",
  },
  {
    id: "n2",
    title: "Multifactor authentication recommended",
    body: "Protect your account by enabling an authenticator app under Security settings.",
    category: "security",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    read: false,
    href: "/admin/settings/security",
  },
  {
    id: "n3",
    title: "Invoice available",
    body: "Your latest invoice for the Pro plan is ready to review.",
    category: "billing",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    read: false,
    href: "/admin/settings/billing",
  },
  {
    id: "n4",
    title: "Profile photo updated",
    body: "Your account profile image was changed successfully.",
    category: "account",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true,
    href: "/admin/settings/account-overview",
  },
  {
    id: "n5",
    title: "Connected account linked",
    body: "Google was linked to your login. You can manage this under Connected Accounts.",
    category: "account",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    read: true,
    href: "/admin/settings/connected-accounts",
  },
  {
    id: "n6",
    title: "System maintenance window",
    body: "Scheduled maintenance is planned for Sunday 2:00–4:00 AM UTC. Expect brief interruptions.",
    category: "system",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    read: true,
  },
  {
    id: "n7",
    title: "New product feature",
    body: "You can now manage multifactor methods and session activity from Security settings.",
    category: "product",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    read: true,
    href: "/admin/settings/security",
  },
];
