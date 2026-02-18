import type { ReactNode } from "react";
import { AccountSidebarNav } from "./_components/AccountSidebarNav";

type Props = { children: ReactNode };

export type NavItem = {
  label: string;
  href: string;
  match: "exact" | "startsWith";
  description?: string;
};

const NAV: NavItem[] = [
  { label: "Overview", href: "/my-account", match: "exact", description: "Summary and quick actions" },
  { label: "Settings", href: "/my-account/settings", match: "startsWith", description: "Security, notifications, integrations" },
  { label: "Billing", href: "/my-account/billing", match: "startsWith", description: "Plans, invoices, payment methods" },
  { label: "Audit & Activity", href: "/my-account/activity", match: "startsWith", description: "Session history and audit trail" },
];

export default function MyAccountLayout({ children }: Props) {
  return (
    <div className="min-h-screen border-t bg-[#f5f7fa]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-9 pt-6">
        {/* Header */}
        <header className="mb-4 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 text-xs font-semibold text-foreground/70">
              <span className="text-foreground/60">Home</span>
              <span className="mx-2 text-foreground/40">/</span>
              <span>My Account</span>
            </div>

            <h1 className="text-[22px] font-extrabold tracking-[-0.2px]">My Account</h1>

            <p className="mt-2 max-w-[720px] text-[13.5px] text-foreground/80">
              Manage account preferences, security controls, and connected services.
            </p>
          </div>

          <div
            className="inline-flex w-fit items-center gap-2 rounded-md border bg-background px-2.5 py-2 text-xs font-bold shadow-sm"
            aria-label="Account status"
            title="Account status"
          >
            <span aria-hidden className="inline-block size-2 rounded-full bg-green-600" />
            Status: Active
          </div>
        </header>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          {/* Sidebar */}
          <aside className="w-full lg:w-[280px] lg:flex-none">
            <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
              <div className="border-b px-3 py-3">
                <div className="text-xs font-extrabold tracking-wide text-foreground/80">
                  NAVIGATION
                </div>
              </div>

              <AccountSidebarNav items={NAV} />
            </div>

            <div className="mt-3 rounded-xl border bg-card px-3 py-3 text-xs text-foreground/80 shadow-sm">
              Enterprise note: changes may be logged for audit and compliance purposes.
            </div>
          </aside>


          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
