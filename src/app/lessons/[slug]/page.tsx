import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getAllLessons, getLesson } from "@/content/lessons";
import { PageTitle } from "@/components/ui/page-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Markdown } from "@/components/lesson/markdown";
import { LessonExercises } from "@/components/lesson/lesson-exercises";

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({ slug: lesson.slug }));
}

export default function LessonDetailPage({ params }: { params: { slug: string } }) {
  const lesson = getLesson(params.slug);
  if (!lesson) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/lessons/all"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <Badge>{lesson.level}</Badge>
        <span className="text-sm text-muted-foreground">{lesson.topic}</span>
      </div>
      <PageTitle description={lesson.summary}>{lesson.title}</PageTitle>

      <Tabs defaultValue="ly-thuyet">
        <TabsList>
          <TabsTrigger value="ly-thuyet">📖 Lý thuyết</TabsTrigger>
          <TabsTrigger value="bai-tap">✍️ Bài tập ({lesson.exerciseSets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="ly-thuyet" className="space-y-4">
          {lesson.sections.map((section, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <h2 className="mb-2 text-xl font-semibold">{section.heading}</h2>
                <Markdown>{section.body}</Markdown>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="bai-tap">
          <LessonExercises sets={lesson.exerciseSets} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
