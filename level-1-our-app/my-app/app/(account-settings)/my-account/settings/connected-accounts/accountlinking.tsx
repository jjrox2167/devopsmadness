"use client";

import { Badge } from "@/components/ui/badge";
import { BetterAuthActionButton } from "@/components/ui/BetterAuthActionButtion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import {
  SUPPORTED_OAUTH_PROVIDER_DETAILS,
  SUPPORTED_OAUTH_PROVIDERS,
  SupportedOAuthProvider,
} from "@/lib/o-auth-providers";
import { router } from "better-auth/api";
import { BadgeCheck, Plus, Shield, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Account = Awaited<ReturnType<typeof auth.api.listUserAccounts>>[number];

export function AccountLinking({
  currentAccounts,
}: {
  currentAccounts: Account[];
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {currentAccounts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-secondary-muted">
              No linked accounts found
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {currentAccounts.map((account) => (
              <AccountCard
                key={account.id}
                provider={account.providerId}
                account={account}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold">Link Other Accounts</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Connect your other accounts with third-party services and
          integrations.
        </p>
        <Separator className="my-4" />
        <div className="grid gap-3">
          {SUPPORTED_OAUTH_PROVIDERS.filter(
            (provider) =>
              !currentAccounts.find((acc) => acc.providerId === provider),
          ).map((provider) => (
            <AccountCard key={provider} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AccountCard({
  provider,
  account,
}: {
  provider: string;
  account?: Account;
}) {
  const router = useRouter();

  const providerDetails = SUPPORTED_OAUTH_PROVIDER_DETAILS[
    provider as SupportedOAuthProvider
  ] ?? {
    name: provider,
    Icon: Shield,
  };

  function linkAccount() {
    return authClient.linkSocial({
      provider,
      callbackURL: "/my-account/connected-accounts",
    });
  }

  function unlinkAccount() {
    if (account == null) {
      return Promise.resolve({ error: { message: "Account not found" } });
    }
    return authClient.unlinkAccount(
      {
        accountId: account.accountId,
        providerId: provider,
      },
      {
        onSuccess: () => {
          router.refresh();

        },
      },
    );
  }

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {<providerDetails.Icon className="size-5" />}
            <div>
              <p className="font-medium">{providerDetails.name}</p>
              {account == null ? (
                <p className="text-sm text-muted-foreground">
                  Connect your {providerDetails.name} account for easier sign-in
                </p>
              ) : (
                <Badge variant="default" className="py-auto">
        <BadgeCheck data-icon="inline-start" />
                
  Linked on{' '}
  {new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(account.createdAt))}
</Badge>
              )}
            </div>
          </div>
          {account == null ? (
            <BetterAuthActionButton
              variant="outline"
              size="sm"
              action={linkAccount}
              requireAreYouSure={true}
              areYouSureDescription={
                <>
                  By linking your <b>{provider} account</b>, we’ll use your {provider}{" "}
                  account&apos;s name, profile picture, and email for login and
                  display purposes.
                  <br />
                  <br />
                  This does <strong>not</strong> give us access to your private
                  data, messages, files, contacts, or other personal information
                  in {provider}.
                  <br />
                  <br />
                  You can unlink your {provider} account at any time from <br />
                  <strong>Settings → Connected accounts</strong>.
                </>
              }
            >
              <Plus />
              Link
            </BetterAuthActionButton>
          ) : (
            <BetterAuthActionButton
              variant="destructive"
              size="sm"
              action={unlinkAccount}
              requireAreYouSure={true}
              areYouSureTitle={<>Are You Sure?</>}
              areYouSureDescription={
    <>
      Are you sure you want to unlink your <b>{provider} account?</b><br /><br />
      - You won&apos;t be able to sign in with <b>{provider}</b> anymore.<br />
      - Your account data and settings will remain intact.<br />
      - You can always re-link it later from this page.
    </>
  }         
            successMessage="Successfully Un-linked"
  >
              <Trash2 />
              Unlink
            </BetterAuthActionButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
}