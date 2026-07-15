"use client";

import { Badge } from "@/components/ui/badge";

import type { BillingSnapshot } from "./billing-types";
import {
  formatBillingDate,
  getPlanById,
  statusLabel,
} from "./billing-utils";

export function BillingSummary({ billing }: { billing: BillingSnapshot }) {
  const plan = getPlanById(billing.subscription.planId);

  return (
    <div className="bg-muted/30 flex flex-col gap-3 rounded-md border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-medium">
          Billed to {billing.customerName || billing.customerEmail}
        </p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {billing.customerEmail}
          {billing.subscription.currentPeriodEnd
            ? ` · Next billing date ${formatBillingDate(billing.subscription.currentPeriodEnd)}`
            : null}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="font-normal">
          {plan.name}
        </Badge>
        <Badge
          variant={
            billing.subscription.status === "active" ||
            billing.subscription.status === "trialing"
              ? "verified"
              : "secondary"
          }
          className="font-normal"
        >
          {statusLabel(billing.subscription.status)}
        </Badge>
      </div>
    </div>
  );
}
