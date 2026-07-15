"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  CheckIcon,
  CopyIcon,
  KeyRoundIcon,
  Loader2Icon,
  RefreshCwIcon,
  ShieldIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

type BackupCodesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleted?: () => void;
};

export function BackupCodesDialog({
  open,
  onOpenChange,
  onCompleted,
}: BackupCodesDialogProps) {
  const [password, setPassword] = useState("");
  const [codes, setCodes] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function reset() {
    setPassword("");
    setCodes(null);
    setIsLoading(false);
    setCopied(false);
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  async function handleGenerate() {
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await mfaClient.twoFactor.generateBackupCodes({
        password,
      });

      if (error) {
        toast.error(error.message || "Unable to generate backup codes");
        return;
      }

      const nextCodes = data?.backupCodes ?? [];
      if (nextCodes.length === 0) {
        toast.error("No backup codes returned");
        return;
      }

      setCodes(nextCodes);
      toast.success("New backup codes generated. Store them safely.");
      onCompleted?.();
    } finally {
      setIsLoading(false);
    }
  }

  async function copyCodes() {
    if (!codes?.length) return;
    try {
      await navigator.clipboard.writeText(codes.join("\n"));
      setCopied(true);
      toast.success("Backup codes copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldIcon className="size-5" />
            Backup codes
          </DialogTitle>
          <DialogDescription>
            {codes
              ? "Save these codes in a secure place. Previous codes no longer work."
              : "Confirm your password to generate a new set of backup codes. This replaces any existing codes."}
          </DialogDescription>
        </DialogHeader>

        {!codes ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backup-password">Password</Label>
              <Input
                id="backup-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void handleGenerate();
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
                disabled={isLoading || !password.trim()}
                onClick={() => void handleGenerate()}
              >
                {isLoading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <RefreshCwIcon className="size-4" />
                )}
                Generate new codes
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <Label>Your new codes</Label>
              <Badge variant="warning">One-time use each</Badge>
            </div>
            <div className="bg-muted/50 grid grid-cols-2 gap-1 rounded-md border p-3 font-mono text-xs">
              {codes.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => void copyCodes()}
            >
              {copied ? (
                <CheckIcon className="size-4" />
              ) : (
                <CopyIcon className="size-4" />
              )}
              Copy all codes
            </Button>
            <DialogFooter>
              <Button type="button" onClick={() => handleOpenChange(false)}>
                <KeyRoundIcon className="size-4" />
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
