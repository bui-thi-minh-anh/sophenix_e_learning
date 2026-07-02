import { cn } from "@/lib/utils";

// Khối giữ chỗ nhấp nháy khi đang tải nội dung (xem UX_PRINCIPLE.md).
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };
