import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

/**
 * Fallback for settings child routes while the page segment loads.
 * Renders only the main content area — the layout already mounts SettingsSidebar.
 */
export default function SettingsLoading() {
  return (
    <div className="space-y-0.5 px-4 sm:px-6 md:block">
      <div className="space-y-6">
        <div className="space-y-1">
          <Skeleton className="h-7 w-48 max-w-full" />
          <Skeleton className="mt-1 h-4 w-80 max-w-full" />
          <Separator className="my-4" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
