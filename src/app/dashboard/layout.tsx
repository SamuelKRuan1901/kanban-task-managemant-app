import AppSidebar from '@/components/dashboard/AppSidebar';
import Header from '@/components/dashboard/Header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='w-screen h-screen'>
      <SidebarProvider>
        <AppSidebar />
        <div className='w-screen flex flex-col'>
          <Header />
          <SidebarInset>
            <main className='w-full h-full'>{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </section>
  );
};

export default DashboardLayout;
