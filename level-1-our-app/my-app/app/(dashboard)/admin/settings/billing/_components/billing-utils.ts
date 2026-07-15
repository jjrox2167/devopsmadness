import type {
  BillingInterval,
  Invoice,
  Plan,
  PlanId,
  SubscriptionStatus,
} from "./billing-types";

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Core features for individuals getting started.",
    priceMonthly: 0,
    priceYearly: 0,
    currency: "USD",
    features: [
      "1 workspace",
      "Basic analytics",
      "Community support",
      "Email notifications",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams that need more control and capacity.",
    priceMonthly: 29,
    priceYearly: 290,
    currency: "USD",
    highlighted: true,
    features: [
      "Unlimited workspaces",
      "Advanced analytics",
      "Priority email support",
      "Custom roles",
      "API access",
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "Security, compliance, and scale for larger organizations.",
    priceMonthly: 99,
    priceYearly: 990,
    currency: "USD",
    features: [
      "Everything in Pro",
      "SSO / SAML",
      "Audit logs",
      "Dedicated success manager",
      "Custom contracts",
    ],
  },
];

export function getPlanById(planId: PlanId): Plan {
  return PLANS.find((plan) => plan.id === planId) ?? PLANS[0];
}

export function formatMoney(
  amount: number,
  currency = "USD",
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    ...options,
  }).format(amount);
}

export function formatBillingDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function planPrice(
  plan: Plan,
  interval: BillingInterval,
): number {
  return interval === "year" ? plan.priceYearly : plan.priceMonthly;
}

export function statusLabel(status: SubscriptionStatus): string {
  switch (status) {
    case "active":
      return "Active";
    case "trialing":
      return "Trial";
    case "past_due":
      return "Past due";
    case "canceled":
      return "Canceled";
    case "incomplete":
      return "Incomplete";
    default:
      return "No subscription";
  }
}

export function invoiceStatusLabel(status: Invoice["status"]): string {
  switch (status) {
    case "paid":
      return "Paid";
    case "open":
      return "Open";
    case "void":
      return "Void";
    case "uncollectible":
      return "Uncollectible";
    case "draft":
      return "Draft";
    default:
      return status;
  }
}

export function cardBrandLabel(brand: string): string {
  if (!brand) return "Card";
  return brand.charAt(0).toUpperCase() + brand.slice(1);
}
