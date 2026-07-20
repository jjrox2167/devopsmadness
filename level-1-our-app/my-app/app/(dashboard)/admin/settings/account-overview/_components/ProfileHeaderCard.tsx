"use client";

import { BadgeCheck, MailIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { AccountOverviewUser } from "./account-overview-types";
import AvatarUploadButton from "./AvatarUploadButton";
import { ChangeEmailDialog } from "./ChangeEmailDialog";
import { formatDisplayDateTime } from "./profile-utils";

export function ProfileHeaderCard({ user }: { user: AccountOverviewUser }) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <AvatarUploadButton user={user} />

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="truncate text-lg font-semibold tracking-tight">
                {user.name || "Unnamed user"}
              </h4>
              {user.emailVerified ? (
                <Badge variant="verified" className="gap-1">
                  <BadgeCheck className="size-3.5" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="warning" >Email not verified</Badge>
              )}
            </div>

            <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <MailIcon className="size-3.5 shrink-0" />
              <span className="truncate">{user.email}</span>
            </p>
            <p className="text-xs">Joined On: {formatDisplayDateTime(user.createdAt)}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <ChangeEmailDialog
            currentEmail={user.email}
            trigger={
              <Button type="button" variant="outline" size="sm">
                <MailIcon />
                Change email
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
