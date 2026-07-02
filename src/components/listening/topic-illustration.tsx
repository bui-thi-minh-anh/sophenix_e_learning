"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Preload ảnh: chỉ trả true khi ảnh tồn tại & load xong. Nhờ vậy hiển thị emoji
// ngay từ đầu, không bao giờ thấy icon "ảnh vỡ" khi file chưa có.
function useImageLoaded(src?: string): boolean {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(false);
    if (!src) return;
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
    return () => {
      img.onload = null;
    };
  }, [src]);
  return loaded;
}

// "3D Illustration" của card: ưu tiên ảnh trong public/images/...; khi chưa có ảnh
// thì fallback emoji lớn trên nền gradient xanh (vẫn sinh động, không vỡ layout).
export function TopicIllustration({
  src,
  emoji,
  className,
}: {
  src?: string;
  emoji: string;
  className?: string;
}) {
  const loaded = useImageLoaded(src);
  return (
    <div
      className={cn(
        "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-primary/25 via-primary/10 to-transparent",
        className,
      )}
    >
      {loaded ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-contain drop-shadow-lg" />
      ) : (
        <span className="select-none text-4xl drop-shadow-md sm:text-5xl">{emoji}</span>
      )}
    </div>
  );
}
