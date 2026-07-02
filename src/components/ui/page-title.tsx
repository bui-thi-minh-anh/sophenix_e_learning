import * as React from "react";

import { cn } from "@/lib/utils";

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  description?: React.ReactNode;
}

// Tiêu đề chính của trang (h1). Mỗi trang chỉ nên có một PageTitle (xem TYPOGRAPHY.md).
const PageTitle = React.forwardRef<HTMLHeadingElement, PageTitleProps>(
  ({ className, children, description, ...props }, ref) => (
    <div className="space-y-2">
      <h1
        ref={ref}
        className={cn("text-3xl font-bold tracking-tight", className)}
        {...props}
      >
        {children}
      </h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
);
PageTitle.displayName = "PageTitle";

export { PageTitle };
