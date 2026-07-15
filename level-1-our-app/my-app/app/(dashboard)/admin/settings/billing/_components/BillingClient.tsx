"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import type {
  BillingInterval,
  BillingSnapshot,
  PlanId,
} from "./billing-types";
import { BillingSummary } from "./BillingSummary";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { InvoiceHistoryCard } from "./InvoiceHistoryCard";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { PlanCatalogCard } from "./PlanCatalogCard";
import { getPlanById } from "./billing-utils";

type BillingClientProps = {
  initialBilling: BillingSnapshot;
};

export function BillingClient({ initialBilling }: BillingClientProps) {
  const [billing, setBilling] = useState(initialBilling);

  async function handleSelectPlan(planId: PlanId, interval: BillingInterval) {
    // Placeholder until a payment provider is connected.
    // Keep local UI state optimistic so the page feels complete during development.
    const plan = getPlanById(planId);

    setBilling((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        planId,
        interval,
        status: planId === "free" ? "none" : "active",
        cancelAtPeriodEnd: false,
        currentPeriodEnd:
          planId === "free"
            ? null
            : new Date(
                Date.now() +
                  (interval === "year" ? 365 : 30) * 24 * 60 * 60 * 1000,
              ).toISOString(),
        seats: planId === "business" ? 25 : planId === "pro" ? 10 : 1,
      },
    }));

    toast.success(
      planId === "free"
        ? "Moved to Free plan"
        : `Upgraded to ${plan.name} (${interval})`,
      {
        description:
          "This is a UI preview. Connect Stripe checkout to process real payments.",
      },
    );
  }

  function handleManageSubscription() {
    toast.message("Open customer portal", {
      description:
        "Wire this to your provider’s billing portal (e.g. Stripe Customer Portal).",
    });
  }

  function handleCancelPlan() {
    setBilling((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        cancelAtPeriodEnd: true,
      },
    }));
    toast.success("Plan set to cancel at period end", {
      description: "Preview only — connect a real cancel API later.",
    });
  }

  function handleAddPaymentMethod() {
    toast.message("Add payment method", {
      description: "Connect this to Stripe SetupIntent or equivalent.",
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold">Billing &amp; Subscription</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your plan, payment methods, and invoices.
        </p>
        <Separator className="my-4" />
      </div>

      <div className="flex w-full flex-col space-y-4">
        <BillingSummary billing={billing} />
        <CurrentPlanCard
          subscription={billing.subscription}
          onManage={handleManageSubscription}
          onCancel={handleCancelPlan}
        />
        <PlanCatalogCard
          subscription={billing.subscription}
          onSelectPlan={handleSelectPlan}
        />
        <PaymentMethodCard
          paymentMethod={billing.paymentMethod}
          onAdd={handleAddPaymentMethod}
          onUpdate={handleAddPaymentMethod}
        />
        <InvoiceHistoryCard invoices={billing.invoices} />
      </div>
    </div>
  );
}
