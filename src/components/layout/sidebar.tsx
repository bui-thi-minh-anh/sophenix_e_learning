"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems } from "@/config/nav";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-border/30 bg-[hsl(225,55%,10%)] p-4 transition-transform duration-200",
          "lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="mb-6 px-2">
          <Link href="/" onClick={onClose} className="block">
            <span className="text-lg font-bold text-emerald-400">
              Sophenix
            </span>
            <span className="mt-0.5 block text-[11px] text-slate-400">
              Learn English
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/8 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                )}
              >
                <Icon className="size-[18px] shrink-0" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Bottom icons */}
        <div className="mt-auto flex flex-col gap-1 border-t border-white/5 pt-3">
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200">
            <Settings className="size-[18px]" />
            Settings
          </button>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-orange-400 transition-colors hover:bg-white/5 hover:text-orange-300">
            <Sparkles className="size-[18px]" />
            Sophie
          </button>
        </div>
      </aside>
    </>
  );
}
