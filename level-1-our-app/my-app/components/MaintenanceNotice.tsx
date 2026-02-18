// components/MaintenanceNotice.tsx

import { Wrench } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
};

export function MaintenanceNotice({
  title = "Section Under Maintenance",
  description = "We're currently working on improvements. Please check back soon.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-white px-6 py-12 text-center shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Wrench className="h-6 w-6 text-muted-foreground" />
      </div>

      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
