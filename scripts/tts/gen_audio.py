#!/usr/bin/env python3
"""Sinh audio cho bài Listening của Sophenix bằng OmniVoice (voice design).

Đọc 1 file bài nghe Markdown (hoặc cả thư mục), lấy:
  - frontmatter `speakers`: map id -> mô tả giọng (OmniVoice voice design)
  - frontmatter `audio`   : đường dẫn output, vd /audio/listening/travel/lesson-01.mp3
  - phần `## Transcript`  : các lượt thoại "R: ...", "G: ..." (hoặc narration 1 giọng)

Sinh giọng từng lượt theo speaker, ghép lại với khoảng lặng, xuất MP3 (nhẹ) vào
`public/<audio>`.

Ví dụ:
    python scripts/tts/gen_audio.py docs/09_PAGE_CONTENT/listening/travel/lesson-01.md
    python scripts/tts/gen_audio.py docs/09_PAGE_CONTENT/listening/travel   # cả thư mục
    python scripts/tts/gen_audio.py <file> --dry-run   # chỉ in các lượt thoại, không tải model
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import yaml

# Gốc project = 2 cấp trên scripts/tts/
PROJECT_ROOT = Path(__file__).resolve().parents[2]
PUBLIC_DIR = PROJECT_ROOT / "public"

SAMPLE_RATE = 24000          # OmniVoice xuất 24 kHz
GAP_SECONDS = 0.35           # khoảng lặng giữa các lượt thoại
DEFAULT_MP3_BITRATE = "64k"  # đủ cho giọng nói, giữ file nhẹ

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)
TURN_RE = re.compile(r"^([A-Za-z0-9_]{1,12})\s*:\s*(.*)$")


def parse_lesson(md_path: Path) -> tuple[dict, str]:
    """Trả về (frontmatter dict, body markdown)."""
    raw = md_path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(raw)
    if not m:
        raise ValueError(f"{md_path}: thiếu frontmatter YAML (--- ... ---)")
    fm = yaml.safe_load(m.group(1)) or {}
    body = raw[m.end():]
    return fm, body


def extract_transcript(body: str) -> str:
    """Lấy nội dung ngay dưới heading '## Transcript' cho tới heading kế tiếp."""
    m = re.search(r"^##\s+Transcript\s*$", body, re.MULTILINE | re.IGNORECASE)
    if not m:
        raise ValueError("Không tìm thấy mục '## Transcript'")
    rest = body[m.end():]
    nxt = re.search(r"^##\s+", rest, re.MULTILINE)
    return rest[: nxt.start()] if nxt else rest


def parse_turns(transcript: str, speakers: list[dict]) -> list[tuple[str, str]]:
    """Tách transcript thành [(speaker_id, text), ...].

    - Dòng dạng 'ID: text' -> lượt của speaker ID.
    - Dòng nối tiếp (không có 'ID:') được gộp vào lượt trước.
    - Nếu không có label nào (narration) -> dùng speaker đầu tiên cho toàn bộ.
    """
    valid_ids = {s["id"] for s in speakers}
    turns: list[list[str]] = []  # [[id, text], ...]
    for line in transcript.splitlines():
        line = line.strip()
        if not line or line == "---":
            continue
        m = TURN_RE.match(line)
        if m and m.group(1) in valid_ids:
            turns.append([m.group(1), m.group(2).strip()])
        elif turns:
            turns[-1][1] += " " + line
        else:
            # narration không có label -> gán speaker đầu tiên
            turns.append([speakers[0]["id"], line])
    return [(sid, clean_text(txt)) for sid, txt in turns if txt.strip()]


def clean_text(text: str) -> str:
    """Bỏ markdown nhấn mạnh, giữ nguyên filler ('um...', 'er...') và dấu câu."""
    text = re.sub(r"[*_`]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def resolve_output(audio_field: str) -> Path:
    """/audio/listening/... -> public/audio/listening/..."""
    rel = audio_field.lstrip("/")
    return PUBLIC_DIR / rel


def wav_to_mp3(wav_path: Path, mp3_path: Path, bitrate: str) -> None:
    mp3_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav_path),
         "-codec:a", "libmp3lame", "-b:a", bitrate, "-ac", "1", "-ar", str(SAMPLE_RATE),
         str(mp3_path)],
        check=True,
    )


def process(md_path: Path, model, args) -> None:
    fm, body = parse_lesson(md_path)
    speakers = fm.get("speakers")
    audio_field = fm.get("audio")
    if not speakers:
        raise ValueError(f"{md_path}: frontmatter thiếu 'speakers'")
    if not audio_field:
        raise ValueError(f"{md_path}: frontmatter thiếu 'audio'")

    voice_by_id = {s["id"]: s.get("voice", "") for s in speakers}
    turns = parse_turns(extract_transcript(body), speakers)

    print(f"\n=== {md_path.name} — {len(turns)} lượt thoại ===")
    for sid, txt in turns:
        preview = txt if len(txt) <= 70 else txt[:67] + "..."
        print(f"  [{sid}] {preview}")

    out_path = resolve_output(audio_field)
    if args.dry_run:
        print(f"  (dry-run) sẽ ghi: {out_path.relative_to(PROJECT_ROOT)}")
        return
    if out_path.exists() and not args.force:
        print(f"  Bỏ qua (đã tồn tại, dùng --force để ghi đè): {out_path.name}")
        return

    import numpy as np
    import soundfile as sf

    gap = np.zeros(int(GAP_SECONDS * SAMPLE_RATE), dtype=np.float32)
    chunks: list[np.ndarray] = []
    for i, (sid, txt) in enumerate(turns):
        instruct = voice_by_id.get(sid, "")
        print(f"  → sinh giọng lượt {i + 1}/{len(turns)} [{sid}] ...", flush=True)
        audio = model.generate(text=txt, instruct=instruct, num_step=args.num_step)
        chunks.append(np.asarray(audio[0], dtype=np.float32))
        if i < len(turns) - 1:
            chunks.append(gap)

    full = np.concatenate(chunks)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp_wav = Path(tmp.name)
    try:
        sf.write(str(tmp_wav), full, SAMPLE_RATE)
        wav_to_mp3(tmp_wav, out_path, args.bitrate)
    finally:
        tmp_wav.unlink(missing_ok=True)

    dur = len(full) / SAMPLE_RATE
    size_kb = out_path.stat().st_size / 1024
    print(f"  ✓ {out_path.relative_to(PROJECT_ROOT)}  ({dur:.1f}s, {size_kb:.0f} KB)")


def collect_lessons(target: Path) -> list[Path]:
    """1 file .md, hoặc mọi bài trong thư mục (đệ quy, bỏ README.md)."""
    if target.is_dir():
        return sorted(p for p in target.rglob("*.md") if p.name.lower() != "readme.md")
    return [target]


def main() -> int:
    ap = argparse.ArgumentParser(description="Sinh audio Listening bằng OmniVoice")
    ap.add_argument("target", type=Path, help="File .md hoặc thư mục chủ đề")
    ap.add_argument("--model", default="k2-fsa/OmniVoice")
    ap.add_argument("--device", default="mps", help="mps | cpu | cuda:0")
    ap.add_argument("--dtype", default="float32", choices=["float32", "float16"])
    ap.add_argument("--num-step", type=int, default=32, help="số bước diffusion (16 nhanh hơn)")
    ap.add_argument("--bitrate", default=DEFAULT_MP3_BITRATE)
    ap.add_argument("--force", action="store_true", help="ghi đè audio đã có")
    ap.add_argument("--dry-run", action="store_true", help="chỉ in lượt thoại, không tải model")
    args = ap.parse_args()

    if not args.target.exists():
        print(f"Không tìm thấy: {args.target}", file=sys.stderr)
        return 1

    lessons = collect_lessons(args.target)
    if not lessons:
        print("Không có bài nào (cần file lesson-*.md).", file=sys.stderr)
        return 1

    model = None
    if not args.dry_run:
        import torch
        from omnivoice import OmniVoice
        dtype = torch.float16 if args.dtype == "float16" else torch.float32
        print(f"Đang tải model {args.model} lên {args.device} ({args.dtype})...")
        model = OmniVoice.from_pretrained(args.model, device_map=args.device, dtype=dtype)

    for md in lessons:
        try:
            process(md, model, args)
        except Exception as e:  # noqa: BLE001 — báo lỗi từng bài, không dừng cả batch
            print(f"  ✗ Lỗi ở {md.name}: {e}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
