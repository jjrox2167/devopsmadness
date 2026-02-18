import type { ReactNode } from "react";

export function SettingsContentCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="p-4">{children}</div>
    </div>
  );
}
