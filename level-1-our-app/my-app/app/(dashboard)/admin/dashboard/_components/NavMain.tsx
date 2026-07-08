"use client"

import { ChevronRight, MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import WrenchIcon from '@iconify-react/mdi/wrench';
import { Button } from "@/components/ui/button";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    
    <SidebarGroup>
      
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/95 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              >
                <PlusCircleIcon />
                <span className="">Quick Create</span>
              </SidebarMenuButton>
              <Button
                size="icon"
                className="h-8 w-8 shrink-0 group-data-[collapsible=icon]:opacity-0"
                variant="default"
              >
                <MailIcon />
                <span className="sr-only block font-mono text-[10.5px] tracking-[0.12em]">Inbox</span>
              </Button>
            </SidebarMenuItem>
            <SidebarGroupLabel className="">Main Menu</SidebarGroupLabel>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            
            className="group/collapsible"
          >
            <SidebarMenuItem>
                
              <CollapsibleTrigger asChild>
                <SidebarMenuButton size="sm" tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent
  className="
    overflow-hidden
    data-[state=open]:animate-collapsible-down
    data-[state=closed]:animate-collapsible-up
  "
>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton size="sm" asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
