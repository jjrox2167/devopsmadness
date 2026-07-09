"use client"

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { BellIcon, Moon } from 'lucide-react'
import { Button } from './ui/button'

export default function NotificationsIcon() {
  return (
    <div>
        <Popover>
            <PopoverTrigger className='relative flex items-center justify-center rounded-lg' asChild>
                <Button variant="outline" size="icon">
                    <BellIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </PopoverTrigger>
                <PopoverContent align='end' className='w-80'>
                    Popover Content Here
                </PopoverContent>
        </Popover>
    </div>
  )
}
