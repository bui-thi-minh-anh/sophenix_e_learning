"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LessonExercises } from "@/components/lesson/lesson-exercises";
import {
  getAllVocabTopics,
  getVocabTopic,
  getIrregularVerbs,
} from "@/content/vocabulary";

export default function VocabDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const topic = getVocabTopic(slug);

  if (!topic) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Không tìm thấy chủ đề này.
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Back */}
      <Link
        href="/vocabulary"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
      </Link>

      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
            {topic.level}
          </span>
          <span className="text-sm text-muted-foreground">
            {topic.category}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{topic.summary}</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="hoc">
        <TabsList>
          <TabsTrigger value="hoc">Tra cứu</TabsTrigger>
          <TabsTrigger value="bai-tap">
            Bài tập ({topic.exerciseSets.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hoc">
          {slug === "irregular-verbs" && <IrregularVerbsTable />}
        </TabsContent>

        <TabsContent value="bai-tap">
          <LessonExercises sets={topic.exerciseSets} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function IrregularVerbsTable() {
  const verbs = getIrregularVerbs();
  const [query, setQuery] = useState("");
  const [letterFilter, setLetterFilter] = useState<string | null>(null);

  const alphabet = useMemo(() => {
    const letters = new Set(verbs.map((v) => v.v1[0].toUpperCase()));
    return Array.from(letters).sort();
  }, [verbs]);

  const filtered = useMemo(() => {
    let result = verbs;

    if (letterFilter) {
      result = result.filter((v) => v.v1[0].toUpperCase() === letterFilter);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (v) =>
          v.v1.toLowerCase().includes(q) ||
          v.v2.toLowerCase().includes(q) ||
          v.v3.toLowerCase().includes(q) ||
          v.meaning.toLowerCase().includes(q)
      );
    }

    return result;
  }, [verbs, query, letterFilter]);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm động từ hoặc nghĩa..."
          className="h-10 w-full rounded-lg border border-border/40 bg-card/80 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Alphabet filter */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setLetterFilter(null)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            letterFilter === null
              ? "bg-primary text-primary-foreground"
              : "bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground"
          }`}
        >
          Tất cả
        </button>
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() =>
              setLetterFilter(letterFilter === letter ? null : letter)
            }
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              letterFilter === letter
                ? "bg-primary text-primary-foreground"
                : "bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        Hiển thị {filtered.length} / {verbs.length} động từ
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border/40">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 bg-card/60">
              <th className="w-10 px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                #
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-emerald-400">
                V1 (Infinitive)
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-blue-400">
                V2 (Past Simple)
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-purple-400">
                V3 (Past Participle)
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                Nghĩa
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((verb) => (
              <tr
                key={verb.stt}
                className="border-b border-border/20 transition-colors hover:bg-card/40"
              >
                <td className="px-3 py-2 text-xs tabular-nums text-muted-foreground">
                  {verb.stt}
                </td>
                <td className="px-3 py-2 font-medium text-emerald-400">
                  {verb.v1}
                </td>
                <td className="px-3 py-2 text-blue-400">{verb.v2}</td>
                <td className="px-3 py-2 text-purple-400">{verb.v3}</td>
                <td className="px-3 py-2 text-muted-foreground">
                  {verb.meaning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Không tìm thấy động từ nào.
        </p>
      )}
    </div>
  );
}
