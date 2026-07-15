import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AccountOverview from "./_components/AccountOverview";
import type { AccountOverviewUser } from "./_components/account-overview-types";

export default async function AccountOverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session == null) {
    return redirect("/auth/login");
  }

  const user = session.user as typeof session.user & {
    dateOfBirth?: Date | string | null;
    language?: string | null;
    country?: string | null;
    gender?: string | null;
    twoFactorEnabled?: boolean | null;
  };

  const profile: AccountOverviewUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    createdAt:
      user.createdAt instanceof Date
        ? user.createdAt.toISOString()
        : String(user.createdAt),
    updatedAt:
      user.updatedAt instanceof Date
        ? user.updatedAt.toISOString()
        : String(user.updatedAt),
    dateOfBirth:
      user.dateOfBirth instanceof Date
        ? user.dateOfBirth.toISOString()
        : (user.dateOfBirth ?? null),
    language: user.language ?? null,
    country: user.country ?? null,
    gender: user.gender ?? null,
    twoFactorEnabled: user.twoFactorEnabled ?? null,
  };

  return (
    <main>
      <div className="space-y-0.5 px-4 sm:px-6 md:block">
        <AccountOverview user={profile} />
      </div>
    </main>
  );
}
