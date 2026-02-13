import { SignIn } from "./_components/SignIn"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export default async function SignInPage() {
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
  <main >
        <SignIn />
   
  </main>
  );
}