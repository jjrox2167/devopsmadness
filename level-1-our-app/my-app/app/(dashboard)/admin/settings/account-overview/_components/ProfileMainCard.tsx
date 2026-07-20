import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { EditProfileDialog } from "./EditProfileDialog";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { AccountOverviewUser } from "./account-overview-types";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDisplayDate, splitFullName } from "./profile-utils";
export default function ProfileMainCard({
  user,
}: {
  user: AccountOverviewUser;
}) {

  const { firstName, lastName } = splitFullName(user.name || "");
  const dateBirth = formatDisplayDate(user.dateOfBirth)
  const GenderFirstLetter = String(user.gender?.charAt(0))
  const CapitalGenderFirstLetter = GenderFirstLetter.toUpperCase()
  const userGender = CapitalGenderFirstLetter + (user.gender?.slice(1))
  const CountryFirstLetter = String(user.country?.charAt(0))
  const CapitalCountryFirstLetter = CountryFirstLetter.toUpperCase()
  const userCountry = CapitalCountryFirstLetter + (user.country?.slice(1))

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            A basic overview of your account details.
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
            ></EditProfileDialog>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            <Field className="flex flex-col gap-1">
              <FieldLabel className="text-muted-foreground text-sm">
                First Name
              </FieldLabel>
              <Input
                id="checkout-7j9-card-name-43j"
                placeholder={firstName}
                disabled
              />
            </Field>
<Field className="flex flex-col gap-1">
              <FieldLabel className="text-muted-foreground text-sm">
                Last Name
              </FieldLabel>
              <Input
                id="checkout-7j9-card-name-43j"
                placeholder={lastName}
                disabled
              />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4 justify-items-center py-6">
            <Field className="flex flex-col gap-1">
              <FieldLabel className="text-muted-foreground text-sm ">
                Date of Birth
              </FieldLabel>
              <Input
                id="checkout-7j9-card-name-43j"
                placeholder={dateBirth}
                disabled
              />
            </Field>
            <Field className="flex flex-col gap-1">
              <FieldLabel className="text-muted-foreground text-sm ">
                Gender
              </FieldLabel>
              <Input
                id="checkout-7j9-card-name-43j"
                placeholder={userGender}
                disabled
              />
            </Field>
            <Field className="flex flex-col gap-1">
              <FieldLabel className="text-muted-foreground text-sm ">
                Country
              </FieldLabel>
              <Input
                id="checkout-7j9-card-name-43j"
                placeholder={userCountry}
                disabled
              />
            </Field>
          </div>
<div className="grid grid-cols-3 gap-4">
  <Field className="flex flex-col gap-1">
    <FieldLabel className="text-muted-foreground text-sm">
      Preferred Language
    </FieldLabel>
    <Input id="preferred-language" placeholder="English" disabled />
  </Field>
</div>
<div className="flex items-center py-6">
 <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
        <Avatar>
          <AvatarFallback />
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
</div>
        </CardContent>
      </Card>
    </div>
  );
}

