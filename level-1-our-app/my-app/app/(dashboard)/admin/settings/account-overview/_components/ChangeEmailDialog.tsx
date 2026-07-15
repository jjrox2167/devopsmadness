"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon, MailIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

type ChangeEmailDialogProps = {
  currentEmail: string;
  trigger?: ReactNode;
};

export function ChangeEmailDialog({
  currentEmail,
  trigger,
}: ChangeEmailDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(currentEmail);
  const [isSaving, setIsSaving] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setEmail(currentEmail);
    }
    setOpen(nextOpen);
  }

  async function handleSave() {
    const nextEmail = email.trim().toLowerCase();

    if (!nextEmail) {
      toast.error("Email is required");
      return;
    }

    if (nextEmail === currentEmail.trim().toLowerCase()) {
      toast.error("Enter a different email address");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await authClient.changeEmail({
        newEmail: nextEmail,
        callbackURL: "/admin/settings/account-overview",
      });

      if (error) {
        toast.error(error.message || "Unable to change email");
        return;
      }

      toast.success("Email updated");
      setOpen(false);
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button type="button" variant="outline" size="sm">
            <MailIcon />
            Change email
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change email</DialogTitle>
          <DialogDescription>
            Update the email address used to sign in and receive account
            notifications.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1">
          <div className="space-y-2">
            <Label htmlFor="current-email">Current email</Label>
            <Input
              id="current-email"
              value={currentEmail}
              disabled
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-email">New email</Label>
            <Input
              id="new-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleSave();
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => void handleSave()}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : null}
            Update email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
