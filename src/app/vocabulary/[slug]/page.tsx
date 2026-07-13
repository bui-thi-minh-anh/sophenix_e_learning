"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LessonExercises } from "@/components/lesson/lesson-exercises";
import {
  getVocabTopic,
  getIrregularVerbs,
  getWordListData,
} from "@/content/vocabulary";
import type { VocabWord, VocabLevel, Collocation, CommonPattern } from "@/content/vocabulary/types";

function levelBadgeClass(level: VocabLevel): string {
  if (level.startsWith("A"))
    return "border-emerald-500/20 bg-emerald-500/15 text-emerald-400";
  if (level.startsWith("B1"))
    return "border-blue-500/20 bg-blue-500/15 text-blue-400";
  if (level.startsWith("B2"))
    return "border-amber-500/20 bg-amber-500/15 text-amber-400";
  return "border-rose-500/20 bg-rose-500/15 text-rose-400";
}

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

  const wordListData = getWordListData(slug);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <Link
        href="/vocabulary"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
      </Link>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${levelBadgeClass(topic.level)}`}
          >
            {topic.level}
          </span>
          <span className="text-sm text-muted-foreground">
            {topic.category}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{topic.summary}</p>
      </div>

      <Tabs defaultValue="hoc">
        <TabsList>
          <TabsTrigger value="hoc">Tra cứu</TabsTrigger>
          <TabsTrigger value="bai-tap">
            Bài tập ({topic.exerciseSets.reduce((n, s) => n + s.exercises.length, 0)})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hoc">
          {wordListData ? (
            <VocabWordList
              words={wordListData.vocabulary}
              collocations={wordListData.collocations}
              commonPatterns={wordListData.common_patterns}
            />
          ) : slug === "irregular-verbs" ? (
            <IrregularVerbsTable />
          ) : null}
        </TabsContent>

        <TabsContent value="bai-tap">
          <LessonExercises sets={topic.exerciseSets} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ─── Word List Component ─── */

const POS_COLORS: Record<string, string> = {
  noun: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  verb: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  adjective: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  adverb: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  preposition: "border-purple-500/30 bg-purple-500/10 text-purple-400",
};

function posClass(pos: string) {
  return POS_COLORS[pos] ?? "border-border/40 bg-card/60 text-muted-foreground";
}

function VocabWordList({
  words,
  collocations,
  commonPatterns,
}: {
  words: VocabWord[];
  collocations: (string | Collocation)[];
  commonPatterns?: CommonPattern[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return words;
    return words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        w.example.toLowerCase().includes(q),
    );
  }, [words, query]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm từ vựng hoặc nghĩa..."
          className="h-10 w-full rounded-lg border border-border/40 bg-card/80 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        Hiển thị {filtered.length} / {words.length} từ
      </p>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((w) => (
          <div
            key={w.id}
            className="group rounded-xl border border-border/40 bg-card/80 p-4 transition-colors hover:border-border hover:bg-card"
          >
            {/* Word + Part of Speech */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold text-foreground">{w.word}</h3>
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${posClass(w.part_of_speech)}`}
              >
                {w.part_of_speech}
              </span>
            </div>

            {/* IPA */}
            <div className="mt-1.5 flex items-center gap-4 text-xs text-muted-foreground">
              <span>
                <span className="font-medium text-muted-foreground/70">UK</span>{" "}
                <span className="font-mono">{w.ipa_uk}</span>
              </span>
              <span>
                <span className="font-medium text-muted-foreground/70">US</span>{" "}
                <span className="font-mono">{w.ipa_us}</span>
              </span>
            </div>

            {/* Divider */}
            <div className="my-2.5 border-t border-border/30" />

            {/* Meaning */}
            <p className="text-sm font-semibold text-primary">{w.meaning}</p>

            {/* Example */}
            <p className="mt-1.5 text-xs italic leading-relaxed text-muted-foreground">
              &ldquo;{w.example}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Không tìm thấy từ vựng nào.
        </p>
      )}

      {/* Common patterns (mẫu câu thường gặp) */}
      {commonPatterns && commonPatterns.length > 0 && (
        <div className="rounded-xl border border-border/40 bg-card/80 p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-xs font-bold text-emerald-400">
              P
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Mẫu câu thường gặp
            </h3>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {commonPatterns.length}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {commonPatterns.map((p) => (
              <div
                key={p.pattern}
                className="rounded-lg border border-border/30 bg-background/40 p-4"
              >
                <p className="font-mono text-sm font-semibold text-emerald-400">
                  {p.pattern}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {p.examples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-400/60" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collocations */}
      {collocations.length > 0 && (
        <div className="rounded-xl border border-border/40 bg-card/80 p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-xs font-bold text-primary">
              C
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Collocations
            </h3>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {collocations.length}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {collocations.map((c, i) => {
              const phrase = typeof c === "string" ? c : c.phrase;
              const meaning = typeof c === "string" ? null : c.meaning;
              return (
                <div
                  key={phrase}
                  className="flex items-center gap-3 rounded-lg border border-border/30 bg-background/40 px-3.5 py-2.5 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-semibold tabular-nums text-muted-foreground/60">
                    {i + 1}.
                  </span>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-foreground">{phrase}</span>
                    {meaning && (
                      <span className="ml-2 text-xs text-muted-foreground">— {meaning}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Irregular Verbs Table ─── */

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
          v.meaning.toLowerCase().includes(q),
      );
    }

    return result;
  }, [verbs, query, letterFilter]);

  return (
    <div className="space-y-4">
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

      <p className="text-xs text-muted-foreground">
        Hiển thị {filtered.length} / {verbs.length} động từ
      </p>

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
