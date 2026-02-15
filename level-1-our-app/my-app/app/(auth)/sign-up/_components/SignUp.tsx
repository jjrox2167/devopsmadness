"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import * as z from "zod";
import { SignUpSchema } from "@/lib/schema";

type FormData = z.infer<typeof SignUpSchema>; // Infer form data type from Zod schema

export default function SignUp() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //zod form data state
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    // handles form submission and starts processing changes on UI
    e.preventDefault();
    setErrors({});
    setSuccessMessage(null);
    setIsLoading(true);
    setIsPending(true);

    try {
      const validatedData = SignUpSchema.parse(data); //zod validation

      const { data: result, error } = await authClient.signUp.email({
        // sign up call to better auth client
        email: validatedData.email,
        password: validatedData.password,
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        callbackURL: "/sign-in",
      });

      if (error) {
        if (error.status === 422 || error.code === "USER_ALREADY_EXISTS") {
          setErrors({ email: "User already exists" });
          setFormError("An account with this email already exists.");
          return;
        }
        // Any other server validation / unexpected error
        setFormError(
          error.message ??
            "An unknown error has occured. Please try again."
        );

        return;
      }
      // Success → redirect
      setSuccessMessage("Account Created Successfully! Please wait ... ");
      await new Promise((resolve) => setTimeout(resolve, 2200));

      router.push("/sign-in");

      //zod validation
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Map Zod errors to state
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof FormData] = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.log(err);
        setFormError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
      setIsPending(false);
    }
  }

  return (
    <Card className="z-50 rounded-md rounded-t-none max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
        {successMessage && (
          <div className="text-green-800 text-center">{successMessage}</div>
        )}
        {formError && <p className="text-red-500 text-center">{formError}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  required
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                  value={data.firstName}
                  disabled={isPending}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  required
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                  value={data.lastName}
                  disabled={isPending}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                autoComplete="new-password"
                placeholder="Password"
                disabled={isPending}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={data.confirmPassword}
                autoComplete="new-password"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
                disabled={isPending}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image (optional)</Label>
              <div className="flex items-end gap-4">
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 w-full">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                  {imagePreview && (
                    <X
                      className="cursor-pointer"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isLoading ? ( //when isLoading is true, show loading spinner and the "Creating Account.."
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account..
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
        <div className="mt-4 flex">
          <Link
            href="/sign-in"
            className="m-auto inline-block text-sm hover:underline"
          >
            Already have an Account?
          </Link>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-center">
          By signing up, you agree to our{" "}
          <a href="/terms" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}