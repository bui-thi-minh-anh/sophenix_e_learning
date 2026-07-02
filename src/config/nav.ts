import {
  BookOpen,
  Headphones,
  Home,
  Languages,
  Mic,
  PenLine,
  BookText,
  type LucideIcon,
} from "lucide-react";

// Cấu hình điều hướng dùng chung cho Header và Sidebar.
// Mỗi mục tương ứng một trang placeholder trong src/app.
export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { title: "Trang chủ", href: "/", icon: Home },
  { title: "Bài giảng", href: "/lessons", icon: BookOpen },
  { title: "Từ vựng", href: "/vocabulary", icon: Languages },
  { title: "Nghe", href: "/listening", icon: Headphones },
  { title: "Nói", href: "/speaking", icon: Mic },
  { title: "Đọc", href: "/reading", icon: BookText },
  { title: "Viết", href: "/writing", icon: PenLine },
];
