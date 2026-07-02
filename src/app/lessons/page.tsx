import Link from "next/link";

import { getAllLessons } from "@/content/lessons";
import { PageTitle } from "@/components/ui/page-title";
import { Grid } from "@/components/ui/grid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Màu badge theo cấp độ CEFR: A = sơ cấp (success), B = trung cấp (primary), C = cao cấp (secondary).
function levelVariant(level: string): "success" | "default" | "secondary" {
  if (level.startsWith("A")) return "success";
  if (level.startsWith("B")) return "default";
  return "secondary";
}

export default function LessonsPage() {
  const lessons = getAllLessons();

  return (
    <div className="space-y-6">
      <PageTitle description="Chọn một bài để học lý thuyết và làm bài tập.">Bài giảng</PageTitle>

      <Grid cols={3}>
        {lessons.map((lesson) => (
          <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant={levelVariant(lesson.level)}>{lesson.level}</Badge>
                  <span className="text-xs text-muted-foreground">{lesson.topic}</span>
                </div>
                <CardTitle className="mt-2 group-hover:text-primary">{lesson.title}</CardTitle>
                {lesson.summary && <CardDescription>{lesson.summary}</CardDescription>}
              </CardHeader>
              <CardContent>
                <span className="text-sm text-muted-foreground">
                  {lesson.exerciseSets.length} bộ ·{" "}
                  {lesson.exerciseSets.reduce((n, s) => n + s.exercises.length, 0)} câu bài tập
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Grid>
    </div>
  );
}
