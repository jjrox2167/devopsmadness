import { BellOffIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function NotificationsEmpty({
  title = "No notifications",
  description = "You’re all caught up. New alerts will show up here.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-2 py-12 text-center">
        <div className="bg-muted flex size-12 items-center justify-center rounded-full">
          <BellOffIcon className="text-muted-foreground size-5" />
        </div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
