export type NavItem = {
  label: string;
  href: string;
  match: "exact" | "startsWith";
  description?: string;
};

export const SETTINGS_NAV: NavItem[] = [
  {
    label: "Security",
    href: "/my-account/settings/security",
    match: "exact",
    description: "Protect your account and manage sign-in settings.",
  },
  {
    label: "Notifications",
    href: "/my-account/settings/notifications",
    match: "exact",
    description: "Control how and when we contact you about activity and updates.",
  },
  {
    label: "Preferences",
    href: "/my-account/settings/preferences",
    match: "exact",
    description: "Customize how the app looks and behaves for your account.",
  },
  {
    label: "Connected Accounts",
    href: "/my-account/settings/connected-accounts",
    match: "startsWith",
    description: "SSO and integrations",
  },
];

export function isActive(pathname: string, item: NavItem): boolean {
  if (item.match === "exact") return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export function getActiveItem(pathname: string): NavItem {
  return SETTINGS_NAV.find((it) => isActive(pathname, it)) ?? SETTINGS_NAV[0];
}
