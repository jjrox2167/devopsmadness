import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import MultifactorAuthCard from "./_components/MultifactorAuthCard"
import { SessionsClient } from "./_components/SessionClient"
import type { Session } from "./_components/Columns"
import { getLocation } from "@/lib/utils"

export default async function SecurityPage() {
  const requestHeaders = await headers()

  const currentSession = await auth.api.getSession({
    headers: requestHeaders,
  })

  if (!currentSession) {
    redirect("/auth/login")
  }

  const sessions = await auth.api.listSessions({
    headers: requestHeaders,
  })

  const data: Session[] = await Promise.all(
    sessions.map(async (session) => {
      const ipAddress = session.ipAddress ?? "Unknown"

      const location =
        session.ipAddress
          ? await getLocation(session.ipAddress)
          : null

      return {
        id: session.id,
        token: session.token,
        date: new Date(session.createdAt).toLocaleString(),
        ipAddress,
        browser: getBrowser(session.userAgent),
        operatingSystem: getOperatingSystem(session.userAgent),
        location: formatLocation(location),
        actions: ""
      }
    })
  )

  return (
    <main>
      <div className="space-y-4 px-4 sm:px-6 md:block">
        <MultifactorAuthCard />

        <div className="container mx-auto">
          <SessionsClient data={data} />
        </div>
      </div>
    </main>
  )
}

function getBrowser(
  userAgent?: string | null
): Session["browser"] {
  if (!userAgent) return "Unknown"

  if (userAgent.includes("Edg/")) return "Edge"
  if (userAgent.includes("Firefox/")) return "Firefox"
  if (userAgent.includes("Chrome/")) return "Chrome"
  if (userAgent.includes("Safari/")) return "Safari"

  return "Unknown"
}

function getOperatingSystem(
  userAgent?: string | null
): Session["operatingSystem"] {
  if (!userAgent) return "Unknown"

  if (userAgent.includes("Windows")) return "Windows"
  if (userAgent.includes("Android")) return "Android OS"

  if (
    userAgent.includes("iPhone") ||
    userAgent.includes("iPad")
  ) {
    return "Apple iOS"
  }

  if (userAgent.includes("Mac OS")) return "MacOS"

  return "Unknown"
}

function formatLocation(
  location:
    | {
        city?: string | null
        region?: string | null
        country?: string | null
      }
    | null
): string {
  if (!location) return "Unknown"

  return [location.city, location.region, location.country]
    .filter(Boolean)
    .join(", ") || "Unknown"
}