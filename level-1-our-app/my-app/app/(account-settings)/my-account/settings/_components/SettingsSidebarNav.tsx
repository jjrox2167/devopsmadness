import Link from "next/link";

type Props = {
  activeKey?: string;
};

export type NavItem = {
  label: string;
  href: string;      
  key: string;         
  description?: string;
  match?: "exact" | "startsWith";
};

 export const SETTINGS_NAV: NavItem[] = [
  {
    key: "security",
    label: "Security",
    href: "/my-account/settings/security",
    description: "Protect your account and manage sign-in settings.",
    match: "exact",
  },
  {
    key: "notifications",
    label: "Notifications",
    href: "/my-account/settings/notifications",
    description: "Control how and when we contact you about activity and updates.",
    match: "exact",
  },
  {
    key: "preferences",
    label: "Preferences",
    href: "/my-account/settings/preferences",
    description: "Customize how the app looks and behaves for your account.",
    match: "exact",
  },
  {
    key: "connected-accounts",
    label: "Connected Accounts",
    href: "/my-account/settings/connected-accounts",
    description: "SSO and integrations",
    match: "startsWith",
  },
];


export function SettingsSidebarNav({ activeKey }: Props) {
  const safeActiveKey = activeKey ?? "";
  return (
    <aside className="w-full md:w-[300px] md:flex-shrink-0">
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b px-4 py-3">
          <div className="text-[13px] font-semibold">Account Settings</div>
          <div className="mt-1 text-[12px] text-muted-foreground">
            Account-wide settings.
          </div>

          {/* Mobile-only context label */}
          <div className="mt-3 text-[12px] text-muted-foreground md:hidden">
            Viewing:{" "}
            <span className="font-semibold text-foreground">
              {SETTINGS_NAV.find((n) => n.key === activeKey)?.label ?? "Settings"}
            </span>
          </div>
        </div>

        {/* Mobile becomes horizontal pill tabs via CSS */}
        <nav
          aria-label="Account settings navigation"
          className="flex gap-1 overflow-x-auto p-2 md:flex-col md:overflow-visible"
        >
          
            {SETTINGS_NAV.map((item) => {
        const active =
          item.key === safeActiveKey ||
          (item.match === "startsWith" && safeActiveKey.startsWith(item.key));

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "min-w-max rounded-lg border px-3 py-2 text-left no-underline md:min-w-0 md:px-2.5",
                  active
                    ? "border-border bg-slate-900/5"
                    : "border-transparent hover:bg-slate-900/5",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div
                      className={[
                        "text-sm leading-tight",
                        active ? "font-semibold" : "font-medium",
                        "whitespace-nowrap md:whitespace-normal",
                      ].join(" ")}
                    >
                      {item.label}
                    </div>

                    {/* Hide descriptions on mobile */}
                    {item.description ? (
                      <div className="mt-1 hidden text-xs text-muted-foreground md:block">
                        {item.description}
                      </div>
                    ) : null}
                  </div>

                  <span
                    aria-hidden
                    className={[
                      "mt-1 h-2 w-2 flex-shrink-0 rounded-full",
                      active ? "bg-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.14)]" : "bg-transparent",
                    ].join(" ")}
                  />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-3 rounded-xl border bg-white p-3 text-xs text-muted-foreground shadow-sm">
        Changes may be audited for compliance. Contact your administrator for
        role-based access updates.
      </div>
    </aside>
  );
}
