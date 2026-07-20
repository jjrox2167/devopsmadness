// lib/page-config.ts

{/* USED FOR THE PAGE TITLE/HEADER */}
export const pageConfig = {
  "/admin/dashboard": {
    title: "Dashboard",
    description: "View your application overview and metrics.",
  },
  "/admin/notifications": {
    title: "Notifications",
    description: "Security alerts, billing updates, and account activity.",
  },
  "/dashboard/users": {
    title: "Users",
    description: "Manage users, roles, and permissions.",
  },
  "/admin/settings/account-overview": {
    title: "Account Overview",
    description: "Update account preferences and integrations.",
  },
  "/admin/settings/billing": {
    title: "Billing & Subscription",
    description: "Update account preferences and integrations.",
  },
   "/admin/settings/security": {
    title: "Security & Activity",
    description: "Update account preferences and integrations.",
  },
  "/admin/settings/connected-accounts": {
    title: "Connected Accounts",
    description: "Update account preferences and integrations.",
  },
  "/dashboard/products": {
    title: "Products",
    description: "Manage your product catalog.",
  },
} as const;