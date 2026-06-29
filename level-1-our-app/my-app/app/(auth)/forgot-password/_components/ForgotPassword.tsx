'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { ResetLinkSent } from './ResetLinkSent'

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleSuccess = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm">
        {/* Logo/Company Name */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="bg-foreground flex size-9 items-center justify-center rounded-lg">
            <span className="text-background text-sm font-bold">AC</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">Acme Corp</span>
        </div>

        {/* Card */}
        <div className="bg-background border-border/60 rounded-2xl border p-6 shadow-sm">
          {submitted ? (
            // Success State (reuses the same card)
            <ResetLinkSent onBack={() => {
                          setSubmitted(false)
                          setEmail('')
                      } } email={email}  />
          ) : (
            // Form State
            <>
              <h1 className="text-foreground text-xl font-semibold tracking-tight">
                Reset Your Password
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Enter your work email and we&apos;ll send a reset link.
              </p>

              {/* Form is now a separate component */}
              <ForgotPasswordForm onSuccess={handleSuccess} />

              {/* Security note */}
              <div className="bg-muted/40 mt-4 rounded-lg p-3">
                <p className="text-muted-foreground text-xs text-pretty">
                  This page says the same thing whether or not an account exists for
                  the address. That is deliberate: it stops this form being used to
                  check who has an account here.
                </p>
              </div>

              {/* Back to sign in */}
              <p className="text-muted-foreground mt-4 text-xs">
                Remember your login information?{' '}
                <Link
                  href="/sign-in"
                  className="text-foreground underline underline-offset-4"
                >
                  Back to sign in
                </Link>
              </p>
            </>
          )}
        </div>

        {/* Bottom info text */}
        <p className="text-muted-foreground mt-4 text-center text-xs text-pretty">
          Reset links arrive within a minute and expire after 15 minutes.
          Sending a new link cancels the old one. Your current sessions stay
          signed in until the password changes.
        </p>
      </div>
    </div>
  )
}