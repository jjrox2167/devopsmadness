"use client";

import { BadgeCheck, MailIcon, PencilIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { AccountOverviewUser } from "./account-overview-types";
import { ChangeEmailDialog } from "./ChangeEmailDialog";
import { EditProfileDialog } from "./EditProfileDialog";
import { getInitials } from "./profile-utils";

export function ProfileHeaderCard({ user }: { user: AccountOverviewUser }) {
  const initials = getInitials(user.name);

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar size="lg" className="size-16 text-base">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name || "Profile photo"} />
            ) : null}
            <AvatarFallback className="text-base font-medium border">
              {initials}
            </AvatarFallback>
          </Avatar>

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
                <Badge variant="warning">Email not verified</Badge>
              )}
            </div>

            <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <MailIcon className="size-3.5 shrink-0" />
              <span className="truncate">{user.email}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {user.twoFactorEnabled ? (
            <Badge variant="outline" className="font-normal">
              MFA enrolled
            </Badge>
          ) : (
            <Badge variant="secondary" className="font-normal">
              MFA not enrolled
            </Badge>
          )}

          <ChangeEmailDialog
            currentEmail={user.email}
            trigger={
              <Button type="button" variant="outline" size="sm">
                <MailIcon />
                Change email
              </Button>
            }
          />

          <EditProfileDialog
            user={user}
            trigger={
              <Button type="button" size="sm">
                <PencilIcon />
                Edit profile
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
