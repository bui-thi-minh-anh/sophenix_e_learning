"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Volume2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AudioPlayer } from "@/components/listening/audio-player";
import {
  DictationExercise,
  FillBlanksExercise,
  MultipleChoiceExercise,
  type ExerciseResult,
} from "@/components/listening/listening-exercise";
import { recordResult } from "@/lib/listening-progress";
import type { ListeningLesson } from "@/lib/listening";

type Kind = "dictation" | "fill" | "mcq";

export function ListeningLessonView({
  lesson,
  nextHref,
}: {
  lesson: ListeningLesson;
  nextHref?: string;
}) {
  const [results, setResults] = React.useState<Partial<Record<Kind, ExerciseResult>>>({});
  const listened = React.useRef(0);

  // Điểm tổng = trung bình accuracy các bài đã nộp; ghi tiến độ mỗi lần nộp.
  const submitted = Object.values(results) as ExerciseResult[];
  const overall = submitted.length
    ? Math.round(submitted.reduce((n, r) => n + r.accuracy, 0) / submitted.length)
    : 0;

  function handle(kind: Kind, r: ExerciseResult) {
    setResults((prev) => {
      const next = { ...prev, [kind]: r };
      const vals = Object.values(next) as ExerciseResult[];
      const acc = Math.round(vals.reduce((n, x) => n + x.accuracy, 0) / vals.length);
      recordResult(lesson.topicId, lesson.lessonId, acc, listened.current);
      listened.current = 0;
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {lesson.level && <Badge>{lesson.level}</Badge>}
        {lesson.audioType && <Badge variant="secondary">{lesson.audioType}</Badge>}
        {lesson.accent && <Badge variant="outline">{lesson.accent}</Badge>}
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" /> {lesson.duration}s
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold">{lesson.titleEn}</h1>
        {lesson.titleVi && <p className="text-muted-foreground">{lesson.titleVi}</p>}
      </div>

      <AudioPlayer
        src={lesson.audio}
        onListen={(d) => {
          listened.current += d;
        }}
      />

      <Tabs defaultValue="dictation">
        <TabsList className="flex-wrap">
          <TabsTrigger value="dictation">Dictation</TabsTrigger>
          <TabsTrigger value="fill">Fill blanks</TabsTrigger>
          <TabsTrigger value="mcq">Multiple choice</TabsTrigger>
          <TabsTrigger value="vocab">Từ vựng</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>

        <TabsContent value="dictation" className="pt-2">
          <DictationExercise transcript={lesson.transcript} onResult={(r) => handle("dictation", r)} />
        </TabsContent>

        <TabsContent value="fill" className="pt-2">
          {lesson.fillBlanks.length ? (
            <FillBlanksExercise blanks={lesson.fillBlanks} onResult={(r) => handle("fill", r)} />
          ) : (
            <p className="text-sm text-muted-foreground">Bài này chưa có phần điền từ.</p>
          )}
        </TabsContent>

        <TabsContent value="mcq" className="pt-2">
          {lesson.mcq.length ? (
            <MultipleChoiceExercise items={lesson.mcq} onResult={(r) => handle("mcq", r)} />
          ) : (
            <p className="text-sm text-muted-foreground">Bài này chưa có câu hỏi trắc nghiệm.</p>
          )}
        </TabsContent>

        <TabsContent value="vocab" className="space-y-2 pt-2">
          {lesson.vocabulary.map((v, i) => (
            <div key={i} className="rounded-md border p-3">
              <p className="font-medium">
                {v.word} <span className="text-sm font-normal text-muted-foreground">{v.ipa}</span>
              </p>
              <p className="text-sm">{v.meaning}</p>
              {v.example && <p className="mt-1 text-sm italic text-foreground/70">“{v.example}”</p>}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="transcript" className="space-y-2 pt-2">
          {lesson.transcriptTurns.map((t, i) => (
            <p key={i} className="flex gap-2 text-sm leading-relaxed">
              <span className="inline-flex items-center gap-1 shrink-0 font-semibold text-primary">
                <Volume2 className="h-3.5 w-3.5" />
                {t.speaker}
              </span>
              <span>{t.text}</span>
            </p>
          ))}
          {lesson.grammarFocus && (
            <div className="mt-3 rounded-md bg-accent/50 p-3 text-sm">
              <span className="font-semibold">Grammar focus: </span>
              {lesson.grammarFocus}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {submitted.length > 0 && (
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <p className="text-sm text-muted-foreground">Kết quả bài nghe</p>
              <p className="text-2xl font-bold">{overall}%</p>
              <p className="text-xs text-muted-foreground">
                Đã hoàn thành {submitted.length}/3 dạng bài
              </p>
            </div>
            {nextHref && (
              <Link
                href={nextHref}
                className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Bài tiếp theo <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
