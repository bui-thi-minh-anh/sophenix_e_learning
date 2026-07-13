"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Headphones,
  Mic,
  PenLine,
  FileText,
  Star,
  TrendingUp,
  Calendar,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LessonProgress {
  id: string;
  completedAt: string;
  lesson: { title: string; slug: string };
}

interface ListeningProgress {
  id: string;
  completedAt: string;
  lesson: { title: string; slug: string; topic: { name: string } };
}

interface SpeakingResult {
  id: string;
  overall: number;
  createdAt: string;
  prompt: { title: string; level: string };
}

interface WritingResult {
  id: string;
  overall: number;
  createdAt: string;
  prompt: { title: string; level: string };
}

interface ReadingResult {
  id: string;
  score: number;
  total: number;
  accuracy: number;
  createdAt: string;
  passage: { title: string; level: string };
}

interface FavoriteWord {
  id: string;
  word: { word: string; meaning: string };
}

interface ProgressData {
  lessons: LessonProgress[];
  listening: ListeningProgress[];
  speaking: SpeakingResult[];
  writing: WritingResult[];
  reading: ReadingResult[];
  favorites: FavoriteWord[];
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = React.useState<ProgressData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }
    if (status !== "authenticated") return;

    Promise.all([
      fetch("/api/progress/lessons").then((r) => r.json()),
      fetch("/api/progress/listening").then((r) => r.json()),
      fetch("/api/speaking/history").then((r) => r.json()),
      fetch("/api/writing/history").then((r) => r.json()),
      fetch("/api/favorites").then((r) => r.json()),
    ])
      .then(([lessons, listening, speaking, writing, favorites]) => {
        setData({
          lessons: Array.isArray(lessons) ? lessons : [],
          listening: Array.isArray(listening) ? listening : [],
          speaking: Array.isArray(speaking) ? speaking : [],
          writing: Array.isArray(writing) ? writing : [],
          reading: [],
          favorites: Array.isArray(favorites) ? favorites : [],
        });
      })
      .finally(() => setLoading(false));
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="text-center py-12 text-muted-foreground">Đang tải...</div>
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user;

  const avgSpeaking =
    data && data.speaking.length > 0
      ? Math.round(data.speaking.reduce((s, r) => s + r.overall, 0) / data.speaking.length)
      : null;

  const avgWriting =
    data && data.writing.length > 0
      ? Math.round(data.writing.reduce((s, r) => s + r.overall, 0) / data.writing.length)
      : null;

  const avgReading =
    data && data.reading.length > 0
      ? Math.round(data.reading.reduce((s, r) => s + r.accuracy, 0) / data.reading.length)
      : null;

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      {/* User info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{user.name ?? "Người dùng"}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="Bài học" value={data?.lessons.length ?? 0} />
        <StatCard icon={Headphones} label="Nghe" value={data?.listening.length ?? 0} />
        <StatCard icon={Mic} label="Nói" value={data?.speaking.length ?? 0} extra={avgSpeaking ? `TB: ${avgSpeaking}/100` : undefined} />
        <StatCard icon={PenLine} label="Viết" value={data?.writing.length ?? 0} extra={avgWriting ? `TB: ${avgWriting}/100` : undefined} />
      </div>

      {/* Recent speaking */}
      {data && data.speaking.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Mic className="h-4 w-4" /> Lịch sử Nói
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.speaking.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{r.prompt.title}</span>
                    <Badge variant="outline" className="ml-2 text-[10px]">{r.prompt.level}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <ScoreBadge score={r.overall} />
                    <span className="text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent writing */}
      {data && data.writing.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PenLine className="h-4 w-4" /> Lịch sử Viết
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.writing.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{r.prompt.title}</span>
                    <Badge variant="outline" className="ml-2 text-[10px]">{r.prompt.level}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <ScoreBadge score={r.overall} />
                    <span className="text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Favorite words */}
      {data && data.favorites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="h-4 w-4" /> Từ vựng yêu thích
            </CardTitle>
            <CardDescription>{data.favorites.length} từ đã lưu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.favorites.map((f) => (
                <Badge key={f.id} variant="secondary" className="gap-1">
                  {f.word.word} — {f.word.meaning}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {data &&
        data.lessons.length === 0 &&
        data.listening.length === 0 &&
        data.speaking.length === 0 &&
        data.writing.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                Chưa có dữ liệu học tập nào. Hãy bắt đầu học ngay!
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => router.push("/lessons")}>Bài học</Button>
                <Button variant="outline" size="sm" onClick={() => router.push("/listening")}>Nghe</Button>
                <Button variant="outline" size="sm" onClick={() => router.push("/speaking")}>Nói</Button>
                <Button variant="outline" size="sm" onClick={() => router.push("/writing")}>Viết</Button>
                <Button variant="outline" size="sm" onClick={() => router.push("/reading")}>Đọc</Button>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  extra,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  extra?: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}{extra ? ` • ${extra}` : ""}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const variant = score >= 80 ? "success" : score >= 60 ? "warning" : "destructive";
  return <Badge variant={variant}>{score}</Badge>;
}
