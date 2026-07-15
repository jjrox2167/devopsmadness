"use client";

import { CreditCardIcon, PlusIcon } from "lucide-react";
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

import type { PaymentMethod } from "./billing-types";
import { cardBrandLabel } from "./billing-utils";

type PaymentMethodCardProps = {
  paymentMethod: PaymentMethod;
  onAdd?: () => void;
  onUpdate?: () => void;
  onRemove?: () => void;
};

export function PaymentMethodCard({
  paymentMethod,
  onAdd,
  onUpdate,
  onRemove,
}: PaymentMethodCardProps) {
  function handleAdd() {
    if (onAdd) {
      onAdd();
      return;
    }
    toast.message("Add payment method is not connected yet", {
      description: "Connect this action to your payment provider setup flow.",
    });
  }

  function handleUpdate() {
    if (onUpdate) {
      onUpdate();
      return;
    }
    toast.message("Update payment method is not connected yet");
  }

  function handleRemove() {
    if (onRemove) {
      onRemove();
      return;
    }
    toast.message("Remove payment method is not connected yet");
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment method</CardTitle>
        <CardDescription>
          Cards used for subscription renewals and invoices.
        </CardDescription>
        <CardAction>
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <PlusIcon />
            Add method
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {!paymentMethod ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-4 py-10 text-center">
            <div className="bg-muted flex size-10 items-center justify-center rounded-full">
              <CreditCardIcon className="text-muted-foreground size-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">No payment method on file</p>
              <p className="text-muted-foreground max-w-sm text-sm">
                Add a card to upgrade plans and keep your subscription active
                without interruption.
              </p>
            </div>
            <Button type="button" size="sm" onClick={handleAdd}>
              <PlusIcon />
              Add payment method
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-muted flex size-10 items-center justify-center rounded-md border">
                <CreditCardIcon className="size-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">
                    {cardBrandLabel(paymentMethod.brand)} ending in{" "}
                    {paymentMethod.last4}
                  </p>
                  {paymentMethod.isDefault ? (
                    <Badge variant="outline" className="font-normal">
                      Default
                    </Badge>
                  ) : null}
                </div>
                <p className="text-muted-foreground text-xs">
                  Expires{" "}
                  {String(paymentMethod.expMonth).padStart(2, "0")}/
                  {paymentMethod.expYear}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
