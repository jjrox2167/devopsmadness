import { auth } from "@/lib/auth";
import { listNotificationsForUser } from "@/lib/notifications";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { NotificationsClient } from "./_components/NotificationsClient";

export default async function NotificationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session == null) {
    return redirect("/auth/login");
  }

  // Load this user's rows from Postgres (not demo INITIAL_NOTIFICATIONS)
  const initialNotifications = await listNotificationsForUser(
    session.user.id,
    { take: 50 },
  );

  return (
    <main>
      <div className="space-y-0.5 px-4 sm:px-6 md:block">
        <NotificationsClient initialNotifications={initialNotifications} />
      </div>
    </main>
  );
}
