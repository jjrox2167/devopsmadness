"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard, Shield, Link2, type LucideIcon } from "lucide-react";

export { SettingsSidebarSkeleton } from "./SettingsSidebarSkeleton";

type TabConfig = {
  value: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

const tabConfig: TabConfig[] = [
  {
    value: "account-overview",
    label: "My Account",
    icon: User,
    href: "/admin/settings/account-overview",
  },
  {
    value: "billing",
    label: "Billing & Subscription",
    icon: CreditCard,
    href: "/admin/settings/billing",
  },
  {
    value: "security",
    label: "Security & Activity",
    icon: Shield,
    href: "/admin/settings/security",
  },
  {
    value: "connected-accounts",
    label: "Connected Accounts",
    icon: Link2,
    href: "/admin/settings/connected-accounts",
  },
];

function getActiveTab(pathname: string | null): string {
  if (!pathname) return "account-overview";

  const match = tabConfig.find(
    (tab) =>
      pathname === tab.href || pathname.startsWith(`${tab.href}/`),
  );

  return match?.value ?? "account-overview";
}

export default function SettingsSidebar() {
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  return (
    <Tabs value={activeTab} orientation="vertical">
      <TabsList className="flex h-auto w-72 flex-col items-stretch gap-1 bg-transparent p-1">
        {tabConfig.map((tab) => {
          const Icon = tab.icon;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              asChild
              className="justify-start gap-3 rounded-lg px-4 py-3 transition-colors duration-200 ease-out hover:bg-sidebar-accent"
            >
              <Link href={tab.href}>
                <Icon className="h-4 w-4 shrink-0" />
                <span>{tab.label}</span>
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}