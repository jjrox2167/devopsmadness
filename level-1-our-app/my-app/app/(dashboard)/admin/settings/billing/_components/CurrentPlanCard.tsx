"use client";

import { CalendarIcon, CheckCircle2Icon, UsersIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { BillingInterval, Subscription } from "./billing-types";
import {
  formatBillingDate,
  formatMoney,
  getPlanById,
  planPrice,
  statusLabel,
} from "./billing-utils";

type CurrentPlanCardProps = {
  subscription: Subscription;
  onManage?: () => void;
  onCancel?: () => void;
};

export function CurrentPlanCard({
  subscription,
  onManage,
  onCancel,
}: CurrentPlanCardProps) {
  const plan = getPlanById(subscription.planId);
  const price = planPrice(plan, subscription.interval);
  const isPaid = plan.id !== "free";

  function handleManage() {
    if (onManage) {
      onManage();
      return;
    }
    toast.message("Billing portal is not connected yet", {
      description: "Wire this action to your payment provider customer portal.",
    });
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
      return;
    }
    toast.message("Cancellation is not connected yet", {
      description: "Wire this action to cancel the subscription at period end.",
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Current plan</CardTitle>
        <CardDescription>
          Your active subscription and renewal details.
        </CardDescription>
        <CardAction>
          <Badge
            variant={
              subscription.status === "active" ||
              subscription.status === "trialing"
                ? "verified"
                : subscription.status === "past_due"
                  ? "warning"
                  : "secondary"
            }
            className="font-normal"
          >
            {statusLabel(subscription.status)}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-lg font-semibold tracking-tight">
                {plan.name}
              </h4>
              {isPaid ? (
                <Badge variant="outline" className="font-normal">
                  {intervalLabel(subscription.interval)}
                </Badge>
              ) : null}
            </div>
            <p className="text-muted-foreground text-sm">{plan.description}</p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-2xl font-semibold tracking-tight">
              {formatMoney(price, plan.currency)}
              {isPaid ? (
                <span className="text-muted-foreground text-sm font-normal">
                  /{subscription.interval === "year" ? "yr" : "mo"}
                </span>
              ) : null}
            </p>
            {subscription.currentPeriodEnd ? (
              <p className="text-muted-foreground mt-1 text-xs">
                {subscription.cancelAtPeriodEnd
                  ? "Ends"
                  : "Renews"}{" "}
                {formatBillingDate(subscription.currentPeriodEnd)}
              </p>
            ) : (
              <p className="text-muted-foreground mt-1 text-xs">
                No renewal date
              </p>
            )}
          </div>
        </div>

        <Separator />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-2.5">
            <UsersIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">Seats</p>
              <p className="text-muted-foreground text-sm">
                {subscription.seats} included
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CalendarIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">Billing cycle</p>
              <p className="text-muted-foreground text-sm">
                {isPaid
                  ? intervalLabel(subscription.interval)
                  : "Not applicable"}
              </p>
            </div>
          </div>
        </div>

        <ul className="grid gap-2 sm:grid-cols-2">
          {plan.features.slice(0, 4).map((feature) => (
            <li
              key={feature}
              className="text-muted-foreground flex items-start gap-2 text-sm"
            >
              <CheckCircle2Icon className="mt-0.5 size-3.5 shrink-0 text-emerald-600 dark:text-emerald-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button type="button" size="sm" onClick={handleManage}>
            Manage subscription
          </Button>
          {isPaid && !subscription.cancelAtPeriodEnd ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancel plan
            </Button>
          ) : null}
          {subscription.cancelAtPeriodEnd ? (
            <Badge variant="warning" className="font-normal">
              Cancels at period end
            </Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function intervalLabel(interval: BillingInterval): string {
  return interval === "year" ? "Billed yearly" : "Billed monthly";
}
