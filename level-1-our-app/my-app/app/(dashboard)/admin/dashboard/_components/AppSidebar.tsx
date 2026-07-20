"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  Building,
  Contact,
  GalleryVerticalEnd,
  LucideCalendar,
  LucideCheckSquare,
  LucideMessageSquareText,
  Map,
  MessageSquare,
  PieChart,
  Settings2,
  SquareTerminal,
  Wrench,
  WrenchIcon,
  
  LucideFileText,
  LandmarkIcon,
} from "lucide-react"

import { NavMain } from "@/app/(dashboard)/admin/dashboard/_components/NavMain"
import { NavApps } from "@/app/(dashboard)/admin/dashboard/_components/NavApps"
import { NavUser } from "@/app/(dashboard)/admin/dashboard/_components/NavUser"
import { PropertySwitcher } from "@/app/(dashboard)/admin/dashboard/_components/PropertySwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { NavResources } from "./NavResources"
import { Separator } from "@/components/ui/separator"

// Sample nav / property data (user comes from the session below).
const data = {
  properties: [
    {
      name: "Oakwood Store",
      logo: GalleryVerticalEnd,
      propertyType: "Retail",
      address: "123 Main St, Schaumburg, IL 60171",
    },
    {
      name: "Grandview Store",
      logo: AudioWaveform,
      propertyType: "Outlet",
      address: "1425 Grandview Blvd, Austin, TX 78701",
    },
    {
      name: "Cedar Park Store",
      logo: Command,
      propertyType: "Warehouse",
      address: "789 Pine St, Cedar Park, TX 78613",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
         {
          title: "Notifications",
          url: "/admin/notifications",
        },
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
      ],
    },
        {
      title: "Store Management",
      url: "#",
      icon: Building,
      items: [
        {
          title: "Products & Inventory",
          url: "#",
        },
        {
          title: "Sales & Orders",
          url: "#",
        },
        {
          title: "Customers",
          url: "#",
        },
      ],
    },
    
    {
      title: "Financials",
      url: "#",
      icon: LandmarkIcon,
      items: [
        {
          title: "Transactions",
          url: "#",
        },
        {
          title: "Billing & Invoices",
          url: "#",
        },
      ],
    },
  ],
  Apps: [
        {
      name: "Tasks",
      url: "#",
      icon: LucideCheckSquare,
    },
  ],
  Resources: [
    {
      name: "Documentation",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Help & Support",
      url: "#",
      icon: Map,
    },
    {
      name: "Report a Bug",
      url: "#",
      icon: BookOpen,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = authClient.useSession()

  const user = {
    name: session?.user.name ?? (isPending ? "Loading…" : "User"),
    email: session?.user.email ?? "",
    // NavUser expects `avatar`; better-auth stores it as `image`
    avatar: session?.user.image ?? "",
  }

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <PropertySwitcher Properties={data.properties} />
      </SidebarHeader>

      <Separator />

      <SidebarContent className="overflow-y-auto">
        <NavMain items={data.navMain} />
        <NavApps Apps={data.Apps} />
      </SidebarContent>

      <Separator />
      <NavResources Resources={data.Resources} />

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
