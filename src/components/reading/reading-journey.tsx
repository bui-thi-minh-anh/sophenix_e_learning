"use client";

import { Check, Lock } from "lucide-react";

const stages = [
  { id: 1, label: "Short Passage" },
  { id: 2, label: "Long Passage" },
  { id: 3, label: "TOEIC Reading" },
  { id: 4, label: "IELTS Academic" },
  { id: 5, label: "IELTS General" },
  { id: 6, label: "Advanced Reading" },
  { id: 7, label: "Daily Challenge" },
];

interface ReadingJourneyProps {
  currentStage?: number;
}

export function ReadingJourney({ currentStage = 3 }: ReadingJourneyProps) {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[#0f1a2e] p-5">
      <h2 className="text-sm font-semibold text-white mb-4">Your Reading Journey</h2>
      <div className="overflow-x-auto pb-1 -mx-1 px-1">
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
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                      status === "completed"
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                        : status === "current"
                          ? "border-blue-500 bg-blue-600 text-white ring-4 ring-blue-500/20"
                          : "border-slate-600/50 bg-slate-800/30 text-slate-500"
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
                    className={`text-[10px] font-medium text-center w-[72px] leading-tight ${
                      status === "completed"
                        ? "text-emerald-400/80"
                        : status === "current"
                          ? "text-blue-400"
                          : "text-slate-500"
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>

                {i < stages.length - 1 && (
                  <div
                    className={`h-[2px] w-8 mx-0.5 mt-[-1.25rem] rounded-full ${
                      stage.id < currentStage
                        ? "bg-emerald-500/40 border-t border-dashed border-emerald-500/30"
                        : "bg-slate-700/50"
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
