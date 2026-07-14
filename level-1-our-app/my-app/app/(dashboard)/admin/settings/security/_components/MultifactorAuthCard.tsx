import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Button } from 'react-day-picker'

export default function MultifactorAuthCard() {
  

    return (
    <div className="space-y-1">
      <div className="space-y-1">
        <h3 className="text-xl font-bold"> Multifactor Authentication </h3>
        <p className="text-muted-foreground text-sm mt-1">
          Your most recent login sessions and account activity.
        </p>
        <Separator className="my-4" />
      </div>
      <Card className="flex flex-col">
        <CardHeader className="grid auto-rows-min items-start">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest account activity.</CardDescription>
          <CardAction className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
            <button></button>
          </CardAction>
        </CardHeader>
        <CardContent>
        </CardContent>
        </Card>
        </div>
  )
}
