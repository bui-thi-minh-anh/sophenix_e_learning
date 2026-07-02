# TTS — Sinh audio Listening bằng OmniVoice

Sinh file MP3 cho các bài nghe từ transcript trong `docs/09_PAGE_CONTENT/listening/`.
Dùng [OmniVoice](https://github.com/k2-fsa/OmniVoice) ở chế độ **voice design**
(mô tả giọng bằng chữ, không cần audio mẫu).

## Yêu cầu

- Python ≥ 3.10 (dự án dùng `python@3.11` cài qua Homebrew)
- `ffmpeg` (để xuất MP3)
- Môi trường ảo `.venv-tts/` ở gốc dự án (đã `.gitignore`)

## Cài đặt (chạy 1 lần)

```bash
brew install python@3.11 ffmpeg
python3.11 -m venv .venv-tts
.venv-tts/bin/pip install -r scripts/tts/requirements.txt
```

> Trên Apple Silicon dùng `--device mps`. Lần chạy đầu sẽ tự tải model OmniVoice
> từ HuggingFace về `~/.cache/huggingface` (vài GB). Nếu khó kết nối HuggingFace:
> `export HF_ENDPOINT="https://hf-mirror.com"`.

## Dùng

```bash
# 1 bài
.venv-tts/bin/python scripts/tts/gen_audio.py \
    docs/09_PAGE_CONTENT/listening/travel/lesson-01.md

# cả chủ đề (mọi lesson-*.md trong thư mục)
.venv-tts/bin/python scripts/tts/gen_audio.py \
    docs/09_PAGE_CONTENT/listening/travel

# kiểm tra tách lượt thoại mà KHÔNG tải model
.venv-tts/bin/python scripts/tts/gen_audio.py <file> --dry-run
```

Tuỳ chọn: `--force` (ghi đè), `--num-step 16` (nhanh hơn, chất lượng thấp hơn),
`--bitrate 96k`, `--device cpu`.

## Cách hoạt động

1. Đọc frontmatter của bài `.md`:
   - `speakers`: danh sách `{ id, role, voice }` — `voice` là mô tả voice-design
     (vd `"female, adult, british accent"`).
   - `audio`: đường dẫn output (vd `/audio/listening/travel/lesson-01.mp3`).
2. Lấy nội dung dưới `## Transcript`, tách thành từng lượt `ID: text`.
3. Sinh giọng từng lượt theo `voice` của speaker, ghép lại với khoảng lặng 0.35s.
4. Xuất MP3 mono 64 kbps vào `public/<audio>` (nhẹ, Next.js serve được).

## Định dạng transcript

```
R: Good afternoon, how can I help you?
G: Hi, I'd like to make a reservation.
```

- `R`, `G`... phải khớp `id` trong `speakers`.
- Không có label nào → coi là narration 1 giọng (speaker đầu tiên).
- Giữ filler tự nhiên (`um...`, `er...`) và có thể dùng thẻ phi ngôn ngữ của
  OmniVoice như `[laughter]`, `[sigh]`.
```
