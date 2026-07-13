// app/admin/settings/account-overview/page.ts

import  AccountOverview  from './_components/AccountOverview';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import PageTitle from './_components/PageTitle';


export default async function AccountOverviewPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session == null) return redirect("/auth/login")



  return (
    <main>
      <div className="space-y-0.5 px-4 sm:px-6 md:block">
        <AccountOverview />
        </div>
    </main>
  );
}