"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

interface SignOutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
}

export function SignOutButton({
  variant = "ghost",
  size = "default",
  className,
  showIcon = true,
}: SignOutButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href="/sign-out">
        {showIcon && <LogOut className="mr-2 h-4 w-4" />}
        Sign Out
      </Link>
    </Button>
  );
}