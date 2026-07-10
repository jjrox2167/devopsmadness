"use client"

import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbBasic() {
  const segments = useSelectedLayoutSegments()

  // Remove route groups like (dashboard)
  const filteredSegments = segments.filter(
    (segment) => !segment.startsWith("(")
  )

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin/dashboard">Admin</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {filteredSegments.map((segment, index) => {
          const href = "/" + filteredSegments.slice(0, index + 1).join("/")
          const isLast = index === filteredSegments.length - 1

          // Format "user-settings" -> "User Settings"
          const label = segment
            .split("-")
            .map(
              (word) => word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ")

          return (
            <div key={href} className="flex items-center gap-2">
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}