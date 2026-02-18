"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "../layout";

function isActive(pathname: string, item: NavItem) {
  if (item.match === "exact") return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/") || pathname.startsWith(item.href);
}

export function AccountSidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="My account sections" className="p-2">
      {items.map((item) => {
        const active = isActive(pathname, item);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex gap-3 rounded-lg border border-transparent px-2.5 py-2.5 text-sm transition-colors",
              "hover:bg-muted",
              active && "border-blue-600/25 bg-blue-600/10"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "mt-1 h-6 w-[3px] flex-none rounded-full bg-transparent",
                active && "bg-blue-600"
              )}
            />

            <span className="min-w-0">
              <span className={cn("block leading-5", active ? "font-extrabold" : "font-bold")}>
                {item.label}
              </span>
              {item.description ? (
                <span className="mt-1 block text-xs leading-4 text-muted-foreground">
                  {item.description}
                </span>
              ) : null}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
