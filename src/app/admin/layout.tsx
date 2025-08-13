import type { Metadata } from "next";

import DashboardHeader from '@/app/components/DashboardHeader';
import DashboardSidebar from '@/app/components/DashboardSidebar';



export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing users and settings",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body
        className={` antialiased`}
      >
        <div className="flex min-h-screen bg-gray-50">
          <DashboardSidebar />
          <main className="flex-1 ml-0 lg:ml-72">
            <DashboardHeader />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
