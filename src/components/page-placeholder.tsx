// Khung trang placeholder dùng chung cho các trang chưa có nội dung.
// Chỉ hiển thị tiêu đề + mô tả ngắn, KHÔNG chứa nội dung bài học hay logic nghiệp vụ.
interface PagePlaceholderProps {
  title: string;
  description?: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && (
        <p className="mt-3 max-w-prose text-muted-foreground">{description}</p>
      )}
      <p className="mt-6 rounded-full border px-4 py-1 text-sm text-muted-foreground">
        Đang xây dựng
      </p>
    </div>
  );
}
