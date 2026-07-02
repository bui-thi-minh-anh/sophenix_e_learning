"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Phoenix Banner cuối trang: mascot phượng hoàng + slogan + nút Continue Practice.
// Ảnh mascot ở /images/brand/phoenix.png; chưa có thì fallback emoji 🔥.
function useImageLoaded(src: string): boolean {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
    return () => {
      img.onload = null;
    };
  }, [src]);
  return loaded;
}

export function PhoenixBanner({ continueHref = "/listening" }: { continueHref?: string }) {
  const phoenixLoaded = useImageLoaded("/images/brand/phoenix.png");

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-5 sm:p-6">
      {/* đốm sáng nền, animation nhẹ */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400/30 to-primary/20 animate-in fade-in">
            {phoenixLoaded ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/brand/phoenix.png"
                alt="Sophie the Phoenix"
                className="h-14 w-14 object-contain drop-shadow-lg"
              />
            ) : (
              <span className="text-3xl">🔥</span>
            )}
          </div>
          <div>
            <p className="text-lg font-semibold">
              Listening every day makes English sound natural.
            </p>
            <p className="text-sm text-muted-foreground">
              Luyện nghe mỗi ngày cùng Sophie để phản xạ tự nhiên hơn.
            </p>
          </div>
        </div>
        <Link
          href={continueHref}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
        >
          Continue Practice <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
