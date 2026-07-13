'use client';


import React from 'react'
import { BreadcrumbBasic } from './BreadcrumbBasic';
import { usePathname } from 'next/navigation';
import { pageConfig } from '@/lib/PageConfig';


export default function PageHeader() {
  const pathname = usePathname();
      const page = pageConfig[pathname as keyof typeof pageConfig];

  return (
    <header>
      <div className="bg-background hidden shrink-0 border-b px-4 py-4 sm:px-6 md:block">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-6">
          <div className="flex min-w-0 flex-wrap items-center gap-3 text-sm">
            <BreadcrumbBasic />
          </div>
          <div className="relative xl:mx-auto xl:w-full xl:max-w-md">
            
        </div>
        
        </div>
        
      </div>
      <div className="space-y-0.5 px-4 py-4 sm:px-6 md:block">
        <h1 className="text-3xl font-bold tracking-tight md:text-3xl">{[page?.title]}</h1>
        <p className="text-muted-foreground">{page?.description}</p>
        </div>
    </header>
  )
}
