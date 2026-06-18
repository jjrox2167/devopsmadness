
import { Button } from '@/components/ui/button'
import React from 'react'

export default function VerifyEmail() {
  return (
    <div>
        <div className='min-h-screen'>
            <div className='bg-muted/30 flex min-h-screen items-center justify-center p-4'>
            <div className='w-full max-w-sm'>
                <div className='mb-6 flex items-center justify-center gap-2'>
                    {/* Logo Here */}
                </div>
                <div className='bg-background border-border/60 rounded-2xl border p-6 shadow-sm'>
                    <div className='bg-muted mb-4 flex size-11 items-center justify-center rounded-full'>
                        {/* Mail Icon */}
                    </div> 
                    <h1 className="text-foreground text-xl font-semibold tracking-tight"></h1>
                    <p className='text-muted-foreground mt-1 text-sm'>We sent a verification link to<span className="text-foreground font-medium">email address</span>. Click the link to activate your account.</p>  
                    <div className="mt-5 flex flex-col gap-3">
                        <Button>
                            Resend Email
                        </Button>
                    </div>
                    <p className='text-muted-foreground mt-3 text-xs'></p>
                    <div className="border-border/60 mt-5 border-t pt-4 flex flex-col gap-2">
                        Use a different email address
                    </div>
                </div>
                <p className="text-muted-foreground mt-4 text-center text-xs text-pretty">

                </p>
            </div>
            </div>
        </div>
    </div>
  )
}
