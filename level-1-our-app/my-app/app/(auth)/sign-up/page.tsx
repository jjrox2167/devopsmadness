import SignUp  from "./_components/SignUp";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export default async function SignUpPage() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });
    console.log("session :", session);
    if (session) {
      redirect("/dashboard");
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.message !== "NEXT_REDIRECT")
      console.error("Auth error:", error);
    redirect("/sign-in");
  }
  return (
<main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignUp />
      </div>
    </main>
  );
}