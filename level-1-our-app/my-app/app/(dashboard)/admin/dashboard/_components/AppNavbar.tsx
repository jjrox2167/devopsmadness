'use client';

import React, { useState } from 'react';
import { Menu, X, Bell, Search, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import NotificationsIcon from '@/components/NotificationsIcon';

export default function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      
      <div className="flex w-full items-center gap-1 px-4 py-3 lg:gap-2 lg:px-6">
  <Button variant="outline" size="icon" asChild>
    <SidebarTrigger />
  </Button>

  <Separator orientation="vertical" className="mx-2 h-6" />

<div className="flex-1 max-w-sm">
  My Admin Dashboard
</div>

  <div className="ml-auto flex items-center gap-2">
    <NotificationsIcon />
    <ModeToggle />
  </div>
</div>
      

    </nav>
  );
}