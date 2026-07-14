"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import type { ColumnDef } from "@tanstack/react-table"
import { revokeOtherSessions } from "better-auth/api"
import { EllipsisIcon } from "lucide-react"
import { toast } from "sonner"

export type Session = {
  id: string
  token: string
  date: string
  ipAddress: string
  browser: "Chrome" | "Edge" | "Safari" | "Firefox" | "Unknown"
  operatingSystem:
    | "Windows"
    | "MacOS"
    | "Apple iOS"
    | "Android OS"
    | "Unknown"
  location: string
}

export const columns: ColumnDef<Session>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.date)

      if (Number.isNaN(date.getTime())) {
        return <span className="text-muted-foreground">Unknown</span>
      }

      return (
        <div className="flex flex-col leading-tight">
          <span className="font-medium">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          <span className="text-xs text-muted-foreground">
            {date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => (
      <div className="flex flex-col leading-tight">
        <span className="font-medium">{row.original.ipAddress}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.location}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "operatingSystem",
    header: "Device",
    cell: ({ row }) => (
      <div className="flex flex-col leading-tight">
        <span className="font-medium">
          {row.original.operatingSystem}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.original.browser}
        </span>
      </div>
    ),
  },
  {
  id: "actions",
  header: "",
  cell: ({ row }) => {
    const session = row.original

    const revokeSession = async () => {
      const { error } = await authClient.revokeSession({
        token: session.token,
      })

      if (error) {
        toast.error(error.message || "Unable to revoke session")
        return
      }

      toast.success("Session revoked")
    }

    return (
      <div className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Revoke session"
          onClick={revokeSession}
        >
          <EllipsisIcon className="size-4" />
          <span className="sr-only">Revoke session</span>
        </Button>
      </div>
    )
  },
}
]