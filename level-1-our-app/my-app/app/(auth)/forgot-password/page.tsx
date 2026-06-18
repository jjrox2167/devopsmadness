
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import EmailOTPReset from "./_components/EmailOTPReset";
import ForgotPassword from "./_components/ForgotPassword";



export default async function ForgotPasswordPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/dashboard");

  return (
  <main >
    
<div className="">
      <h1 className="text-2xl font-semibold mb-6">Forgot your password?</h1>
      <ForgotPassword >

      </ForgotPassword>
    </div>
  </main>
  );
}