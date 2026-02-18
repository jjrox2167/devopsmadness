"use client";

import { usePathname } from "next/navigation";
import { getActiveItem } from "./SettingsNav";

export function SettingsSectionHeader() {
  const pathname = usePathname();
  const activeItem = getActiveItem(pathname);

  return (
    <div className="flex flex-col">
      <div className="text-sm font-extrabold">{activeItem?.label ?? "Configuration"}</div>
      <div className="mt-1 text-xs text-muted-foreground">
        {activeItem?.description ?? "Review and update settings for your account."}
      </div>
    </div>
  );
}
