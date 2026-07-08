'use client';

import React, { useState } from 'react';
import { Menu, X, Bell, Search, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Left Side - Logo + Menu */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                E
              </div>
              <span className="font-semibold text-xl tracking-tight">EnterpriseCo</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/dashboard" className="hover:text-gray-900 transition">Dashboard</Link>
              <Link href="/analytics" className="hover:text-gray-900 transition">Analytics</Link>
              <Link href="/projects" className="hover:text-gray-900 transition">Projects</Link>
              <Link href="/team" className="hover:text-gray-900 transition">Team</Link>
            </div>
          </div>

          {/* Right Side - Search, Notifications, User */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-2xl px-4 py-2 w-72">
              <Search className="w-4 h-4 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-gray-400"
              />
            </div>

            {/* Notifications */}
            <button className="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-2xl hover:bg-gray-100 transition">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                  JB
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">Julien Brown</div>
                  <div className="text-xs text-gray-500 -mt-0.5">Admin</div>
                </div>
              </button>

              {/* User Dropdown */}
              <div className="hidden group-hover:block absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-gray-200 shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b">
                  <div className="font-medium">Julien Brown</div>
                  <div className="text-sm text-gray-500">julien@enterprise.co</div>
                </div>

                <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50">
                  <User className="w-4 h-4" /> Profile
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50">
                  <Settings className="w-4 h-4" /> Settings
                </a>

                <div className="border-t my-1"></div>

                <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4" /> Sign out
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-6 flex flex-col gap-4 text-sm font-medium">
            <Link href="/dashboard" className="py-2">Dashboard</Link>
            <Link href="/analytics" className="py-2">Analytics</Link>
            <Link href="/projects" className="py-2">Projects</Link>
            <Link href="/team" className="py-2">Team</Link>
          </div>
        </div>
      )}
    </nav>
  );
}