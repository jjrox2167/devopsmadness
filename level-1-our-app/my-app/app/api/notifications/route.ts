import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { listNotificationsForUser } from "@/lib/notifications";

/**
 * GET /api/notifications?limit=10
 * Returns the signed-in user's notifications (for navbar bell, etc.).
 */
export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const take = Math.min(
    Math.max(Number(limitParam) || 20, 1),
    50,
  );

  const notifications = await listNotificationsForUser(session.user.id, {
    take,
  });

  return NextResponse.json({ notifications });
}
