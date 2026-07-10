// lib/page-config.ts

export const pageConfig = {
  "/admin/dashboard": {
    title: "Dashboard",
    description: "View your application overview and metrics.",
  },
  "/dashboard/users": {
    title: "Users",
    description: "Manage users, roles, and permissions.",
  },
  "/admin/settings/account-overview": {
    title: "Account Overview",
    description: "Update account preferences and integrations.",
  },
  "/dashboard/products": {
    title: "Products",
    description: "Manage your product catalog.",
  },
} as const;