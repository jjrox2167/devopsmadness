import { Skeleton } from "@/components/ui/skeleton";

const TAB_COUNT = 4;

/**
 * Loading placeholder that mirrors SettingsSidebar tab rows.
 */
export function SettingsSidebarSkeleton({
  rows = TAB_COUNT,
}: {
  rows?: number;
}) {
  return (
    <div
      className="flex h-auto w-72 flex-col items-stretch gap-1 p-1"
      role="status"
      aria-label="Loading settings navigation"
      aria-busy="true"
    >
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-lg px-4 py-3"
        >
          <Skeleton className="size-4 shrink-0 rounded-sm" />
          <Skeleton className="h-4 w-36 max-w-full" />
        </div>
      ))}
      <span className="sr-only">Loading settings navigation…</span>
    </div>
  );
}

export default SettingsSidebarSkeleton;
