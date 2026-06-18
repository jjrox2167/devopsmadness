import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void
}

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      // Fake delay for testing (replace with real Server Action later)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Reset link would be sent to:', email)

      onSuccess(email) // Tell parent component we're done
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
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
          placeholder="name@emailaddress.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <Button type="submit" disabled={loading || !email}>
        {loading ? 'Sending...' : 'Send reset link'}
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  )
}