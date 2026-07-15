"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2Icon, ShieldOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { mfaClient } from "./mfa-auth-client";

type DisableTwoFactorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleted?: () => void;
};

export function DisableTwoFactorDialog({
  open,
  onOpenChange,
  onCompleted,
}: DisableTwoFactorDialogProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function reset() {
    setPassword("");
    setIsLoading(false);
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  async function handleDisable() {
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await mfaClient.twoFactor.disable({ password });

      if (error) {
        toast.error(error.message || "Unable to disable multifactor authentication");
        return;
      }

      toast.success("Multifactor authentication disabled");
      onCompleted?.();
      handleOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldOffIcon className="size-5" />
            Disable multifactor authentication
          </DialogTitle>
          <DialogDescription>
            This removes authenticator verification and invalidates backup codes.
            Your account will only be protected by your password and linked
            sign-in methods.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="disable-mfa-password">Password</Label>
            <Input
              id="disable-mfa-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your account password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleDisable();
              }}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading || !password.trim()}
              onClick={() => void handleDisable()}
            >
              {isLoading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <ShieldOffIcon className="size-4" />
              )}
              Disable MFA
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
