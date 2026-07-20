"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon, PencilIcon } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";

import type { AccountOverviewUser } from "./account-overview-types";
import { splitFullName, toDateInputValue } from "./profile-utils";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "pt", label: "Portuguese" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
] as const;

const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
  { value: "other", label: "Other" },
] as const;

type EditProfileDialogProps = {
  user: AccountOverviewUser;
  trigger?: ReactNode;
};

export function EditProfileDialog({ user, trigger }: EditProfileDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const initialName = splitFullName(user.name);

  const [firstName, setFirstName] = useState(initialName.firstName);
  const [lastName, setLastName] = useState(initialName.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(
    toDateInputValue(user.dateOfBirth),
  );
  const [gender, setGender] = useState(user.gender ?? "");
  const [language, setLanguage] = useState(user.language ?? "en");
  const [country, setCountry] = useState(user.country ?? "");
  const [image, setImage] = useState(user.image ?? "");

  function resetFormFromUser() {
    const nextName = splitFullName(user.name);
    setFirstName(nextName.firstName);
    setLastName(nextName.lastName);
    setDateOfBirth(toDateInputValue(user.dateOfBirth));
    setGender(user.gender ?? "");
    setLanguage(user.language ?? "en");
    setCountry(user.country ?? "");
    setImage(user.image ?? "");
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      resetFormFromUser();
    }
    setOpen(nextOpen);
  }

  async function handleSave() {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();

    if (!trimmedFirst) {
      toast.error("First name is required");
      return;
    }

    setIsSaving(true);
    try {
      const fullName = [trimmedFirst, trimmedLast].filter(Boolean).join(" ");

      const { error } = await authClient.updateUser({
        name: fullName,
        image: image.trim() ? image.trim() : null,
        // Additional fields from better-auth user.additionalFields
        dateOfBirth: dateOfBirth ? `${dateOfBirth}T00:00:00.000Z` : null,
        gender: gender.trim() ? gender.trim() : null,
        language: language.trim() ? language.trim() : null,
        country: country.trim() ? country.trim() : null,
      } as Record<string, unknown>);

      if (error) {
        toast.error(error.message || "Unable to update profile");
        return;
      }

      toast.success("Profile updated");
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
            <PencilIcon />
            Edit profile
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your personal information. Changes apply to your account
            immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-of-birth">Date of birth</Label>
            <Input
              id="date-of-birth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={gender || undefined}
                onValueChange={(value) => setGender(value ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={language || undefined}
                onValueChange={(value) => setLanguage(value ?? "en")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. United States or US"
              autoComplete="country-name"
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
          <Button type="button" onClick={() => void handleSave()} disabled={isSaving}>
            {isSaving ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : null}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
