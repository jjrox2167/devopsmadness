"use client";

import { useState } from "react";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { BillingInterval, PlanId, Subscription } from "./billing-types";
import {
  PLANS,
  formatMoney,
  planPrice,
} from "./billing-utils";

type PlanCatalogCardProps = {
  subscription: Subscription;
  onSelectPlan?: (planId: PlanId, interval: BillingInterval) => Promise<void> | void;
};

export function PlanCatalogCard({
  subscription,
  onSelectPlan,
}: PlanCatalogCardProps) {
  const [interval, setInterval] = useState<BillingInterval>(
    subscription.interval,
  );
  const [loadingPlanId, setLoadingPlanId] = useState<PlanId | null>(null);

  async function handleSelect(planId: PlanId) {
    if (planId === subscription.planId) {
      toast.message("You are already on this plan");
      return;
    }

    setLoadingPlanId(planId);
    try {
      if (onSelectPlan) {
        await onSelectPlan(planId, interval);
      } else {
        toast.message("Checkout is not connected yet", {
          description: `Selected ${planId} (${interval}). Connect Stripe or your billing provider next.`,
        });
      }
    } finally {
      setLoadingPlanId(null);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <CardTitle>Available plans</CardTitle>
            <CardDescription>
              Choose a plan that fits your team. You can change or cancel
              anytime.
            </CardDescription>
          </div>

          <div className="bg-muted inline-flex rounded-lg p-1">
            <Button
              type="button"
              size="sm"
              variant={interval === "month" ? "default" : "ghost"}
              className="h-8"
              onClick={() => setInterval("month")}
            >
              Monthly
            </Button>
            <Button
              type="button"
              size="sm"
              variant={interval === "year" ? "default" : "ghost"}
              className="h-8"
              onClick={() => setInterval("year")}
            >
              Yearly
              <Badge variant="secondary" className="ml-1 font-normal">
                Save ~17%
              </Badge>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const price = planPrice(plan, interval);
            const isCurrent = plan.id === subscription.planId;
            const isLoading = loadingPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={cn(
                  "flex flex-col rounded-xl border p-5",
                  plan.highlighted && "border-primary/40 bg-primary/5",
                  isCurrent && "ring-1 ring-foreground/10",
                )}
              >
                <div className="mb-4 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold">{plan.name}</h4>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {plan.highlighted && !isCurrent ? (
                        <Badge className="font-normal">Popular</Badge>
                      ) : null}
                      {isCurrent ? (
                        <Badge variant="outline" className="font-normal">
                          Current
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <p className="mb-4">
                  <span className="text-3xl font-semibold tracking-tight">
                    {formatMoney(price, plan.currency)}
                  </span>
                  {plan.id !== "free" ? (
                    <span className="text-muted-foreground text-sm">
                      /{interval === "year" ? "year" : "month"}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {" "}
                      forever
                    </span>
                  )}
                </p>

                <ul className="mb-6 flex flex-1 flex-col gap-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  type="button"
                  className="w-full"
                  variant={
                    isCurrent
                      ? "outline"
                      : plan.highlighted
                        ? "default"
                        : "outline"
                  }
                  disabled={isCurrent || isLoading}
                  onClick={() => void handleSelect(plan.id)}
                >
                  {isLoading ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : null}
                  {isCurrent
                    ? "Current plan"
                    : plan.id === "free"
                      ? "Downgrade"
                      : "Upgrade"}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
