import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";

import { PageTitle } from "@/components/ui/page-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getListeningTopics, getListeningTopic } from "@/lib/listening";

export function generateStaticParams() {
  return getListeningTopics().map((t) => ({ topic: t.topicId }));
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = getListeningTopic(params.topic);
  if (!topic) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/listening"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách chủ đề
      </Link>

      <PageTitle description={topic.description}>{topic.titleEn}</PageTitle>

      <div className="space-y-3">
        {topic.lessons.map((l) => (
          <Link key={l.lessonId} href={`/listening/${topic.topicId}/${l.lessonId}`} className="group block">
            <Card className="transition-shadow group-hover:shadow-md">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    {l.level && <Badge variant="secondary">{l.level}</Badge>}
                    {l.audioType && (
                      <span className="text-xs text-muted-foreground">{l.audioType}</span>
                    )}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary">{l.titleEn}</h3>
                  {l.titleVi && <p className="text-sm text-muted-foreground">{l.titleVi}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {l.duration}s
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {topic.lessons.length === 0 && (
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" /> Chưa có bài nghe nào trong chủ đề này.
          </p>
        )}
      </div>
    </div>
  );
}
