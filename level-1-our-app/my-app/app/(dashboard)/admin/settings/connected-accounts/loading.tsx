import { AccountLinkingSkeleton } from "../account-overview/_components/AccountLinkingSkeleton";

export default function ConnectedAccountsLoading() {
  return (
    <main>
      <div className="space-y-0.5 px-4 sm:px-6 md:block">
        <AccountLinkingSkeleton />
      </div>
    </main>
  );
}
