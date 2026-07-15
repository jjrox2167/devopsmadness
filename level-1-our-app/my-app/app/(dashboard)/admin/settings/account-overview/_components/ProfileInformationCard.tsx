"use client";

import type { ReactNode } from "react";
import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { AccountOverviewUser } from "./account-overview-types";
import { ChangeEmailDialog } from "./ChangeEmailDialog";
import { EditProfileDialog } from "./EditProfileDialog";
import {
  displayValue,
  formatCountry,
  formatDisplayDate,
  formatGender,
  formatLanguage,
  splitFullName,
} from "./profile-utils";

type ProfileField = {
  key: string;
  label: string;
  value: string;
  action?: ReactNode;
};

export function ProfileInformationCard({
  user,
}: {
  user: AccountOverviewUser;
}) {
  const { firstName, lastName } = splitFullName(user.name);

  const fields: ProfileField[] = [
    { key: "firstName", label: "First name", value: displayValue(firstName) },
    { key: "lastName", label: "Last name", value: displayValue(lastName) },
    {
      key: "email",
      label: "Email address",
      value: displayValue(user.email),
      action: (
        <ChangeEmailDialog
          currentEmail={user.email}
          trigger={
            <Button type="button" variant="ghost" size="sm">
              Change
            </Button>
          }
        />
      ),
    },
    {
      key: "dateOfBirth",
      label: "Date of birth",
      value: formatDisplayDate(user.dateOfBirth),
    },
    { key: "gender", label: "Gender", value: formatGender(user.gender) },
    {
      key: "language",
      label: "Language",
      value: formatLanguage(user.language),
    },
    {
      key: "country",
      label: "Country",
      value: formatCountry(user.country),
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Basic information</CardTitle>
        <CardDescription>
          Profile details associated with your account.
        </CardDescription>
        <CardAction>
          <EditProfileDialog
            user={user}
            trigger={
              <Button type="button" variant="outline" size="sm">
                <PencilIcon />
                Edit
              </Button>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-0">
        {fields.map((field, index) => (
          <div key={field.key}>
            {index > 0 ? <Separator /> : null}
            <div className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:gap-4">
              <p className="text-muted-foreground text-sm font-medium">
                {field.label}
              </p>
              <p className="text-sm font-medium break-words">{field.value}</p>
              <div className="flex justify-start sm:justify-end">
                {field.action}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
