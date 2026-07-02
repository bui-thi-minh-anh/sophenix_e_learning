import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Bao nội dung và giới hạn chiều rộng để dòng chữ không quá dài (xem UI_GUIDELINE.md).
const containerVariants = cva("mx-auto w-full px-4", {
  variants: {
    size: {
      sm: "max-w-2xl",
      default: "max-w-5xl",
      lg: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} className={cn(containerVariants({ size }), className)} {...props} />;
  }
);
Container.displayName = "Container";

export { Container, containerVariants };
