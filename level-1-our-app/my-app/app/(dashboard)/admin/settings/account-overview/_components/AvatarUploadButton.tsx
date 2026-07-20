"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CameraIcon,
  ImagePlusIcon,
  Loader2Icon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import type { AccountOverviewUser } from "./account-overview-types";
import { getInitials } from "./profile-utils";

const MAX_BYTES = 2 * 1024 * 1024;
const ACCEPT = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

type Props = {
  user: AccountOverviewUser;
  className?: string;
};

/** `undefined` = server image · `null` = removed · `string` = local preview */
type ImageOverride = string | null | undefined;

export default function AvatarUploadButton({ user, className }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [override, setOverride] = useState<ImageOverride>(undefined);
  const [busy, setBusy] = useState(false);

  const initials = getInitials(user.name);
  const src = override !== undefined ? override : (user.image ?? null);
  const hasPhoto = Boolean(src);

  function pickFile() {
    inputRef.current?.click();
  }

  async function save(image: string | null) {
    setBusy(true);
    try {
      const { error } = await authClient.updateUser({ image });
      if (error) {
        toast.error(error.message || "Could not update photo");
        setOverride(undefined);
        return;
      }
      toast.success(image ? "Photo updated" : "Photo removed");
      setOverride(undefined);
      router.refresh();
    } catch {
      toast.error("Could not update photo");
      setOverride(undefined);
    } finally {
      setBusy(false);
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!(ACCEPT as readonly string[]).includes(file.type)) {
      toast.error("Use JPG, PNG, WebP, or GIF");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("Image must be 2MB or smaller");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setOverride(dataUrl);
      await save(dataUrl);
    } catch {
      toast.error("Could not read that file");
      setOverride(undefined);
    }
  }

  return (
    <div className={cn("inline-flex", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={(e) => void onFileChange(e)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={busy}
            aria-label={hasPhoto ? "Edit profile photo" : "Upload profile photo"}
            className={cn(
              // One fixed box: button, avatar, and hover overlay all share this size
              "group relative size-16 shrink-0 overflow-hidden rounded-full p-0 outline-none",
              "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-60",
            )}
          >
            {/*
              Do not use Avatar size="lg" — it sets data-[size=lg]:size-10 (40px)
              which fights size-16 (64px) and leaves the hover layer larger than the image.
            */}
            <Avatar className="size-full border text-base">
              {src ? (
                <AvatarImage
                  src={src}
                  alt={user.name || "Profile photo"}
                  className="size-full object-cover"
                />
              ) : null}
              <AvatarFallback className="size-full text-base font-medium">
                {busy && !src ? (
                  <Loader2Icon className="size-5 animate-spin" />
                ) : (
                  initials
                )}
              </AvatarFallback>
            </Avatar>

            <span
              className={cn(
                "pointer-events-none absolute inset-0 z-[1] flex items-center justify-center rounded-full",
                "bg-black/50 text-white opacity-0 transition-opacity",
                "group-hover:opacity-100 group-focus-visible:opacity-100",
                busy && "opacity-100",
              )}
              aria-hidden
            >
              {busy ? (
                <Loader2Icon className="size-5 animate-spin" />
              ) : (
                <CameraIcon className="size-5" />
              )}
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem
            disabled={busy}
            onSelect={() => {
              window.setTimeout(() => pickFile(), 0);
            }}
          >
            <ImagePlusIcon />
            {hasPhoto ? "Change photo" : "Upload photo"}
          </DropdownMenuItem>

          {hasPhoto ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                disabled={busy}
                onSelect={() => {
                  setOverride(null);
                  void save(null);
                }}
              >
                <Trash2Icon />
                Remove photo
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Invalid file result"));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}
