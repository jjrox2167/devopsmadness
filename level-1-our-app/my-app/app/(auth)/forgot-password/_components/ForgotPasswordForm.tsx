'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { toast } from 'sonner'

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void
}

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    if (!email) return

    setIsPending(true)
    setError(null)

    const { error: resetError } = await authClient.requestPasswordReset({
      email,
      // redirectTo: `${window.location.origin}/reset-password`,
      redirectTo: "/reset-password"
    })

    {/* if theres an error */}

    if (resetError) {
      const message = resetError.message || 'Failed to send reset link. Please try again.'
      setError(message)
      toast.error(message)

     {/* Else if successful do this */} 
    } else {
      onSuccess(email)
      toast.success('Password reset link sent!')
    }

    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="forgot-email"
          className="text-sm leading-none font-medium"
        >
          Email
        </label>
        <Input
          id="forgot-email"
          type="email"
          placeholder="name@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
          required
        />
      </div>

      <Button type="submit" disabled={isPending || !email}>
        {isPending ? 'Sending...' : 'Send reset link'}
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  )
}