"use client";

import { authClient} from "@/lib/auth-client";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordSchema } from "@/lib/schema";
import { z } from "zod";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [token] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;

    const params = new URLSearchParams(window.location.search);
    return params.get("token");
  });

  // Combined schema with password confirmation
const ResetPasswordSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Resets states & UI elements.

    setError(null);
    setSuccess(false);
    setIsLoading(true);
    setIsPending(true);
    
  
    try { // begin validation before API call

      const result = ResetPasswordSchema.safeParse({
      password,
      confirmPassword,
    }); // first check || Verifies that password meets Password Schema criteria

   if (!result.success) {
      setError(result.error.issues[0].message); // Show only first error
      setIsPending(false);
      return;

    } if (password !== confirmPassword) { // Checks the first two password fields; Thus preventing mismatched passwords and running unecessary API calls
      setError("Passwords do not match.");
      setIsLoading(false);
      return;

    } else if (!token) {  // Seconf check on if validity of token || If no token is found or valid, it notifies user of error
      throw new Error("This link is no longer valid. Please request a new one.");
    
    }
    const {data, error: apiError } = await authClient.resetPassword({ // If all validations pass, proceed with API call for reset password
      newPassword: password, // inputs the value taken fron 'password' only after passing validation comparison and onclick of submit
       token, // inputs the token retrieved from URL search params
    });

    if (apiError) { // Handles any API errors that may be returned from the async operation during the reset password process
      throw new Error(apiError.message ||"Failed to reset password. Please try again."); // Default error message if none provided by API
    }

    // Notification is created server-side in auth.ts → onPasswordReset
    // (client components cannot use Prisma / createNotification directly).
    setSuccess(true);
    toast.success("Password reset successfully! Redirecting to sign in...");
    setTimeout(() => router.push("/sign-in?reset=success"), // Redirects user to sign-in page after successful password reset
      4000); // 4 second delay before redirecting to allow user to read success message

    } catch (err: unknown) {
  if (err instanceof z.ZodError) {
    const messages = err.issues.map(issue => issue.message).join(" "); // Aggregate all Zod-based schema error messages into a single string
    setError(messages);
  } else if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Something went wrong."); // Fallback error message for unexpected errors
  }
} finally {
  setIsLoading(false);
}
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl"> 
          {success ? "Your Password has Been Reset!" : "Reset your Password"} 
          {/* Title changes based on success (?) teranary operator saying the state is set to 'true'*/}
          {/* If success is true, show success message, the (:) teranary operator 'else' show default reset password message */}
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {success
          ? "Your password has been changed."
          : "Enter your new password below. Once submitted, you'll be required to sign in again."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}> {/* Form submission leads to the handleSubmit trigger for the async function */}
          
            <div className="grid gap-2 mb-4">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter a new password"
                required
                value={password} // value bound to password state which is pushed back into the parameter of the resetPassword async function
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending} 
                
                
              />
              </div>
              <div className="grid gap-2 mb-4">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                required
                value={confirmPassword} // value bound to confirmPassword state which is compared against 'password' state before proceeding with reset
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isPending}
                
      
              />
              </div>
              {/* Error Message  and anything else, '&&' renders as error message with red text */}
          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

          {/* Submit Button */}
          {!success ? (
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 
                ( <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          ) : (
            <p className="text-center text-sm text-green-600 font-medium">
              Password reset successfully! Redirecting...
            </p>
          )}
        </form>
      </CardContent>

      {!success && (
  <CardFooter className="flex justify-center">
    <a 
      href="/sign-in" 
      className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
    >
      Back to Sign In
    </a>
  </CardFooter>
)}
</Card>
  )
}


