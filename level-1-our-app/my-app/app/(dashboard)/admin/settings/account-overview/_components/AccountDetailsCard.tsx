import type { ReactNode } from "react";
import Link from "next/link";
import { BadgeCheck, ShieldIcon } from "lucide-react";

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

import type { AccountOverviewUser } from "./account-overview-types";
import { formatDisplayDateTime } from "./profile-utils";

type DetailField = {
  label: string;
  value: ReactNode;
};

export function AccountDetailsCard({ user }: { user: AccountOverviewUser }) {
  const fields: DetailField[] = [
    {
      label: "Account ID",
      value: (
        <span className="font-mono text-xs break-all sm:text-sm">
          {user.id}
        </span>
      ),
    },
    {
      label: "Email verification",
      value: user.emailVerified ? (
        <Badge variant="verified" className="gap-1">
          <BadgeCheck className="size-3.5" />
          Verified
        </Badge>
      ) : (
        <Badge variant="warning">Not verified</Badge>
      ),
    },
    {
      label: "Multifactor authentication",
      value: user.twoFactorEnabled ? (
        <Badge variant="outline" className="font-normal">
          Enabled
        </Badge>
      ) : (
        <Badge variant="secondary" className="font-normal">
          Disabled
        </Badge>
      ),
    },
    {
      label: "Account created",
      value: formatDisplayDateTime(user.createdAt),
    },
    {
      label: "Last updated",
      value: formatDisplayDateTime(user.updatedAt),
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Account details</CardTitle>
        <CardDescription>
          System information and security status for this account.
        </CardDescription>
        <CardAction>
          <Button type="button" variant="outline" size="sm" asChild>
            <Link href="/admin/settings/security">
              <ShieldIcon />
              Manage security
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-0">
        {fields.map((field, index) => (
          <div key={field.label}>
            {index > 0 ? <Separator /> : null}
            <div className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-4">
              <p className="text-muted-foreground text-sm font-medium">
                {field.label}
              </p>
              <div className="text-sm font-medium">{field.value}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
