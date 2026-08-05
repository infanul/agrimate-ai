'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#080e0c] text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Workspace Area */}
      <div className="flex flex-1 relative">
        {/* Collapsible Navigation Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Dynamic Page Content */}
        <main
          className={`flex-1 p-4 sm:p-6 md:p-8 transition-all duration-300 ${
            sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
