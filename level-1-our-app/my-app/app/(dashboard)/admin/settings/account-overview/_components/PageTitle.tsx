  'use client'

  
import React from 'react'
import { usePathname } from 'next/navigation'

export default function PageTitle() {
  const pathname = usePathname()

  return (
    <p>
      Current pathname: <span>{pathname ?? ''}</span>
    </p>
  )
}