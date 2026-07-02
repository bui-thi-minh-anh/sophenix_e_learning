"use client";

// Tiến độ luyện nghe lưu ở localStorage (client). Trang Statistics & Progress đọc từ đây.
// Mỗi bài lưu accuracy tốt nhất + thời gian nghe + trạng thái hoàn thành.
import * as React from "react";

const KEY = "sophenix.listening.progress";

export interface LessonProgress {
  completed: boolean;
  accuracy: number; // 0–100, cao nhất đạt được
  timeSec: number; // tổng thời gian nghe (giây)
  updatedAt: number;
}

export type ProgressMap = Record<string, LessonProgress>; // key = `${topicId}/${lessonId}`

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as ProgressMap;
  } catch {
    return {};
  }
}

function write(map: ProgressMap) {
  localStorage.setItem(KEY, JSON.stringify(map));
  window.dispatchEvent(new Event("listening-progress"));
}

export function keyOf(topicId: string, lessonId: string) {
  return `${topicId}/${lessonId}`;
}

export function recordResult(
  topicId: string,
  lessonId: string,
  accuracy: number,
  addTimeSec: number,
) {
  const map = read();
  const k = keyOf(topicId, lessonId);
  const prev = map[k];
  map[k] = {
    completed: true,
    accuracy: Math.max(prev?.accuracy ?? 0, Math.round(accuracy)),
    timeSec: (prev?.timeSec ?? 0) + Math.round(addTimeSec),
    updatedAt: Date.now(),
  };
  write(map);
}

// Hook đọc tiến độ, tự cập nhật khi có thay đổi (kể cả tab khác).
export function useProgress(): ProgressMap {
  const [map, setMap] = React.useState<ProgressMap>({});
  React.useEffect(() => {
    const sync = () => setMap(read());
    sync();
    window.addEventListener("listening-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("listening-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return map;
}

export function topicProgressPct(map: ProgressMap, topicId: string, lessonIds: string[]): number {
  if (!lessonIds.length) return 0;
  const done = lessonIds.filter((id) => map[keyOf(topicId, id)]?.completed).length;
  return Math.round((done / lessonIds.length) * 100);
}
