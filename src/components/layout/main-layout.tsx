"use client";

import * as React from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

// Khung bố cục dùng lại cho toàn bộ trang: Header trên cùng, Sidebar bên trái, nội dung ở giữa.
// Quản lý trạng thái mở/đóng sidebar trên mobile.
export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1">
          <div className="container py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
