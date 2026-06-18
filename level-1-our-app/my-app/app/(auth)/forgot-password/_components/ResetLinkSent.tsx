import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface ResetLinkSentProps {
  email: string
  onBack?: () => void
}

export function ResetLinkSent({ email, onBack }: ResetLinkSentProps) {
  return (
    <div className="text-center space-y-5 py-6">
      {/* Success Icon */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-7 w-7 text-green-600" />
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Reset Link Sent!</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          We sent a password reset link to{" "}
          <span className="font-medium text-foreground">{email}</span>.
        </p>
      </div>

      {/* Instructions */}
      <p className="text-muted-foreground text-sm">
        Click the link in the email to reset your password.
      </p>

      {/* Action Button */}
      {onBack ? (
        <Button onClick={onBack} className="mt-2 w-full">
          Send another link
        </Button>
      ) : (
        <Button asChild className="mt-2 w-full">
          <Link href="/sign-in">Back to login</Link>
        </Button>
      )}
            <p className="text-muted-foreground text-xs">
        Didn&apos;t receive it? Check your spam folder or try again in a few minutes.
      </p>
    </div>
  )
}