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

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB — data URLs bloat quickly
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

type AvatarUploadButtonProps = {
  user: AccountOverviewUser;
  /** Show status dot on the avatar. Default true. */
  showStatusBadge?: boolean;
  className?: string;
};

/**
 * Optimistic image override:
 * - `undefined` → use server `user.image`
 * - `null` → removed (show fallback)
 * - `string` → local preview / newly uploaded data URL
 *
 * Important: do NOT use `preview ?? user.image` with `null`, because
 * `null ?? user.image` falls through to the old server image.
 */
type OptimisticImage = string | null | undefined;

export default function AvatarUploadButton({
  user,
  showStatusBadge = true,
  className,
}: AvatarUploadButtonProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [optimisticImage, setOptimisticImage] =
    useState<OptimisticImage>(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const initials = getInitials(user.name);
  const displayImage =
    optimisticImage !== undefined ? optimisticImage : (user.image ?? null);
  const hasPhoto = Boolean(displayImage);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function persistImage(image: string | null) {
    setIsUploading(true);
    try {
      const { error } = await authClient.updateUser({ image });

      if (error) {
        toast.error(error.message || "Unable to update profile photo");
        // Revert to whatever the server still has
        setOptimisticImage(undefined);
        return false;
      }

      toast.success(
        image ? "Profile photo updated" : "Profile photo removed",
      );
      // Keep optimistic value until RSC refresh lands; then parent user.image wins
      // once we clear override after refresh below.
      router.refresh();
      setOptimisticImage(undefined);
      return true;
    } catch {
      toast.error("Unable to update profile photo");
      setOptimisticImage(undefined);
      return false;
    } finally {
      setIsUploading(false);
    }
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // Allow selecting the same file again later
    event.target.value = "";

    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Please choose a JPG, PNG, WebP, or GIF image");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("Image must be 2MB or smaller");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setOptimisticImage(dataUrl);
      await persistImage(dataUrl);
    } catch {
      toast.error("Could not read that image file");
      setOptimisticImage(undefined);
    }
  }

  async function handleRemovePhoto() {
    setOptimisticImage(null);
    await persistImage(null);
  }

  return (
    <div className={cn("relative inline-flex", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => void handleFileChange(e)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={isUploading}
            aria-label="Change profile photo"
            className={cn(
              "group relative rounded-full outline-none",
              "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-70",
            )}
          >
            {/* Relative wrapper so the badge is not clipped by Avatar overflow-hidden */}
            <span className="relative inline-flex size-16">
              <Avatar
                size="lg"
                className="size-16 border text-base transition-opacity group-hover:opacity-90"
              >
                {displayImage ? (
                  <AvatarImage
                    src={displayImage}
                    alt={user.name || "Profile photo"}
                  />
                ) : null}
                <AvatarFallback className="text-base font-medium">
                  {isUploading && !displayImage ? (
                    <Loader2Icon className="size-5 animate-spin" />
                  ) : (
                    initials
                  )}
                </AvatarFallback>
              </Avatar>

              {/* Hover / loading overlay */}
              <span
                className={cn(
                  "pointer-events-none absolute inset-0 z-[1] flex items-center justify-center rounded-full",
                  "bg-black/45 text-white opacity-0 transition-opacity",
                  "group-hover:opacity-100 group-focus-visible:opacity-100",
                  isUploading && "opacity-100",
                )}
                aria-hidden
              >
                {isUploading ? (
                  <Loader2Icon className="size-5 animate-spin" />
                ) : (
                  <CameraIcon className="size-5" />
                )}
              </span>

              {showStatusBadge ? (
                <span
                  className="border-background absolute right-0 bottom-0 z-[2] size-3.5 rounded-full border-2 bg-emerald-500 dark:bg-emerald-600"
                  aria-hidden
                />
              ) : null}
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem
            disabled={isUploading}
            onSelect={() => {
              // Defer so the menu can close before the native file dialog opens
              window.setTimeout(() => openFilePicker(), 0);
            }}
          >
            <ImagePlusIcon />
            Upload photo
          </DropdownMenuItem>

          {hasPhoto ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                disabled={isUploading}
                onSelect={() => {
                  void handleRemovePhoto();
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

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Could not read image file"));
      }
    };
    reader.onerror = () =>
      reject(reader.error ?? new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}
