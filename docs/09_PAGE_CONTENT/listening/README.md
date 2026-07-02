# Listening — Nguồn dữ liệu

Thư mục này chứa **toàn bộ nội dung text** của phần Listening (transcript, bài tập,
từ vựng, ngữ pháp). Trang `/listening` đọc trực tiếp từ đây, **không hardcode**.

## Nguyên tắc lưu trữ

- **Text ở đây** (`docs/09_PAGE_CONTENT/listening/`) → nhẹ, commit vào git.
- **Audio KHÔNG ở đây.** File `.mp3` được sinh bằng OmniVoice và lưu trong
  `public/audio/listening/<topic>/<lesson>.mp3` (Next serve được, và đã `.gitignore`).
- Mỗi file `.md` khai báo đường dẫn audio trong frontmatter (`audio:`).

Lý do tách: audio là binary, để trong `docs/` sẽ phình git vĩnh viễn **và** Next.js
không serve được file ngoài `public/`.

Xem thêm kiến trúc tổng thể ở `docs/04_TECH/CONTENT_ARCHITECTURE.md`.

## Cấu trúc

```
listening/
├── README.md                        ← file này
└── <topic>/                         ← 1 thư mục = 1 chủ đề (travel, education, ...)
    ├── README.md                    ← metadata chủ đề (frontmatter)
    ├── booking-a-room-by-phone.md   ← 1 bài nghe, TÊN CÓ NGHĨA (không lesson-01)
    └── first-day-at-school.md
```

Bất biến slug 1:1: `<slug>.md` ⇔ `public/audio/listening/<topic>/<slug>.mp3`
⇔ `public/images/listening/<topic>/<slug>.png`.

## Sinh audio

Xem `scripts/tts/README.md`. Tóm tắt:

```bash
python scripts/tts/gen_audio.py docs/09_PAGE_CONTENT/listening/travel/booking-a-room-by-phone.md
```

Script đọc `## Transcript`, sinh giọng theo `speakers` trong frontmatter,
xuất MP3 vào `public/audio/listening/...`.
