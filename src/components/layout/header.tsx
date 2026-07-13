"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, Search, User, LogIn, LogOut, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-3 border-b border-border/30 bg-background/80 px-4 backdrop-blur-sm lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-muted-foreground lg:hidden"
        aria-label="Mở menu điều hướng"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Search className="h-5 w-5" />
        </Button>

        {status === "loading" ? (
          <div className="h-9 w-9" />
        ) : session?.user ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="/profile">
                <BarChart3 className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">{session.user.name ?? "Tài khoản"}</span>
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/auth/login">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Đăng nhập</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
