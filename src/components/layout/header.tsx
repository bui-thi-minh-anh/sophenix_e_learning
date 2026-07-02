"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  // Mở/đóng sidebar trên mobile.
  onMenuClick: () => void;
}

// Thanh đầu trang: nút menu (mobile), logo và nút chuyển chế độ sáng/tối.
export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-3 border-b bg-background px-4">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Mở menu điều hướng"
        onClick={onMenuClick}
      >
        <Menu />
      </Button>

      <Link href="/" className="text-lg font-bold text-primary">
        Sophenix
      </Link>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}
