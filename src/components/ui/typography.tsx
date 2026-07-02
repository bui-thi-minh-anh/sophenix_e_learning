import * as React from "react";

import { cn } from "@/lib/utils";

// Đoạn nhấn (lead): mô tả mở đầu, chữ to hơn một chút.
const Lead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-lg text-muted-foreground", className)} {...props} />
  )
);
Lead.displayName = "Lead";

// Chữ phụ/mờ, cỡ nhỏ.
const Muted = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
Muted.displayName = "Muted";

interface BilingualProps extends React.HTMLAttributes<HTMLDivElement> {
  en: React.ReactNode;
  vi: React.ReactNode;
}

// Cặp song ngữ Anh–Việt: câu tiếng Anh nổi bật, nghĩa tiếng Việt mờ hơn
// (xem docs/03_DESIGN/TYPOGRAPHY.md).
const Bilingual = React.forwardRef<HTMLDivElement, BilingualProps>(
  ({ className, en, vi, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-0.5", className)} {...props}>
      <p className="font-medium text-foreground" lang="en">
        {en}
      </p>
      <p className="text-sm text-muted-foreground" lang="vi">
        {vi}
      </p>
    </div>
  )
);
Bilingual.displayName = "Bilingual";

export { Lead, Muted, Bilingual };
