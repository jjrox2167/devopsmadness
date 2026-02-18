import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsSidebarNav, } from "./_components/SettingsSidebarNav"
import { SettingsShell } from "./_components/SettingsShell";


type Props = {
  children: ReactNode;
  params: { section: string };
};

export default function SettingsLayout({ children, params }: Props) {
  const activeKey = params.section;


  return (
    <div className="min-h-screen border-t bg-[#f6f8fb]">
      <div className="mx-auto max-w-[1200px] px-4 py-7">

        {/* Header for return navigation */}
        <header className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground">
              <Button asChild variant="link" className="px-0">
                <Link href="/my-account" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  My Account
                </Link>
              </Button>
            </div>

            <h1 className="m-0 text-[22px] font-semibold">Settings</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your profile, preferences, and connected services.
            </p>
          </div>

          <div
            className="inline-flex w-fit items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs font-semibold shadow-sm"
            aria-label="Workspace status"
            title="Workspace status"
          >
            <span aria-hidden className="h-2 w-2 rounded-full bg-green-500" />
            Workspace: Active
          </div>
        </header>

        {/* SettingsShell Component */}
        <div className="flex flex-col gap-3 md:flex-row md:gap-5">
          <SettingsSidebarNav activeKey={activeKey} />
          <SettingsShell>{children}</SettingsShell>
        </div>
      </div>
    </div>
  );
}
