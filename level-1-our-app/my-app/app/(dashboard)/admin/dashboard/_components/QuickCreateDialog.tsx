"Use Client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Label } from "@/components/ui/label"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { InboxIcon, Plus, PlusCircleIcon, PlusIcon } from "lucide-react"



export function QuickCreateDialog() {
  return (
    <Dialog>

<DialogTrigger asChild>
  
  <SidebarMenuButton
                tooltip="Quick Create"
                className="min-w-8 bg-sidebar-primary hover:bg-sidebar-accent text-primary-foreground transition-colors duration-100 ease-linear hover:text-primary-foreground active:text-primary-foreground cursor-pointer"
              
           
              >
                <PlusCircleIcon />
                <span className="">Quick Create</span>
              </SidebarMenuButton>
              
              </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Select an Action</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
<div className="flex w-full max-w-md flex-col gap-3">
      <Item variant={"muted"}>
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>
            Transparent background with no border.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            aria-label="Invite"
          >
            <Plus />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>
            Outlined style with a visible border.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            aria-label="Invite"
          >
            <Plus />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>
            Muted background for secondary content.
          </ItemDescription>
        </ItemContent>
                <ItemActions>
          <Button
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            aria-label="Invite"
          >
            <Plus />
          </Button>
        </ItemActions>
      </Item>
    </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
