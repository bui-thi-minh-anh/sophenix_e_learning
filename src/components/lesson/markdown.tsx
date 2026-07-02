import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

// Hiển thị nội dung markdown (hỗ trợ bảng GFM), style theo design token của dự án.
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("text-[15px] leading-relaxed", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node, ...props }) => <p className="my-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="my-2 list-disc space-y-1 pl-5" {...props} />,
          ol: ({ node, ...props }) => <ol className="my-2 list-decimal space-y-1 pl-5" {...props} />,
          li: ({ node, ...props }) => <li className="marker:text-muted-foreground" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
          h3: ({ node, ...props }) => <h3 className="mb-2 mt-4 text-lg font-semibold" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="my-3 border-l-4 border-info bg-info/10 py-1 pl-3 text-muted-foreground" {...props} />
          ),
          code: ({ node, ...props }) => (
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border border-border bg-muted px-3 py-2 text-left font-semibold" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-border px-3 py-2 align-top" {...props} />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
