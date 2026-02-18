import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AccountLinking } from "./accountlinking";

export default async function ConnectedAccountsPage() {
  const accounts = await auth.api.listUserAccounts({ headers: await headers() });

  const nonCredentialAccounts = accounts.filter(
    (a) => a.providerId !== "credential"
  );

  return (
    <main>
      <section>  
          <AccountLinking currentAccounts={nonCredentialAccounts} />
      </section>
    </main>
  );
}
