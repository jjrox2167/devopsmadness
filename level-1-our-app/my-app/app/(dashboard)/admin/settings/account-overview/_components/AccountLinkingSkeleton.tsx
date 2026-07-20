import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function AccountCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center space-x-3">
            <Skeleton className="size-5 shrink-0 rounded-sm" />
            <div className="min-w-0 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-48 max-w-full" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 shrink-0 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

function SectionHeaderSkeleton({
  titleWidth = "w-56",
  descriptionWidth = "w-80",
}: {
  titleWidth?: string;
  descriptionWidth?: string;
}) {
  return (
    <div className="space-y-1">
      <Skeleton className={`h-7 ${titleWidth} max-w-full`} />
      <Skeleton className={`mt-1 h-4 ${descriptionWidth} max-w-full`} />
      <Separator className="my-4" />
    </div>
  );
}

/**
 * Loading placeholder that mirrors AccountLinking:
 * - Linked accounts section (cards)
 * - Available providers section (cards)
 */
export function AccountLinkingSkeleton({
  linkedCount = 2,
  availableCount = 2,
}: {
  linkedCount?: number;
  availableCount?: number;
}) {
  return (
    <div
      className="space-y-6"
      role="status"
      aria-label="Loading connected accounts"
      aria-busy="true"
    >
      {/* Accounts Currently Linked */}
      <div className="space-y-2">
        <SectionHeaderSkeleton
          titleWidth="w-64"
          descriptionWidth="w-72"
        />
        <div className="space-y-4">
          {Array.from({ length: linkedCount }).map((_, index) => (
            <AccountCardSkeleton key={`linked-${index}`} />
          ))}
        </div>
      </div>

      {/* Link Other Accounts */}
      <div className="space-y-1">
        <SectionHeaderSkeleton
          titleWidth="w-48"
          descriptionWidth="w-96"
        />
        <div className="grid gap-3">
          {Array.from({ length: availableCount }).map((_, index) => (
            <AccountCardSkeleton key={`available-${index}`} />
          ))}
        </div>
      </div>

      <span className="sr-only">Loading connected accounts…</span>
    </div>
  );
}

export default AccountLinkingSkeleton;
