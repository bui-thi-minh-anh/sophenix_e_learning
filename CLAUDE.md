# Sophenix — Website học tiếng Anh

> File này là hướng dẫn cho Claude Code khi làm việc trong repo. Đọc trước khi bắt đầu task.

## Tổng quan dự án

Website giúp người Việt học tiếng Anh: bài giảng (lessons), từ vựng (vocabulary),
luyện nghe (listening), nói, đọc, viết, và theo dõi tiến độ.

- Ngôn ngữ giao tiếp với người dùng: **tiếng Việt**.
- Nội dung học: song ngữ Anh–Việt.

## Stack

- **Next.js 14 (App Router)** + React 18 + **TypeScript**.
- **Tailwind CSS** + **shadcn/ui** (Radix) — component trong `src/components/ui/`.
- `next-themes` (dark mode), `lucide-react` (icon), `sonner` (toast), `react-markdown` + `remark-gfm`.
- Nội dung đọc từ Markdown/JSON qua **server component** (không có backend/DB riêng).

> ⚠️ Dự án TỪNG là server Express (`src/server.js` + `public/*.html`). Đã chuyển hẳn
> sang Next.js — **không còn** `src/server.js`, `index.js` hay các file HTML tĩnh.

## Cấu trúc thư mục

```
.
├── package.json
├── next.config.mjs · tailwind.config.ts · tsconfig.json · components.json
├── src/
│   ├── app/                     # App Router: mỗi thư mục = 1 route
│   │   ├── layout.tsx           # RootLayout (ThemeProvider + MainLayout)
│   │   ├── page.tsx             # trang chủ
│   │   ├── lessons/             # /lessons, /lessons/[slug]
│   │   ├── listening/           # /listening, /listening/[topic], /listening/[topic]/[lesson]
│   │   └── vocabulary|speaking|reading|writing/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui (button, card, badge, tabs, ...)
│   │   ├── layout/              # header, sidebar, main-layout
│   │   ├── lesson/              # markdown, exercise-set, lesson-exercises
│   │   └── listening/           # audio-player, listening-browser, listening-lesson, listening-exercise
│   ├── content/lessons/         # NGUỒN bài giảng (.json / .ts) — import qua index.ts
│   ├── lib/                     # listening.ts (loader), listening-progress.ts, utils.ts
│   └── config/nav.ts            # điều hướng Header/Sidebar
├── public/
│   ├── audio/                   # audio (mp3/wav) — GITIGNORE, sinh bằng TTS
│   └── images/                  # ảnh minh hoạ (commit)
├── docs/09_PAGE_CONTENT/        # NGUỒN nội dung text (listening, speaking, ...)
├── scripts/tts/                 # sinh audio bằng OmniVoice (gen_audio.py)
├── .venv-tts/                   # venv Python cho TTS (GITIGNORE)
└── docs/                        # tài liệu dự án (kiến trúc, quy ước, roadmap)
```

## Lệnh thường dùng

```bash
npm install        # cài dependencies (lần đầu)
npm run dev        # chạy dev → http://localhost:3000
npm run build      # build production (đồng thời kiểm tra type + lint)
npm start          # chạy bản đã build
npm run lint       # ESLint
```

> **Port 3000 bị chiếm?** `lsof -nP -iTCP:3000 -sTCP:LISTEN` để xem PID rồi `kill <PID>`.
> (Next sẽ tự nhảy sang 3001 nếu 3000 bận — dễ gây nhầm "không chạy được".)

## Thêm nội dung

- **Bài giảng (lessons):** thêm file `.json`/`.ts` vào `src/content/lessons/` rồi import trong
  `src/content/lessons/index.ts`. Xem `docs/09_PAGE_CONTENT/lessons/HUONG_DAN_JSON.md`.
- **Bài nghe (listening):** thêm `docs/09_PAGE_CONTENT/listening/<topic>/<slug>.md`
  (tên file có nghĩa, frontmatter chuẩn). UI tự cập nhật — không hardcode, không sửa code.
  Sinh audio: xem `scripts/tts/README.md`. Kiến trúc nội dung: `docs/04_TECH/CONTENT_ARCHITECTURE.md`.

## Quy ước làm việc

- Trả lời và viết tài liệu bằng **tiếng Việt**.
- Code/comment kỹ thuật theo style file xung quanh (TypeScript, shadcn/ui, Tailwind).
- Tách bạch: **text → `docs/`**, **binary (audio/ảnh) → `public/`**. Không trộn lẫn.
- Không commit/push trừ khi người dùng yêu cầu.
- Đọc thêm: [docs/architecture.md](docs/architecture.md), [docs/conventions.md](docs/conventions.md),
  [docs/04_TECH/CONTENT_ARCHITECTURE.md](docs/04_TECH/CONTENT_ARCHITECTURE.md).

## Roadmap

Xem [docs/roadmap.md](docs/roadmap.md).
