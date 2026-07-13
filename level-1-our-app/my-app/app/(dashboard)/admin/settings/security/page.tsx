import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SessionCard  from "./_components/SessionCard";
import { getLocation } from "@/lib/utils";


export default async function SecurityPage({currentSessionToken}: { currentSessionToken: string}) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session == null) return redirect("/auth/login")
    
    const sessions = await auth.api.listSessions({ headers: await headers() })
    const location = session.session.ipAddress
    ? await getLocation(session.session.ipAddress)
    : null;

  return (
    <main>
 <div className="space-y-0.5 px-4 sm:px-6 md:block">
        <SessionCard userAgent={session.session.userAgent} IpAddress={session.session.ipAddress} Date={session.session.createdAt.toLocaleString()}  Location={
            location
              ? `${location.city}, ${location.state_prov}, ${location.country_name}`
              : "Unknown"
          }  />
        </div>
    </main>
  );
}