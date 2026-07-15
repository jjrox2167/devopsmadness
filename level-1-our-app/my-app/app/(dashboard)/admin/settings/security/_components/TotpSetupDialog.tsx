"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CheckIcon,
  CopyIcon,
  KeyRoundIcon,
  Loader2Icon,
  SmartphoneIcon,
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { mfaClient } from "./mfa-auth-client";

type Step = "password" | "setup" | "done";

type TotpSetupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When true, user is re-enrolling (rotate secret / change authenticator). */
  mode?: "enable" | "update";
  onCompleted?: () => void;
};

function extractSecretFromUri(totpURI: string): string | null {
  try {
    const url = new URL(totpURI);
    return url.searchParams.get("secret");
  } catch {
    const match = totpURI.match(/[?&]secret=([^&]+)/i);
    return match?.[1] ?? null;
  }
}

export function TotpSetupDialog({
  open,
  onOpenChange,
  mode = "enable",
  onCompleted,
}: TotpSetupDialogProps) {
  const [step, setStep] = useState<Step>("password");
  const [password, setPassword] = useState("");
  const [totpURI, setTotpURI] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<"secret" | "codes" | null>(null);

  const secret = useMemo(
    () => (totpURI ? extractSecretFromUri(totpURI) : null),
    [totpURI],
  );

  const qrSrc = useMemo(() => {
    if (!totpURI) return null;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(totpURI)}`;
  }, [totpURI]);

  function reset() {
    setStep("password");
    setPassword("");
    setTotpURI(null);
    setBackupCodes([]);
    setCode("");
    setIsLoading(false);
    setCopied(null);
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  async function handleEnable() {
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await mfaClient.twoFactor.enable({
        password,
        issuer: "DevOpsMadness",
      });

      if (error) {
        toast.error(error.message || "Unable to start authenticator setup");
        return;
      }

      if (!data?.totpURI) {
        toast.error("No authenticator URI returned. Is the two-factor plugin enabled on the server?");
        return;
      }

      setTotpURI(data.totpURI);
      setBackupCodes(data.backupCodes ?? []);
      setStep("setup");
      toast.success(
        mode === "update"
          ? "Scan the new QR code, then verify to finish updating"
          : "Scan the QR code, then enter a code to finish setup",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerify() {
    if (code.length !== 6) {
      toast.error("Enter the 6-digit code from your authenticator app");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await mfaClient.twoFactor.verifyTotp({
        code,
      });

      if (error) {
        toast.error(error.message || "Invalid code. Try again.");
        return;
      }

      setStep("done");
      toast.success(
        mode === "update"
          ? "Authenticator updated successfully"
          : "Multifactor authentication enabled",
      );
      onCompleted?.();
    } finally {
      setIsLoading(false);
    }
  }

  async function copyText(value: string, kind: "secret" | "codes") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      toast.success(kind === "secret" ? "Secret copied" : "Backup codes copied");
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SmartphoneIcon className="size-5" />
            {mode === "update"
              ? "Update authenticator app"
              : "Set up authenticator app"}
          </DialogTitle>
          <DialogDescription>
            {step === "password" &&
              "Confirm your password to generate a new authenticator secret."}
            {step === "setup" &&
              "Scan the QR code with your authenticator app, save your backup codes, then verify with a 6-digit code."}
            {step === "done" &&
              "Your authenticator is ready. Use it when signing in."}
          </DialogDescription>
        </DialogHeader>

        {step === "password" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mfa-password">Password</Label>
              <Input
                id="mfa-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void handleEnable();
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
                onClick={() => void handleEnable()}
              >
                {isLoading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <KeyRoundIcon className="size-4" />
                )}
                Continue
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === "setup" && (
          <div className="space-y-4">
            {qrSrc && (
              <div className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrSrc}
                  alt="Authenticator QR code"
                  width={200}
                  height={200}
                  className="rounded-md border bg-white p-2"
                />
                <p className="text-muted-foreground text-center text-xs">
                  Open Google Authenticator, 1Password, Authy, or a similar app
                  and scan this code.
                </p>
              </div>
            )}

            {secret && (
              <div className="space-y-2">
                <Label>Manual entry secret</Label>
                <div className="flex gap-2">
                  <Input readOnly value={secret} className="font-mono text-xs" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => void copyText(secret, "secret")}
                    aria-label="Copy secret"
                  >
                    {copied === "secret" ? (
                      <CheckIcon className="size-4" />
                    ) : (
                      <CopyIcon className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {backupCodes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label>Backup codes</Label>
                  <Badge variant="warning">Save these now</Badge>
                </div>
                <div className="bg-muted/50 grid grid-cols-2 gap-1 rounded-md border p-3 font-mono text-xs">
                  {backupCodes.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    void copyText(backupCodes.join("\n"), "codes")
                  }
                >
                  {copied === "codes" ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <CopyIcon className="size-4" />
                  )}
                  Copy backup codes
                </Button>
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="totp-code">Verification code</Label>
              <div className="flex justify-center">
                <InputOTP
                  id="totp-code"
                  maxLength={6}
                  value={code}
                  onChange={setCode}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
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
                disabled={isLoading || code.length !== 6}
                onClick={() => void handleVerify()}
              >
                {isLoading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <CheckIcon className="size-4" />
                )}
                Verify &amp; enable
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === "done" && (
          <DialogFooter>
            <Button type="button" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
