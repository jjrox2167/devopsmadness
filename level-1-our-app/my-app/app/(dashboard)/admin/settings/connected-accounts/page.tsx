import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AccountLinking } from "../account-overview/_components/AccountLinking";


export default async function ConnectedAccountsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session == null) return redirect("/auth/login")

        const accounts = await auth.api.listUserAccounts({ headers: await headers() })
    const nonCredentialAccounts = accounts.filter(
        a => a.providerId !== 'credential'
    )



  return (
    <main>
 <div className="space-y-0.5 px-4 sm:px-6 md:block">
        <AccountLinking currentAccounts={nonCredentialAccounts} />
        </div>
    </main>
  );
}