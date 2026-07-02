"use client";

import * as React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function fmt(sec: number): string {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Audio Player: Play · Pause · Replay · Progress Bar · Current Time · Total Duration.
// onListen báo số giây đã nghe thêm (dùng cập nhật Listening Time).
export function AudioPlayer({
  src,
  className,
  onListen,
}: {
  src: string;
  className?: string;
  onListen?: (deltaSec: number) => void;
}) {
  const ref = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [ready, setReady] = React.useState(false);
  const lastTick = React.useRef(0);

  function toggle() {
    const a = ref.current;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  }

  function replay() {
    const a = ref.current;
    if (!a) return;
    a.currentTime = 0;
    void a.play();
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const a = ref.current;
    if (!a) return;
    a.currentTime = Number(e.target.value);
    setCurrent(a.currentTime);
  }

  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <audio
        ref={ref}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setReady(true);
        }}
        onTimeUpdate={(e) => {
          const t = e.currentTarget.currentTime;
          setCurrent(t);
          if (onListen && t > lastTick.current) {
            onListen(t - lastTick.current);
          }
          lastTick.current = t;
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? "Tạm dừng" : "Phát"}
          className="h-11 w-11 shrink-0 rounded-full"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={seek}
            disabled={!ready}
            aria-label="Tua audio"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs tabular-nums text-muted-foreground">
            <span>{fmt(current)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={replay}
          disabled={!ready}
          aria-label="Nghe lại"
          className="h-11 w-11 shrink-0 rounded-full"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      {!ready && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Đang tải audio… (nếu chưa có file, hãy chạy script sinh audio)
        </p>
      )}
    </div>
  );
}
