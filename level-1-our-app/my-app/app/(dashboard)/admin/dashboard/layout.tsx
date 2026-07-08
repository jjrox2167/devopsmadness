import type { Metadata } from 'next';
import PageHeader from '@/app/(dashboard)/admin/dashboard/_components/PageHeader';
import AppNavbar from './_components/AppNavbar';
import { AppSidebar } from './_components/AppSidebar';
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Enterprise Dashboard',
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div >
      
    <SidebarProvider>
  
  <AppSidebar />
  
  <SidebarInset>
    
    <AppNavbar />
    
    <PageHeader/>
    
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>
      {/* Main Content Area */}
        
    </div>
  );
}