"use client";

import * as React from "react";
import { Mic, Square, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpeechRecorderProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  maxDurationSec?: number;
}

export function SpeechRecorder({ onTranscript, disabled, maxDurationSec = 180 }: SpeechRecorderProps) {
  const [isRecording, setIsRecording] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  const [elapsed, setElapsed] = React.useState(0);
  const [supported, setSupported] = React.useState(true);

  const recognitionRef = React.useRef<SpeechRecognition | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setInterval>>();

  React.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalText = "";

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalText += e.results[i][0].transcript + " ";
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      setTranscript((finalText + interim).trim());
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error !== "aborted") {
        console.error("Speech recognition error:", e.error);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      clearInterval(timerRef.current);
      const result = (finalText).trim();
      setTranscript(result);
      if (result) onTranscript(result);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      clearInterval(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startRecording = () => {
    if (!recognitionRef.current) return;
    setTranscript("");
    setElapsed(0);
    setIsRecording(true);

    recognitionRef.current.start();

    timerRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= maxDurationSec) {
          recognitionRef.current?.stop();
          return prev + 1;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    clearInterval(timerRef.current);
  };

  const resetRecording = () => {
    setTranscript("");
    setElapsed(0);
    onTranscript("");
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!supported) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. Vui lòng dùng Google Chrome.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {!isRecording ? (
          <Button onClick={startRecording} disabled={disabled} className="gap-2">
            <Mic className="h-4 w-4" />
            {transcript ? "Ghi lại" : "Bắt đầu nói"}
          </Button>
        ) : (
          <Button onClick={stopRecording} variant="destructive" className="gap-2">
            <Square className="h-4 w-4" />
            Dừng
          </Button>
        )}

        {transcript && !isRecording && (
          <Button onClick={resetRecording} variant="outline" size="sm" className="gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" />
            Xoá
          </Button>
        )}

        <span className="ml-auto text-sm tabular-nums text-muted-foreground">
          {formatTime(elapsed)} / {formatTime(maxDurationSec)}
        </span>
      </div>

      {isRecording && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          </span>
          Đang ghi âm... Hãy nói tiếng Anh.
        </div>
      )}

      {transcript && (
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-xs font-medium text-muted-foreground mb-1.5">Nội dung nhận diện:</p>
          <p className="text-sm leading-relaxed">{transcript}</p>
        </div>
      )}
    </div>
  );
}
