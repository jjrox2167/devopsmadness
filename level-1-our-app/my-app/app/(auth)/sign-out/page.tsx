"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignOutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in"); // or "/" if you prefer
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Sign Out</h1>
          <p className="text-muted-foreground">
            Are you sure you want to sign out of your account?
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleSignOut}
            disabled={isLoading}
            variant="destructive"
            className="w-full"
          >
            {isLoading ? "Signing out..." : "Yes, Sign Me Out"}
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="admin/dashboard">Cancel</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          You’ll be redirected to the sign-in page after signing out.
        </p>
      </div>
    </div>
  );
}