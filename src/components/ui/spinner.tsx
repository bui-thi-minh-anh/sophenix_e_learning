import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  // Nhãn cho trình đọc màn hình (mặc định "Đang tải").
  label?: string;
}

// Biểu tượng đang tải (Loading). Quay tròn, có nhãn ẩn cho accessibility.
function Spinner({ className, label = "Đang tải", ...props }: SpinnerProps) {
  return (
    <span role="status" aria-live="polite" className="inline-flex items-center">
      <Loader2 className={cn("h-5 w-5 animate-spin text-muted-foreground", className)} {...props} />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export { Spinner };
