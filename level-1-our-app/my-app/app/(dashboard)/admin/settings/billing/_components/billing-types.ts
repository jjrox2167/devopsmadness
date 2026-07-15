export type PlanId = "free" | "pro" | "business";

export type BillingInterval = "month" | "year";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "none";

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  features: string[];
  highlighted?: boolean;
};

export type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
} | null;

export type Invoice = {
  id: string;
  number: string;
  status: "paid" | "open" | "void" | "uncollectible" | "draft";
  amountDue: number;
  currency: string;
  createdAt: string;
  hostedInvoiceUrl?: string | null;
  pdfUrl?: string | null;
};

export type Subscription = {
  planId: PlanId;
  status: SubscriptionStatus;
  interval: BillingInterval;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  seats: number;
};

export type BillingSnapshot = {
  customerEmail: string;
  customerName: string;
  subscription: Subscription;
  paymentMethod: PaymentMethod;
  invoices: Invoice[];
};
