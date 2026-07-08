'use client';

import React from 'react';
import { ChevronRight, Download, MoreHorizontal, Pen, Copy, Trash2, Home } from 'lucide-react';

type BreadcrumbItem = {
  icon?: React.ReactNode;
  label?: string;
  link?: string;
};

interface PageHeaderProps {
  title?: string;
  description?: string;
  crumbs?: BreadcrumbItem[];
  tabs?: string[];
  children?: React.ReactNode; // For custom action buttons
}

export default function PageHeader({
  title = "Analytics Dashboard",
  description = "View detailed analytics and insights for your application",
  crumbs,
  tabs = ["Overview", "Reports", "Insights", "Settings", "Activity"],
  children,
}: PageHeaderProps) {
  const defaultCrumbs: BreadcrumbItem[] = [
    { icon: <Home className="w-4 h-4" /> },
    { label: "Dashboards", link: "#" },
    { label: "Analytics", link: "#" },
  ];

  const breadcrumbs = crumbs || defaultCrumbs;

  return (
    <div className="px-4 py-5 md:px-6 border-b bg-white">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-4 h-4" />}
                {crumb.icon && <span>{crumb.icon}</span>}
                {crumb.label && (
                  <a
                    href={crumb.link}
                    className="hover:text-gray-900 transition"
                  >
                    {crumb.label}
                  </a>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Title + Description + Actions */}
          <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-900" dangerouslySetInnerHTML={{ __html: title }} />
              {description && (
                <p
                  className="text-muted-foreground text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {children || (
                <>
                  <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                    <Download className="w-4 h-4" />
                    Export
                  </button>

                  <div className="relative group">
                    <button className="inline-flex items-center justify-center w-9 h-9 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Simple Dropdown - Replace with shadcn DropdownMenu if available */}
                    <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-xl py-1 z-50">
                      <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100">
                        <Pen className="w-4 h-4" /> Edit
                      </a>
                      <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100">
                        <Copy className="w-4 h-4" /> Duplicate
                      </a>
                      <div className="border-t my-1" />
                      <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" /> Delete
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex gap-1 border-b overflow-x-auto pb-px hide-scroll">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className="px-5 py-3 text-sm font-medium border-b-2 border-transparent hover:text-gray-900 whitespace-nowrap
                             data-[active=true]:border-blue-600 data-[active=true]:text-blue-600"
                  data-active={tab === tabs[0]} // Default to first tab active
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}