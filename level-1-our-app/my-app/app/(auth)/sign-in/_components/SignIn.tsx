"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AtSignIcon, ChevronLeftIcon, EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import type React from "react";
import { FloatingPaths } from "./FloatingPaths";
import Link from "next/link";
import * as z from "zod";
import { useState } from "react";
import { SignInSchema } from "@/lib/schema";
import { authClient, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { on } from "events";




type FormData = z.infer<typeof SignInSchema>;

export function SignIn() {
  const router = useRouter(); 
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({}); // field-specific errors
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // success message state

  const [formError, setFormError] = useState<string | null>(null); // general form error state (e.g. invalid email or password)
  const [isLoading, setIsLoading] = useState(false); // loading state for form submission

  const [showPassword, setShowPassword] = useState(false);

  // Zod form data state
  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  });

  // Handle input changes and clear field errors on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Get the name of the field and its new value
    setData((prev) => ({ ...prev, [name]: value })); // Update form data state
    
    //clear field error on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Handle form submission; sends the data 'e' to the server and starts processing changes on UI
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setSuccessMessage(null);
    setFormError(null);
    setIsLoading(true);

    try {
      // client-side Zod validation
      const validatedData = SignInSchema.parse(data);

      // Send only validated data to the server; this stops overloading server with spammed requests and also prevents unnecessary server-side validation errors
      const { error } = await authClient.signIn.email({ 
        email: validatedData.email, 
        password: validatedData.password,
        callbackURL: "/dashboard" // redirect after successful sign-in; this is optional and can be handled on the client side as well, but including it here ensures that users are redirected even if they have JavaScript disabled or if there are client-side issues
      });

      // Generic error handling for invalid credentials; this is separate from field-specific validation errors and is meant to catch authentication failures
      if (error) {
        setFormError("Invalid Email or Password"); 
        return;
      }

      setSuccessMessage("Sign in successful! Redirecting...");
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Client-side validation failed; shows field errors
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        err.issues.forEach((issue) => {
          const key = issue.path[0] as keyof FormData;
          if (key) {
            fieldErrors[key] = issue.message;
          }
        });
        setErrors(fieldErrors);
       
      } else {
        setFormError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
      router.push("/dashboard");

    }
  }

  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col border-r bg-secondary p-10 lg:flex dark:bg-secondary/20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="z-10 mt-auto">
          <h1 className="text-4xl font-bold tracking-wide text-foreground">
            Welcome Back.
          </h1>
        </div>
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col justify-center p-4">
        <div
          aria-hidden
          className="-z-10 absolute inset-0 isolate opacity-60 contain-strict"
        >
          <div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-140 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
          <div className="absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
        </div>

        {/* Back to home nav */}
        <Button asChild className="absolute top-7 left-5" variant="ghost">
          <Link href="/">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>

        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="flex flex-col space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Login to your Account
            </h1>
            <p className="text-muted-foreground">
              Enter your email and password to access your account.
            </p>
          </div>

          {/* social login buttons */}
          <div className="grid gap-2">
            <Button
							variant="outline"
							className="w-full gap-2"
							disabled={isLoading}
              onClick={async () => {
								await signIn.social({
									provider: "google",
									callbackURL: "/dashboard",
									fetchOptions: {
										onRequest: () => {
											setIsLoading(true);
										},
										onResponse: () => {
											setIsLoading(false);
										},
									},
								});
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 262">
				<path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
				<path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
				<path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
				<path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
			</svg>
							Sign in with Google
						</Button>
            <Button variant="outline">
              
            <svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 512 512"	
			>
				<path
					fill="currentColor"
					d="M462.595 399.003c-7.743 17.888-16.908 34.353-27.527 49.492c-14.474 20.637-26.326 34.923-35.459 42.855c-14.159 13.021-29.329 19.69-45.573 20.068c-11.662 0-25.726-3.318-42.096-10.05c-16.425-6.7-31.519-10.019-45.32-10.019c-14.475 0-29.999 3.318-46.603 10.019c-16.63 6.731-30.027 10.24-40.27 10.587c-15.578.664-31.105-6.195-46.603-20.606c-9.892-8.628-22.265-23.418-37.088-44.372c-15.903-22.375-28.977-48.322-39.221-77.904c-10.969-31.952-16.469-62.892-16.469-92.846c0-34.313 7.414-63.906 22.265-88.706c11.672-19.92 27.199-35.633 46.631-47.169s40.431-17.414 63.043-17.79c12.373 0 28.599 3.827 48.762 11.349c20.107 7.547 33.017 11.375 38.677 11.375c4.232 0 18.574-4.475 42.887-13.397c22.992-8.274 42.397-11.7 58.293-10.35c43.076 3.477 75.438 20.457 96.961 51.05c-38.525 23.343-57.582 56.037-57.203 97.979c.348 32.669 12.199 59.855 35.491 81.44c10.555 10.019 22.344 17.762 35.459 23.26c-2.844 8.248-5.846 16.149-9.038 23.735zM363.801 10.242c0 25.606-9.355 49.514-28.001 71.643c-22.502 26.307-49.719 41.508-79.234 39.11a80 80 0 0 1-.594-9.703c0-24.582 10.701-50.889 29.704-72.398c9.488-10.89 21.554-19.946 36.187-27.17C336.464 4.608 350.275.672 363.264-.001c.379 3.423.538 6.846.538 10.242z"
				/>
			</svg>
							Sign in with Apple
						</Button>
            <Button variant={"outline"}>
            <svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
				></path>
			</svg>
							Sign in with Github
						</Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} method="POST" className="space-y-4">
            {formError && (
              <p className="text-red-600 text-sm text-center font-medium">
                {formError}
              </p>
            )}
            {successMessage && (
              <p className="text-green-600 text-sm text-center font-medium">
                {successMessage}
              </p>
            )}

            <div className="space-y-2">
              <InputGroup>
                <InputGroupInput
                  placeholder="name@email.com"
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                <InputGroupAddon>
                  <AtSignIcon className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
                
              
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="password" className="text-muted-foreground">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <InputGroup>
                <InputGroupInput
                  placeholder="Please enter your password"
                  type="password"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  
                />

                <InputGroupAddon>
                  <LockIcon className="h-4 w-4" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
      <button
        type="button"  // important: prevent form submit on click
        onClick={() => setShowPassword((prev) => !prev)}
        className="focus:outline-none"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeIcon className="h-4 w-4 text-muted-foreground" />  // eye = visible
        ) : (
          <EyeOffIcon className="h-4 w-4 text-muted-foreground" />  // eye-off = hidden
        )}
      </button>
    </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {/* Show loading state on button when form is submitting; this provides feedback to the user that their action is being processed and prevents multiple submissions */}
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-8">
            By continuing, you agree to our{" "}
            <Link href="#" className="underline hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}