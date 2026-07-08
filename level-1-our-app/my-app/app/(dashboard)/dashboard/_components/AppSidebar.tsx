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

import { NavMain } from "@/app/(dashboard)/dashboard/_components/NavMain"
import { NavApps } from "@/app/(dashboard)/dashboard/_components/NavApps"
import { NavUser } from "@/app/(dashboard)/dashboard/_components/NavUser"
import { PropertySwitcher } from "@/app/(dashboard)/dashboard/_components/PropertySwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import build from "next/dist/build"
import { NavResources } from "./NavResources"
import { Separator } from "@/components/ui/separator"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  properties: [
    {
      name: "Oakwood Residence",
      logo: GalleryVerticalEnd,
      propertyType: "Single Family Dwelling",
      address: "123 Main St, Schaumburg, IL 60171",
    },
    {
      name: "The Grandview",
      logo: AudioWaveform,
      propertyType: "Multi-family Duplex",
      address: "1425 Grandview Blvd, Austin, TX 78701",
    },
    {
      name: "Cedarpark Estates",
      logo: Command,
      propertyType: "Condominium Complex",
      address: "789 Pine St, Cedar Falls, IA 61101",
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
      title: "Property Management",
      url: "#",
      icon: Building,
      items: [
        {
          title: "Property Overview",
          url: "#",
        },
        {
          title: "Lease Agreements",
          url: "#",
        },
        {
          title: "Occupancy & Tenants",
          url: "#",
        },
        {
          title: "Applicants & Screening",
          url: "#",
        },
      ],
    },
    {
      title: "Maintenance",
      url: "#",
      icon: WrenchIcon,
      items: [
        {
          title: "Maintenance Requests",
          url: "#",
        },
        {
          title: "Work Orders",
          url: "#",
        },
        {
          title: "Vendors & Contractors",
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
          title: "Rent Collection",
          url: "#",
        },
        {
          title: "Security Deposits",
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
      name: "Messages",
      url: "#",
      icon: LucideMessageSquareText,
    },
        {
      name: "Tasks",
      url: "#",
      icon: LucideCheckSquare,
    },
    {
      name: "Calendar",
      url: "#",
      icon: LucideCalendar,
    },
    {
      name: "Contacts",
      url: "#",
      icon: Contact,
    },
    {
      name: "Documents & Files",
      url: "#",
      icon: LucideFileText,
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
    <NavUser user={data.user} />
  </SidebarFooter>

  <SidebarRail />
</Sidebar>
  )
}
