import { Separator } from "@/components/ui/separator";

import type { AccountOverviewUser } from "./account-overview-types";
import { AccountDetailsCard } from "./AccountDetailsCard";
import { ProfileHeaderCard } from "./ProfileHeaderCard";
import { ProfileInformationCard } from "./ProfileInformationCard";

export default function AccountOverview({
  user,
}: {
  user: AccountOverviewUser;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold">My Account</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          View and update your profile information and account details.
        </p>
        <Separator className="my-4" />
      </div>

      <div className="flex w-full flex-col space-y-4">
        <ProfileHeaderCard user={user} />
        <ProfileInformationCard user={user} />
        <AccountDetailsCard user={user} />
      </div>
    </div>
  );
}
