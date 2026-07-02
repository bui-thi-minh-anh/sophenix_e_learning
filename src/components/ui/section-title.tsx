import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  description?: React.ReactNode;
}

// Tiêu đề một mục trong trang (h2). Không nhảy cấp heading (xem TYPOGRAPHY.md).
const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ className, children, description, ...props }, ref) => (
    <div className="space-y-1">
      <h2 ref={ref} className={cn("text-2xl font-semibold tracking-tight", className)} {...props}>
        {children}
      </h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
);
SectionTitle.displayName = "SectionTitle";

export { SectionTitle };
