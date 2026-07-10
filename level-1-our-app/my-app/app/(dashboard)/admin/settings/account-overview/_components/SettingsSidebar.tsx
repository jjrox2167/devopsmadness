import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HdIcon } from 'lucide-react'
import React from 'react'

export default function SettingsSidebar() {



  return (
<div>
<Tabs
  defaultValue="overview"
  orientation="vertical"
  className="w-full"
>
  <TabsList className="flex w-full flex-col gap-2 bg-transparent p-0">
    <TabsTrigger className="w-full justify-start px-4 py-2 hover:bg-sidebar" value="overview">

      My Account
    </TabsTrigger>
    <TabsTrigger className="w-full justify-start px-4 py-2 hover:bg-sidebar" value="analytics">
      Security
    </TabsTrigger>
    <TabsTrigger className="w-full justify-start px-4 py-2 hover:bg-sidebar" value="reports">
      Reports
    </TabsTrigger>
  </TabsList>
  </Tabs>
    </div>
  )
}
