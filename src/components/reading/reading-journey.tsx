"use client";

import { Check, Lock } from "lucide-react";

const stages = [
  { id: 1, label: "Daily Reading", category: "daily-life" },
  { id: 2, label: "TOEIC Part 5", category: "toeic-5" },
  { id: 3, label: "TOEIC Part 6", category: "toeic-6" },
  { id: 4, label: "TOEIC Part 7", category: "toeic-7" },
  { id: 5, label: "IELTS General", category: "ielts-general" },
  { id: 6, label: "IELTS Academic", category: "ielts-academic" },
  { id: 7, label: "Advanced", category: "advanced" },
];

interface ReadingJourneyProps {
  currentStage?: number;
}

export function ReadingJourney({ currentStage = 1 }: ReadingJourneyProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Reading Journey</h2>
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex items-center gap-0 min-w-max">
          {stages.map((stage, i) => {
            const status =
              stage.id < currentStage
                ? "completed"
                : stage.id === currentStage
                  ? "current"
                  : "locked";

            return (
              <div key={stage.id} className="flex items-center">
                {/* Node */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                      status === "completed"
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                        : status === "current"
                          ? "border-blue-500 bg-blue-500/20 text-blue-400 ring-4 ring-blue-500/10 animate-pulse"
                          : "border-slate-600 bg-slate-800/50 text-slate-500"
                    }`}
                  >
                    {status === "completed" ? (
                      <Check className="h-4 w-4" />
                    ) : status === "locked" ? (
                      <Lock className="h-3.5 w-3.5" />
                    ) : (
                      stage.id
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium text-center w-20 leading-tight ${
                      status === "completed"
                        ? "text-emerald-400"
                        : status === "current"
                          ? "text-blue-400"
                          : "text-slate-500"
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>

                {/* Connector */}
                {i < stages.length - 1 && (
                  <div
                    className={`h-0.5 w-10 mx-1 mt-[-1.25rem] rounded-full ${
                      stage.id < currentStage
                        ? "bg-emerald-500/50"
                        : "bg-slate-700"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
