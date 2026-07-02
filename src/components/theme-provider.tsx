"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Bọc next-themes để bật/tắt chế độ tối bằng class trên <html>.
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
