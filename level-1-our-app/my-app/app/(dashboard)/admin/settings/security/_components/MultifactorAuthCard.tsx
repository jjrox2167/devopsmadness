"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { authClient } from "@/lib/auth-client";
import { MailIcon, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

type AuthMethod = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
};

type SessionUserWithMfa = {
  twoFactorEnabled?: boolean | null;
};

const MFA_METHODS: AuthMethod[] = [
  {
    id: "email-otp",
    title: "Email One-Time Passcode (OTP)",
    description:
      "A one-time verification code will be sent to your email address each time you sign in.",
    icon: <MailIcon className="h-5 w-5" />,
  },
  {
    id: "totp",
    title: "Authenticator App (TOTP)",
    description: "Use an authenticator app to generate secure codes.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

export default function MultifactorAuthCard() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as SessionUserWithMfa | undefined;
  const hasMfaConfigured = !!user?.twoFactorEnabled;

  // When MFA is on, treat TOTP as the registered method (better-auth default).
  const registeredMethods = hasMfaConfigured
    ? MFA_METHODS.filter((method) => method.id === "totp")
    : [];

  function handleToggleMethod(_id: string): void {
    throw new Error("Function not implemented.");
  }

  if (isPending) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Multi-Factor Authentication</CardTitle>
          <CardDescription>Loading your security settings...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 py-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-muted h-24 animate-pulse rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // MFA enabled → show registered method card only
  if (hasMfaConfigured) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Registered Methods</CardTitle>
          <CardDescription>
            Multi-factor authentication methods currently configured on your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-full flex-col gap-4">
            {registeredMethods.map((method) => (
              <MethodItem
                key={method.id}
                method={method}
                actionLabel="Disable"
                actionVariant="destructive"
                onAction={() => handleToggleMethod(method.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // MFA not enabled → empty state card + available methods card
  return (
    <div className="flex w-full flex-col space-y-4">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-4 text-center">
          <h3 className="mb-3 text-xl font-semibold">
            No methods configured yet
          </h3>
          <p className="text-muted-foreground max-w-md">
            Enable multi-factor authentication to keep your account secure with
            a second verification step.
          </p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Available Methods</CardTitle>
          <CardDescription>
            Multi-factor authentication methods available for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-full flex-col gap-4">
            {MFA_METHODS.map((method) => (
              <MethodItem
                key={method.id}
                method={method}
                actionLabel="Enable"
                actionVariant="outline"
                onAction={() => handleToggleMethod(method.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MethodItem({
  method,
  actionLabel,
  actionVariant,
  onAction,
}: {
  method: AuthMethod;
  actionLabel: string;
  actionVariant: "outline" | "destructive";
  onAction: () => void;
}) {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">{method.icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>{method.title}</ItemTitle>
        <ItemDescription>{method.description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant={actionVariant} onClick={onAction}>
          {actionLabel}
        </Button>
      </ItemActions>
    </Item>
  );
}
