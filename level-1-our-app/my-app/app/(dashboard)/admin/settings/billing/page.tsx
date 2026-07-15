import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { BillingClient } from "./_components/BillingClient";
import type { BillingSnapshot } from "./_components/billing-types";

export default async function BillingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session == null) {
    return redirect("/auth/login");
  }

  // Default snapshot for accounts without a billing provider yet.
  // Replace this with Stripe / your billing API when ready.
  const billing: BillingSnapshot = {
    customerEmail: session.user.email,
    customerName: session.user.name,
    subscription: {
      planId: "free",
      status: "none",
      interval: "month",
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
      seats: 1,
    },
    paymentMethod: null,
    invoices: [],
  };

  return (
    <main>
      <div className="space-y-0.5 px-4 sm:px-6 md:block">
        <BillingClient initialBilling={billing} />
      </div>
    </main>
  );
}
