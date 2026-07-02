import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Gộp class Tailwind an toàn (loại bỏ class trùng/xung đột). Dùng bởi mọi component UI.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
