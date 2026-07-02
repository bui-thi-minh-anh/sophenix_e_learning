import * as React from "react";

import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  // Số cột ở màn lớn (md trở lên). Mobile luôn 1 cột để dễ đọc.
  cols?: 1 | 2 | 3 | 4;
}

const colsClass: Record<NonNullable<GridProps["cols"]>, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

// Lưới responsive: 1 cột trên mobile, mở rộng theo `cols` ở màn lớn.
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid grid-cols-1 gap-4", colsClass[cols], className)}
      {...props}
    />
  )
);
Grid.displayName = "Grid";

export { Grid };
