import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function ContentCard({ title, description, children, actions }: Props) {
  return (
    <section className="min-w-0 flex-1">
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[13px] font-semibold">{title}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {description ?? "Review and update settings for your account."}
            </div>
          </div>

          {actions ? <div className="mt-2 md:mt-0">{actions}</div> : null}
        </div>

        <div className="p-4">{children}</div>
      </div>
    </section>
  );
}
