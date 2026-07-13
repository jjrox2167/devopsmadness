import { Metadata } from "next";
import SettingsSidebar from "./account-overview/_components/SettingsSidebar";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Settings | Account Overview",
  description: "Manage your account settings",
};

interface AccountOverviewLayoutProps {
  children: React.ReactNode;
}

export default function AccountOverviewLayout({
  children,
}: AccountOverviewLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-8 px-4 py-6 lg:flex-row lg:gap-12 lg:px-6">
      {/* Sidebar */}
      <aside className="hidden shrink-0 md:block lg:w-64">
        <div className="sticky top-6">
          <SettingsSidebar />
        
        </div>
      </aside>

      {/* Content */}
      <main className="min-w-0 flex-1">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}