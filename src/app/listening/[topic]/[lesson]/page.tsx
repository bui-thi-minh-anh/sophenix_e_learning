import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ListeningLessonView } from "@/components/listening/listening-lesson";
import { getListeningTopics, getListeningTopic, getListeningLesson } from "@/lib/listening";

export function generateStaticParams() {
  return getListeningTopics().flatMap((t) =>
    t.lessons.map((l) => ({ topic: t.topicId, lesson: l.lessonId })),
  );
}

export default function LessonPage({
  params,
}: {
  params: { topic: string; lesson: string };
}) {
  const lesson = getListeningLesson(params.topic, params.lesson);
  if (!lesson) notFound();

  // Tính bài kế tiếp trong cùng chủ đề cho nút "Bài tiếp theo".
  const topic = getListeningTopic(params.topic);
  const idx = topic?.lessons.findIndex((l) => l.lessonId === params.lesson) ?? -1;
  const next = topic && idx >= 0 ? topic.lessons[idx + 1] : undefined;
  const nextHref = next ? `/listening/${params.topic}/${next.lessonId}` : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/listening/${params.topic}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại {topic?.titleEn ?? "chủ đề"}
      </Link>
      <ListeningLessonView lesson={lesson} nextHref={nextHref} />
    </div>
  );
}
