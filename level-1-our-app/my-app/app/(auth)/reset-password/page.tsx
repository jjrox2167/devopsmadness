
import { metadata } from "@/app/layout";
import ResetPassword from "./_components/ResetPassword";

metadata.title = "Reset Password - My App";

interface PageProps {
  searchParams: { token?: string; error?: string };
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const token = (await searchParams).token;
  const error = searchParams.error;

  // Handle missing token or error: Redirect to forgot-password or error page
  if (!token) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h1>The link is no longer available. Please try again.</h1>
      </div>
    </div>
  
    );
    
  }

  // If token is valid, render the form component
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPassword />
      </div>
    </div>
  );
}