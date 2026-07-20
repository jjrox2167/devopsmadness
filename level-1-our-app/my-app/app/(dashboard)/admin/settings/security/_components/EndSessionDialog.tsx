"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Ellipsis } from "lucide-react"
import { toast } from "sonner"

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
import { authClient } from "@/lib/auth-client"

type EndSessionDialogProps = {
  token: string
  isCurrentSession?: boolean
}

export function EndSessionDialog({
  token,
  isCurrentSession = false,
}: EndSessionDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isRevoking, setIsRevoking] = useState(false)

  const handleRevokeSession = async () => {
    if (!token) {
      toast.error("No session token found")
      return
    }

    setIsRevoking(true)

    try {
      const { error } = await authClient.revokeSession({
        token,
      })

      if (error) {
        toast.error(error.message || "Unable to revoke session")
        return
      }

      toast.success("Session revoked")
      setOpen(false)

      if (isCurrentSession) {
        router.push("/auth/login")
      } else {
        router.refresh()
      }
    } catch {
      toast.error("Unable to revoke session")
    } finally {
      setIsRevoking(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="cursor-pointer"
          aria-label="End session"
        >
          <Ellipsis className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>End session</DialogTitle>

          <DialogDescription>
            Are you sure you want to revoke this session?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              disabled={isRevoking}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer"
            disabled={isRevoking}
            onClick={handleRevokeSession}
          >
            {isRevoking ? "Revoking..." : "Revoke session"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}