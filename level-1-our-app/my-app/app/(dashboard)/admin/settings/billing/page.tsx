import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function BillingPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session == null) return redirect("/auth/login")



  return (
    <main>
 <div className="space-y-0.5 px-4 sm:px-6 md:block">
   
        </div>
    </main>
  );
}