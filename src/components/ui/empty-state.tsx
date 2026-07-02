import * as React from "react";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  // Vùng hành động (ví dụ nút "Thử lại" hoặc "Về trang chủ").
  action?: React.ReactNode;
}

// Trạng thái rỗng: khi chưa có dữ liệu, kèm thông điệp thân thiện và hành động gợi ý
// (xem UX_PRINCIPLE.md mục Trạng thái lỗi và rỗng).
function EmptyState({ icon: Icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-10 w-10 text-muted-foreground" aria-hidden="true" />}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export { EmptyState };
