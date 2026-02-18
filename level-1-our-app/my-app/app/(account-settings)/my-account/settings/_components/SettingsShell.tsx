"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { SETTINGS_NAV } from "./SettingsSidebarNav";
import { ContentCard } from "./ContentCard";
import type { ReactNode } from "react";

export function SettingsShell({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment(); 
  const activeItem =
    SETTINGS_NAV.find((n) => n.key === segment) ?? SETTINGS_NAV[0];

  return (
    <ContentCard title={activeItem.label} description={activeItem.description}>
      {children}
    </ContentCard>
  );
}
